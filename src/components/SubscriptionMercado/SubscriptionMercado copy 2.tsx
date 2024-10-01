"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/userAuthStore";

const SubscriptionMercado = () => {
  const [planId, setPlanId] = useState(""); // Estado para el plan seleccionado
  const user = useAuthStore((state) => state.user);

  const cart = [
    {
      id: 1,
      name: "Producto de Prueba",
      price: 100.0,
      quantity: 1,
    },
  ];

  const plans = [
    {
      id: "3f1428b7-f9bf-4f1b-83a6-e871a444e158",
      name: "Plan de 3 meses",
      price: 1000,
    },
    {
      id: "d047fefe-c8c5-4591-9032-7937e2f75ee6",
      name: "Plan de 6 meses",
      price: 1800,
    },
    {
      id: "35aea2b8-7780-4d5c-a757-68623b029383",
      name: "Plan de 12 meses",
      price: 3200,
    },
  ];

  const handleCheckout = async () => {
    if (!user) {
      alert("Debes iniciar sesión para suscribirte.");
      return;
    }

    if (!planId) {
      alert("Debes seleccionar un plan de suscripción.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id, // Enviar el ID del usuario logueado
          planId: planId, // Enviar el ID del plan seleccionado
          cartItems: cart,
        }),
      });

      if (!res.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const paymentData = await res.json();
      console.log("Payment response data:", paymentData); // Log para verificar la respuesta del servidor

      if (paymentData.init_point) {
        window.location.href = paymentData.init_point; // Redirige a la página de pago de Mercado Pago
      } else {
        alert(
          "No se pudo iniciar el proceso de pago. Intenta de nuevo más tarde."
        );
      }
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      alert(
        "Ocurrió un error al iniciar el pago. Revisa la consola para más detalles."
      );
    }
  };

  return (
    <div>
      <h1>Selecciona tu plan de suscripción</h1>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            <input
              type="radio"
              name="plan"
              value={plan.id}
              onChange={() => setPlanId(plan.id)}
            />
            {plan.name} - ${plan.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <button
        onClick={handleCheckout}
        className="bg-green-500 text-white py-2 px-4 mt-4"
        disabled={!planId}
      >
        Pagar con Mercado Pago
      </button>
    </div>
  );
};

export default SubscriptionMercado;
