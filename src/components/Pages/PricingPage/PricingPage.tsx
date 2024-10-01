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
      id: "08f8bbe6-b85c-4e10-93a1-35c0946b5c42",
      name: "Standard",
      price: 35,
    },
    {
      id: "8452ac34-ff26-4c37-81a7-85de98b357f0",
      name: "Premium",
      price: 55,
    },
    {
      id: "eb89beb5-fac7-4ede-9f6b-f85a09d8d21b",
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
