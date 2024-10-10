"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";

const OrderSuccess = () => {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    const status = searchParams.get("status");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const paymentId = searchParams.get("payment_id");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const merchantOrderId = searchParams.get("merchant_order_id");

    if (status) {
      if (status === "approved") {
        setPaymentStatus("Pago aprobado con éxito");
      } else {
        setPaymentStatus("Hubo un problema con tu pago");
      }
    }
  }, [searchParams]);

  return (
    // <div>
    //   <h1>{paymentStatus}</h1>
    //   {paymentStatus === "Pago aprobado con éxito" && (
    //     <>
    //       <p>ID del Pago: {searchParams.get("payment_id")}</p>
    //       <p>ID de la Orden: {searchParams.get("merchant_order_id")}</p>
    //     </>
    //   )}
    // </div>
    <div className="flex flex-col justify-center items-center bg-gray-200 h-full relative pt-20 pb-10">
      <div className="bg-white h-fit rounded-xl relative px-8 pt-14 pb-10 shadow-lg">
        <div className="content-icon absolute top-0 right-0 left-0 translate-y-[-60%] flex justify-center items-center">
          <div className="icon inline-block bg-[#dcfae9] p-3 rounded-full">
            <div className="inline-block flex bg-success rounded-full p-5">
              <FaCheck className="text-white text-3xl" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-center text-2xl font-semibold pb-2">
            Payment Success!
          </p>
          <p className="text-gray-500 text-sm pb-5">
            You payment has been successfully done
          </p>
          <div className="pt-5 pb-5 border-t border-gray-300">
            <p>Total Payment</p>
            <p className="font-semibold text-xl">ARS. 343,00.00</p>
          </div>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="border border-gray-200 p-3 rounded-lg ">
            <span className="text-gray-500 text-sm">in numer</span>
            <p>08978987987897</p>
          </div>
          <div className="border border-gray-200 p-3 rounded-lg ">
            <span className="text-gray-500 text-sm">in numer</span>
            <p>08978987987897</p>
          </div>
          <div className="border border-gray-200 p-3 rounded-lg ">
            <span className="text-gray-500 text-sm">in numer</span>
            <p>08978987987897</p>
          </div>
          <div className="border border-gray-200 p-3 rounded-lg ">
            <span className="text-gray-500 text-sm">in numer</span>
            <p>08978987987897</p>
          </div>
        </div>
        <div className="pt-6 flex text-center justify-center">
          <button className="flex justify-center items-center text-gray-500">
            <BsDownload className="mr-2" />
            Get PDF receipt
          </button>
        </div>
      </div>
      <div className="pt-5">
        <button className="bg-secondary text-white px-5 py-2 rounded-lg shadow-lg">
          Go to dashboard
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
