import { create } from "zustand";
import { ActiveSubscription } from "@/Services/subscriptionService"; // Ruta de tu servicio
import { ISubscription } from "@/interface/ISubscription";

// export interface ISubscriptionPlan {
//   id: string;
//   name: string;
//   price: string;
//   durationInMonths: number;
// }

// export interface ISubscription {
//   id: string;
//   paymentStatus: string;
//   subscriptionStartDate: string;
//   subscriptionEndDate: string;
//   subscriptionPlan: ISubscriptionPlan;
// }

interface ISubscriptionState {
  subscription: ISubscription | null;
  loading: boolean;
  error: string | null;
  fetchSubscription: (userId: string, token: string) => Promise<void>;
}

export const useSubscriptionStore = create<ISubscriptionState>((set) => ({
  subscription: null,
  loading: false,
  error: null,

  fetchSubscription: async (userId, token) => {
    set({ loading: true, error: null });
    try {
      const activeSubscription = await ActiveSubscription(userId, token);
      set({ subscription: activeSubscription, loading: false });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ subscription: null, loading: false, error: error.message });
    }
  },
}));
