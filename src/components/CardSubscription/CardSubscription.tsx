import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const CardSubscription = () => {
  return (
    <div className="card_pricing  bg-white">
      <div className="rounded-lg text-4xl font-bold pt-8 pb-5 text-center ">
        Standard
      </div>
      <div className="text-center flex justify-center">
        <ul className="text-center">
          <li className="flex">
            <FaCheckCircle className="text-primary" /> lorem lorem
          </li>
          <li className="flex">
            <FaCheckCircle className="text-primary" /> lorem lorem
          </li>
          <li className="flex">
            <FaCheckCircle className="text-primary" /> lorem lorem
          </li>
          <li className="flex">
            <FaCheckCircle className="text-primary" /> lorem lorem
          </li>
          <li className="flex">
            <FaCheckCircle className="text-primary" /> lorem lorem
          </li>
          <li className="flex">
            <FaCheckCircle className="text-primary" /> lorem lorem
          </li>
        </ul>
      </div>
      <div className=" py-5">
        <p className="text-center font-bold text-4xl flex justify-center items-center">
          <span className="text-lg">$</span>25 <span>/</span>{" "}
          <span className="text-gray-500 font-normal text-[18px]">3 month</span>
        </p>
      </div>
      <div className="px-5">
        <button className="bg-primary w-full rounded-lg text-xl text-white py-3">
          Buy subscription
        </button>
      </div>
    </div>
  );
};

export default CardSubscription;
