"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentRejected = () => {
  const searchParams = useSearchParams();
  const [estadoPago, setEstadoPago] = useState<string>("");

  useEffect(() => {
    const status = searchParams.get("status");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const paymentId = searchParams.get("payment_id");

    if (status === "rejected") {
      setEstadoPago("Pago rechazado");
    }
  }, [searchParams]);

  return (
    <>
      <div className="container mx-auto mt-10 bg-white px-5 py-5 border-2 border-gray-200 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
        {estadoPago === "Pago rechazado" && (
          <>
            <div className="pt-5 pb-5 border-t border-gray-300">
              <p className="font-semibold text-xl text-red-500">
                We are sorry, your payment has been declined.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 p-3 rounded-lg">
                <span className="text-gray-500 text-sm">Payment ID</span>
                <p>{searchParams.get("payment_id") || "No disponible"}</p>
              </div>
              <div className="border border-gray-200 p-3 rounded-lg">
                <span className="text-gray-500 text-sm">Payment Status</span>
                <p>Rejected</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="container  mx-auto  mt-8">
        <Link href={"/pricing"}>
          <button className="bg-primary text-black px-5 py-3 rounded-lg">
            Try another purchase
          </button>
        </Link>
      </div>
    </>
  );
};

export default PaymentRejected;
