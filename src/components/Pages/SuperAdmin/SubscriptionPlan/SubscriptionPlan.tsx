/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  getAllPlans,
  createPlan,
  deletePlan,
} from "@/Services/SubscriptionPlan";

const SubscriptionPlan = () => {
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    price: 0,
    durationInMonths: 0,
    features: [] as string[], // Array para almacenar características
  });
  const [featureInput, setFeatureInput] = useState(""); // Estado para el campo de entrada de características

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const data = await getAllPlans();
    setPlans(data);
  };

  const handleCreatePlan = async () => {
    await createPlan(newPlan);
    setShowModal(false);
    fetchPlans();
    // Limpiar el formulario
    setNewPlan({
      name: "",
      price: 0,
      durationInMonths: 0,
      features: [],
    });
    setFeatureInput("");
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setNewPlan((prevPlan) => ({
        ...prevPlan,
        features: [...prevPlan.features, featureInput.trim()],
      }));
      setFeatureInput(""); // Limpiar el campo de entrada después de agregar
    }
  };

  const handleDeleteFeature = (index: number) => {
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      features: prevPlan.features.filter((_, i) => i !== index),
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUpdatePlan = async (id: string) => {
    // Implementar lógica de actualización
  };

  const handleDeletePlan = async (id: string) => {
    await deletePlan(id);
    fetchPlans();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Subscription Plans</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowModal(true)}
      >
        Create New Subscription
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Price</th>
            <th className="py-2">Duration (Months)</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan: any) => (
            <tr key={plan.id}>
              <td className="py-2">{plan.name}</td>
              <td className="py-2">{plan.price}</td>
              <td className="py-2">{plan.durationInMonths}</td>
              <td className="py-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleUpdatePlan(plan.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeletePlan(plan.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 w-1/3 rounded">
            <h2 className="text-xl mb-4">Create New Subscription Plan</h2>
            <div className="">
              <label htmlFor="">Plan Name</label>
              <input
                type="text"
                placeholder="Example: Standard, Premium, Pro"
                value={newPlan.name}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, name: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
            </div>

            <div className="">
              <label className="mb-2" htmlFor="">
                Price
              </label>
              <input
                type="number"
                placeholder="Price"
                value={newPlan.price}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, price: parseInt(e.target.value) })
                }
                className="border p-2 mb-2 w-full"
              />
            </div>

            <div className="">
              <label>Duration in Months</label>
              <input
                type="number"
                placeholder="Duration in Months"
                value={newPlan.durationInMonths}
                onChange={(e) =>
                  setNewPlan({
                    ...newPlan,
                    durationInMonths: parseInt(e.target.value),
                  })
                }
                className="border p-2 mb-2 w-full"
              />
            </div>

            <div className="pb-5">
              <label>Add a feature</label>
              <div className="mb-2 flex items-center">
                <input
                  type="text"
                  placeholder="Add a feature"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
                  className="border p-2 w-full"
                />
                <div className="">
                  <button
                    className="bg-primary text-white px-1 ml-3 whitespace-nowrap py-2 rounded"
                    onClick={handleAddFeature}
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            <ul className="list-disc pl-5 mb-2">
              {newPlan.features.map((feature, index) => (
                <li key={index} className="flex justify-between items-center">
                  {feature}
                  <button
                    className="text-red-500 ml-2"
                    onClick={() => handleDeleteFeature(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleCreatePlan}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlan;
