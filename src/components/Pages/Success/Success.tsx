"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const OrderSuccess = () => {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    const status = searchParams.get("status");
    const paymentId = searchParams.get("payment_id");
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
    <div>
      <h1>{paymentStatus}</h1>
      {paymentStatus === "Pago aprobado con éxito" && (
        <>
          <p>ID del Pago: {searchParams.get("payment_id")}</p>
          <p>ID de la Orden: {searchParams.get("merchant_order_id")}</p>
        </>
      )}
    </div>
  );
};

export default OrderSuccess;
