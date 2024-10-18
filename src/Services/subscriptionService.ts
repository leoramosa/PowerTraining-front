import { ISubscription } from "@/interface/ISubscription";

/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function ActiveSubscription(
  userId: string,
  token: string
): Promise<ISubscription | null> {
  try {
    const response = await fetch(`${API_URL}/subscriptions/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error HTTP! status: ${response.status}, message: ${errorText}`
      );
    }

    const subscriptions: ISubscription[] = await response.json();
    const activeSubscription = subscriptions.find(
      (sub: any) => sub.paymentStatus === "approved"
    );

    if (!activeSubscription) {
      throw new Error("No hay suscripciones activas.");
    }

    return activeSubscription;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
