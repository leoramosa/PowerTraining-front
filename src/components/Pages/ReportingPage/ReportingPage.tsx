"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaFileDownload } from "react-icons/fa";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/userAuthStore";
import { useSubscriptionStore } from "@/stores/useSubscriptionStore";
import { useRouter } from "next/navigation";
const APIURL = process.env.NEXT_PUBLIC_API_URL;

const ReportingPage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const { user, token } = useAuthStore();
  const { subscription, fetchSubscription } = useSubscriptionStore();
  const router = useRouter();

  useEffect(() => {
    if (user && token) {
      fetchSubscription(user.id, token); // Pasamos tanto el ID del usuario como el token
    }
  }, [user, token, fetchSubscription]);

  const showBlur =
    user?.role === "Admin" && subscription?.paymentStatus !== "approved";

  const handleExcelDownload = async (reportType: string) => {
    const endpointMap: { [key: string]: string } = {
      "exercise-report": "/excelreports/getAllExercises",
      "user-report": "/excelreports/AllUsers",
    };

    try {
      const response = await fetch(APIURL + endpointMap[reportType], {
        method: "GET",
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      if (!response.ok) {
        throw new Error("Error al descargar el archivo");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${reportType}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("The report has been downloaded successfully");
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      toast.error(
        "There was an error downloading the report. Please try again later"
      );
    }
  };

  const handlePdfDownload = async () => {
    try {
      const response = await fetch(APIURL + "/pdfreports/active-routines", {
        method: "GET",
        headers: {
          Accept: "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error("Error al descargar el archivo");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "my-routines-report.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("The report has been downloaded successfully");
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      toast.error(
        "There was an error downloading the report. Please try again later"
      );
    }
  };

  return (
    <div className=" bg-white ">
      <div className="w-full h-full p-4">
        <h1 className="text-3xl font-bold text-gray-700 ">Download Reports</h1>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
          <Card
            title="Users Report"
            description="Overview of the latest user data, including engagement metrics and demographics."
            imageUrl="/images/report-1.jpg"
            onClick={() => {
              setSelectedCard("user-report");
              handleExcelDownload("user-report");
            }}
            isSelected={selectedCard === "user-report"}
            disabled={false}
            nameReport="excel"
          />
          <Card
            title="Exercises Report"
            description="Detailed analysis of user engagement with exercises and completion statistics."
            imageUrl="/images/report-2.jpg"
            onClick={() => {
              setSelectedCard("exercise-report");
              handleExcelDownload("exercise-report");
            }}
            isSelected={selectedCard === "exercise-report"}
            disabled={false}
            nameReport="excel"
          />
          <Card
            title="Routines Report"
            description="Insights on weekly training stats, adherence rates, and performance metrics."
            imageUrl="/images/report-3.jpg"
            onClick={() => {
              setSelectedCard("routine-report");
              handlePdfDownload();
            }}
            isSelected={selectedCard === "routine-report"}
            disabled={false}
            nameReport="pdf"
          />
        </div>
      </div>

      {showBlur && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black backdrop-blur-lg bg-opacity-70 z-20 w-full">
          <h2 className="text-white text-2xl mb-4">
            You need to subscribe first!
          </h2>
          <button
            className="bg-primary  text-black font-bold py-2 px-4 rounded"
            onClick={() => {
              router.push("/pricing");
            }}
          >
            Subscribe Now
          </button>
        </div>
      )}
    </div>
  );
};

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
  isSelected: boolean;
  disabled: boolean;
  nameReport: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  onClick,
  isSelected,
  disabled,
  nameReport,
}) => {
  return (
    <div
      className={`${
        isSelected ? "border-2 border-orange-500" : ""
      } bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 duration-300`}
    >
      {/* Imagen en la parte superior usando el componente Image de Next.js */}
      <div className="relative w-full h-60">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="filter grayscale hover:grayscale-0 transition duration-300"
        />
      </div>
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <button
          disabled={disabled}
          onClick={onClick}
          className={` mt-3 ${
            !disabled
              ? "hover:bg-primary bg-gray-500"
              : "hover:none bg-gray-300"
          }  text-white px-4 py-2 rounded-full flex items-center justify-center mx-auto transition duration-300 ease-in-out`}
        >
          <FaFileDownload className="mr-2" />
          Download {nameReport}
        </button>
      </div>
    </div>
  );
};

export default ReportingPage;
