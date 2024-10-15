"use client";
import { useState } from "react";
import Image from "next/image";
import { FaFileDownload } from "react-icons/fa";

const ReportingPage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleDownload = (reportName: string) => {
    const fileUrl = `/reports/${reportName}.pdf`; // Cambia la extensión si es necesario
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `${reportName}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-between">
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-700 ">
          Download Reports
        </h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
          <Card
            title="User Report"
            description="Overview of the latest user data, including engagement metrics and demographics."
            imageUrl="/images/report-1.jpg" 
            onClick={() => {
              setSelectedCard("user-report");
              handleDownload("user-report");
            }}
            isSelected={selectedCard === "user-report"}
          />
          <Card
            title="Exercise Report"
            description="Detailed analysis of user engagement with exercises and completion statistics."
            imageUrl="/images/report-2.jpg" 
            onClick={() => {
              setSelectedCard("exercise-report");
              handleDownload("exercise-report");
            }}
            isSelected={selectedCard === "exercise-report"}
          />
          <Card
            title="Routine Report"
            description="Insights on weekly training stats, adherence rates, and performance metrics."
            imageUrl="/images/report-3.jpg" 
            onClick={() => {
              setSelectedCard("routine-report");
              handleDownload("routine-report");
            }}
            isSelected={selectedCard === "routine-report"}
          />
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
  isSelected: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={`${
        isSelected ? "border-4 border-orange-500" : ""
      } bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 duration-300`}
    >
      {/* Imagen en la parte superior usando el componente Image de Next.js */}
      <div className="relative w-full h-40">
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
          onClick={onClick}
          className="bg-gray-500 hover:bg-primary text-white px-4 py-2 rounded-full flex items-center justify-center mx-auto transition duration-300 ease-in-out"
        >
          <FaFileDownload className="mr-2" />
          Download pdf
        </button>
        <button
          onClick={onClick}
          className="bg-gray-500 mt-3 hover:bg-primary text-white px-4 py-2 rounded-full flex items-center justify-center mx-auto transition duration-300 ease-in-out"
        >
          <FaFileDownload className="mr-2" />
          Download excel
        </button>
      </div>
      
    </div>
  );
};

export default ReportingPage;
