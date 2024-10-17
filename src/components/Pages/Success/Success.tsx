"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { useAuthStore } from "@/stores/userAuthStore"; // Asumiendo que tienes el estado del usuario aquí
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface DetallesPago {
  paymentId: string;
  paymentStatus: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  planName: string;
  planPrice: string;
  planDuration: number;
}

const OrderSuccess = () => {
  const searchParams = useSearchParams();
  const user = useAuthStore((state) => state.user); // Obtener el usuario autenticado
  const [estadoPago, setEstadoPago] = useState<string | null>(null);
  const [detallesPago, setDetallesPago] = useState<DetallesPago | null>(null);

  useEffect(() => {
    const paymentStatus = searchParams.get("status");
    const paymentId = searchParams.get("payment_id");

    if (paymentStatus === "approved" && paymentId) {
      setEstadoPago("Payment approved successfully!");

      const obtenerDetallesPago = async () => {
        try {
          const response = await fetch(
            `${API_URL}/subscriptions/user/${user?.id}`
          );
          if (!response.ok) {
            throw new Error("Error al obtener los detalles de la suscripción");
          }
          const data = await response.json();

          // Buscar la suscripción con el paymentId que coincide
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const suscripcionEncontrada = data.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (suscripcion: any) => suscripcion.paymentId === paymentId
          );

          if (suscripcionEncontrada) {
            setDetallesPago({
              paymentId: suscripcionEncontrada.paymentId,
              paymentStatus: suscripcionEncontrada.paymentStatus,
              subscriptionStartDate:
                suscripcionEncontrada.subscriptionStartDate,
              subscriptionEndDate: suscripcionEncontrada.subscriptionEndDate,
              planName: suscripcionEncontrada.subscriptionPlan.name,
              planPrice: suscripcionEncontrada.subscriptionPlan.price,
              planDuration:
                suscripcionEncontrada.subscriptionPlan.durationInMonths,
            });
          } else {
            throw new Error(
              "No se encontró la suscripción correspondiente a este ID de pago"
            );
          }
        } catch (error) {
          console.error(
            "Error al obtener los detalles de la suscripción:",
            error
          );
        }
      };

      if (user) {
        obtenerDetallesPago();
      }
    } else {
      setEstadoPago("Hubo un problema con tu pago");
    }
  }, [searchParams, user]);

  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 h-full relative pt-20 pb-10">
      <div className="bg-white h-fit rounded-xl relative px-8 pt-14 pb-10 shadow-lg">
        <div className="content-icon absolute top-0 right-0 left-0 translate-y-[-60%] flex justify-center items-center">
          <div className="icon inline-block bg-[#dcfae9] p-3 rounded-full">
            <div className="flex bg-success rounded-full p-5">
              <FaCheck className="text-white text-3xl" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-center text-2xl font-semibold pb-2">
            {estadoPago || "Procesando..."}
          </p>
          {estadoPago === "Payment approved successfully!" && detallesPago && (
            <>
              <div className="pt-5 pb-5 border-t border-gray-300">
                <p>Total Payment</p>
                <p className="font-semibold text-xl">
                  $ {Number(detallesPago.planPrice).toFixed(2)} ARS
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-3 rounded-lg">
                  <span className="text-gray-500 text-sm">Payment ID</span>
                  <p>{detallesPago.paymentId}</p>
                </div>
                <div className="border border-gray-200 p-3 rounded-lg">
                  <span className="text-gray-500 text-sm">Payment Status</span>
                  <p>{detallesPago.paymentStatus}</p>
                </div>
                <div className="border border-gray-200 p-3 rounded-lg">
                  <span className="text-gray-500 text-sm">Plan</span>
                  <p>{detallesPago.planName}</p>
                </div>
                <div className="border border-gray-200 p-3 rounded-lg">
                  <span className="text-gray-500 text-sm">Duration</span>
                  <p>{detallesPago.planDuration} months</p>
                </div>
                <div className="border border-gray-200 p-3 rounded-lg">
                  <span className="text-gray-500 text-sm">Start Date</span>
                  <p>{detallesPago.subscriptionStartDate}</p>
                </div>
                <div className="border border-gray-200 p-3 rounded-lg">
                  <span className="text-gray-500 text-sm">End Date</span>
                  <p>{detallesPago.subscriptionEndDate}</p>
                </div>
              </div>
            </>
          )}
        </div>
        {/* <div className="pt-6 flex text-center justify-center">
          <button className="flex justify-center items-center text-gray-500">
            <BsDownload className="mr-2" />
            Obtener recibo en PDF
          </button>
        </div> */}
      </div>
      <div className="pt-5">
        <Link href="/dashboard">
          <button className="bg-secondary text-white px-5 py-2 rounded-lg shadow-lg">
            Go to dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
