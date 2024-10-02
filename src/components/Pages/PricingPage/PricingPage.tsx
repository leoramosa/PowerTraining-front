"use client";

import { useAuthStore } from "@/stores/userAuthStore";
import { useCartStore } from "@/stores/useCart";
import CardSubscription from "@/components/CardSubscription/CardSubscription";
import { useState } from "react";

const PricingPage = () => {
  const [planId, setPlanId] = useState("");
  const user = useAuthStore((state) => state.user);
  const { addToCart, cartItems } = useCartStore();

  const plans = [
    {
      id: "e8e7d970-b2c4-4fed-a3b0-587586a08a02",
      name: "Standard",
      price: 35,
    },
    {
      id: "6454a02a-b1ce-4008-a82e-28546551426b",
      name: "Premium",
      price: 55,
    },
    {
      id: "dd27e834-2d5c-4781-af12-6e8179202895",
      name: "Pro",
      price: 75,
    },
  ];

  const handleAddToCart = (planId: string) => {
    const selectedPlan = plans.find((plan) => plan.id === planId);
    if (selectedPlan) {
      addToCart({
        id: selectedPlan.id,
        name: selectedPlan.name,
        price: selectedPlan.price,
        quantity: 1,
      });
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("You must log in to subscribe.");
      return;
    }

    if (!planId) {
      alert("You must select a subscription plan.");
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
          cartItems: cartItems, // Enviar los ítems del carrito (incluyendo el plan)
        }),
      });

      if (!res.ok) {
        throw new Error("Error in server response");
      }

      const paymentData = await res.json();
      console.log("Payment response data:", paymentData);

      if (paymentData.init_point) {
        window.location.href = paymentData.init_point; // Redirige a Mercado Pago
      } else {
        alert(
          "Unable to initiate the payment process. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert(
        "An error occurred while initiating the payment. Check console for details."
      );
    }
  };

  return (
    <div className="flex bg-gray-100">
      <div>
        <h1>Select Your Subscription Plan</h1>
        <ul>
          {plans.map((plan) => (
            <li key={plan.id}>
              <input
                type="radio"
                name="plan"
                value={plan.id}
                onChange={() => {
                  setPlanId(plan.id);
                  handleAddToCart(plan.id); // Agregar el plan seleccionado al carrito
                }}
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
          Pay with Mercado Pago
        </button>
      </div>
      <CardSubscription />
    </div>
  );
};

export default PricingPage;
