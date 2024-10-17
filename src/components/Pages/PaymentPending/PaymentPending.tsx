/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentPending = () => {
  const searchParams = useSearchParams();
  const [estadoPago, setEstadoPago] = useState<string>("");

  useEffect(() => {
    const status = searchParams.get("status");
    const paymentId = searchParams.get("payment_id");

    if (status === "pending") {
      setEstadoPago("Pago pendiente");
    }
  }, [searchParams]);

  return (
    <>
      <div className="container mx-auto mt-10 bg-white px-5 py-5 border-2 border-gray-200 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Estado del Pago</h1>
        {estadoPago === "Pago pendiente" && (
          <>
            <div className="pt-5 pb-5 border-t border-gray-300">
              <p className="font-semibold text-xl text-primary">
                Your payment is in process. Please wait for confirmation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 p-3 rounded-lg">
                <span className="text-gray-500 text-sm">Payment ID</span>
                <p>{searchParams.get("payment_id") || "No disponible"}</p>
              </div>
              <div className="border border-gray-200 p-3 rounded-lg">
                <span className="text-gray-500 text-sm">Payment Status</span>
                <p>Pending</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="container  mx-auto  mt-8">
        <Link href={"/dashboard"}>
          <button className="bg-primary text-black px-5 py-3 rounded-lg">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </>
  );
};

export default PaymentPending;
