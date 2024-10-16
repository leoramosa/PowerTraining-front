import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface Plan {
  id: string;
  name: string;
  price: number;
  durationInMonths: number;
  features: string[];
}

interface CardSubscriptionProps {
  plan: Plan;
  handleCheckout: (planId: string) => void;
}

const CardSubscription: React.FC<CardSubscriptionProps> = ({
  plan,
  handleCheckout,
}) => {
  return (
    <div className="card bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div className="rounded-lg text-4xl font-bold pt-8 pb-5 text-center ">
        {plan.name}
      </div>

      <div className="text-center flex justify-center">
        <ul className="text-center">
          {(plan.features || []).map((feature, index) => (
            <li key={index} className="flex">
              <FaCheckCircle className="text-primary" /> {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className=" py-5">
        <p className="text-center font-bold text-4xl flex justify-center items-center">
          <span className="text-lg">$</span>
          {plan.price}
          <span>/</span>{" "}
          <span className="text-gray-500 font-normal text-[18px]">
            {plan.durationInMonths} months
          </span>
        </p>
      </div>
      <div className="px-5">
        <button
          onClick={() => handleCheckout(plan.id)}
          className="bg-primary w-full rounded-lg text-xl text-white py-3"
        >
          Buy subscription
        </button>
      </div>
    </div>
  );
};

export default CardSubscription;
