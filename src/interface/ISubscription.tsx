export interface ISubscriptionPlan {
  id: string;
  name: string;
  price: string;
  durationInMonths: number;
}

export interface ISubscription {
  id: string;
  paymentStatus: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  subscriptionPlan: ISubscriptionPlan;
}
