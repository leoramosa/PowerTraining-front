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
      console.error(
        `Error HTTP! status: ${response.status}, message: ${errorText}`
      );
      return null;
    }

    const subscriptions: ISubscription[] = await response.json();
    const activeSubscription = subscriptions.find(
      (sub: any) => sub.paymentStatus === "approved"
    );

    if (!activeSubscription) {
      console.warn("There are no active subscriptions.");
      return null;
    }

    return activeSubscription;
  } catch (error: any) {
    console.error("Error searching for active subscriptions:", error.message);
    return null; // Devuelve null en lugar de lanzar el error
  }
}
