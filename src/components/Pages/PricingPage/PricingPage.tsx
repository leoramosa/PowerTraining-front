"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/userAuthStore";
import { useCartStore } from "@/stores/useCart";
import CardSubscription from "@/components/CardSubscription/CardSubscription";
import ContainerWeb from "@/components/containers/ContainerWeb/ContainerWeb";
import TitleH1 from "@/components/titles/TitleH1";

interface Plan {
  id: string;
  name: string;
  price: number;
  durationInMonths: number;
  features: string[];
}

const PricingPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const user = useAuthStore((state) => state.user);
  const { addToCart, cartItems } = useCartStore();
  const updateUserSubscription = useAuthStore(
    (state) => state.updateUserSubscription
  );

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/subscription-plans`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subscription plans");
        }
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const handleCheckout = async (planId: string) => {
    if (!user) {
      alert("You must be logged in to subscribe.");
      return;
    }

    const selectedPlan = plans.find((plan) => plan.id === planId);

    if (!selectedPlan) {
      alert("Selected plan not found.");
      return;
    }

    const cartItem = {
      id: `sub-${selectedPlan.name.toLowerCase()}-${
        selectedPlan.durationInMonths
      }months`,
      name: `${selectedPlan.name} Subscription - ${selectedPlan.durationInMonths} months`,
      price: Number(selectedPlan.price),
      quantity: 1,
    };

    addToCart(cartItem);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id, // Enviar el ID del usuario logueado
          planId: selectedPlan.id, // Enviar el ID del plan seleccionado
          cartItems: [cartItem], // Solo enviar el artículo seleccionado
        }),
      });

      if (!res.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const paymentData = await res.json();
      console.log("Payment response data:", paymentData);

      if (paymentData.init_point) {
        window.location.href = paymentData.init_point; // Redirige a la página de pago de Mercado Pago
      } else {
        alert(
          "No se pudo iniciar el proceso de pago. Intenta de nuevo más tarde."
        );
      }
      updateUserSubscription();
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      alert(
        "Ocurrió un error al iniciar el pago. Revisa la consola para más detalles."
      );
    }
  };

  return (
    <div className="container mx-auto h-full py-10">
      <div className="text-center pt-10">
        <TitleH1>Pricing</TitleH1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10   p-8">
        {plans.map((plan) => (
          <CardSubscription
            key={plan.id}
            plan={plan}
            handleCheckout={handleCheckout}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
