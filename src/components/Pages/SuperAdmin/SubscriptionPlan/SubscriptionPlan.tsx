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
  });

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
  };

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
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl mb-4">Create New Plan</h2>
            <input
              type="text"
              placeholder="Name"
              value={newPlan.name}
              onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Price"
              value={newPlan.price}
              onChange={(e) =>
                setNewPlan({ ...newPlan, price: parseInt(e.target.value) })
              }
              className="border p-2 mb-2 w-full"
            />
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
