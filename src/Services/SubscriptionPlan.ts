const API_URL = process.env.NEXT_PUBLIC_API_URL;
import axios from "axios";

export const getAllPlans = async () => {
  const response = await axios.get(`${API_URL}/subscription-plans/`);
  return response.data;
};

export const createPlan = async (planData: any) => {
  const response = await axios.post(`${API_URL}/subscription-plans/`, planData);
  return response.data;
};

export const updatePlan = async (id: string, updateData: any) => {
  const response = await axios.put(
    `${API_URL}/subscription-plans/${id}`,
    updateData
  );
  return response.data;
};

export const deletePlan = async (id: string) => {
  await axios.delete(`${API_URL}/subscription-plans/${id}`);
};
