"use client";

import { useEffect, useState } from "react";
import Badge from "../badges/BadgeUser/BadgeUser";
import ContainerWeb from "../containers/ContainerWeb/ContainerWeb";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { ActiveSubscription } from "@/Services/subscriptionService"; // Servicio actualizado
import { ISubscription } from "@/interface/ISubscription";
import ButtonApp from "../buttons/ButtonApp/ButtonApp";
import Link from "next/link";
import { format } from "date-fns";
import { useSubscriptionStore } from "@/stores/useSubscriptionStore";
import { useAuthStore } from "@/stores/userAuthStore";

const SubscriptionMercado: React.FC<{ id: string }> = ({ id }) => {
  const { user, token } = useAuthStore(); // Obtenemos el token aquí

  const { subscription, fetchSubscription } = useSubscriptionStore();

  useEffect(() => {
    if (user && token) {
      fetchSubscription(user.id, token); // Pasamos tanto el ID del usuario como el token
    }
  }, [user, token, fetchSubscription]);

  const showBlur =
    user?.role === "Admin" && subscription?.paymentStatus !== "approved";

  return subscription ? (
    <ContainerWeb className="">
      <div className="flex justify-between items-center border-b-2 p-5">
        <div className="">
          <p className="text-lg font-semibold">Subscription & Billing</p>
          <p className="text-sm text-gray-400">
            Manage your subscription and payments
          </p>
        </div>
        <div className="text-[13px] flex">
          <button className="button p-2 border-2 rounded-lg mr-3">
            Cancel subscription
          </button>
          <button className="button items-center p-2 border-2 rounded-lg flex">
            Manage payments <BsBoxArrowUpRight className="ml-1" />
          </button>
        </div>
      </div>
      <div className=" flex justify-between items-center pt-5 px-5">
        <p className="text-md font-semibold">Current Subscription</p>
        <button className="button p-2 text-sm border-2 rounded-lg mr-3">
          Change plan
        </button>
      </div>
      <div className="flex justify-between pt-5 px-5">
        <div className=" w-1/2 border-2 mr-2 px-5 py-8 flex items-center justify-between rounded-lg">
          <div className="">
            <span className="text-xs">
              {subscription.subscriptionPlan.durationInMonths}-month plan
            </span>
            <p className="text-lg font-semibold">
              {subscription.subscriptionPlan.name}
            </p>
          </div>
          <div className="">
            <Badge status="without-routine" />
          </div>
        </div>
        <div className=" w-1/2 border-2 ml-2 px-5 py-8 flex items-center justify-between rounded-lg">
          <div className="">
            <span className="text-xs">Renew at:</span>
            <p className="text-lg font-semibold">
              {format(
                new Date(subscription.subscriptionEndDate),
                "MMM dd, yyyy"
              )}
            </p>
          </div>
        </div>
      </div>
    </ContainerWeb>
  ) : (
    <div className="flex justify-center w-full items-center h-full flex-col bg-white rounded-lg shadow-lg">
      <p className="font-normal text-lg pb-3">Choose Pricing Subscription</p>
      <Link href="/pricing">
        <ButtonApp
          className="px-5 py-2 shadow-lg"
          type="button"
          variant="login"
          size="md"
          tooltip="View user"
        >
          Get Started
        </ButtonApp>
      </Link>
    </div>
  );
};

export default SubscriptionMercado;
