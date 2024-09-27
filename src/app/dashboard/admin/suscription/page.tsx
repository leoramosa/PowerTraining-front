"use client";
import SubscriptionCard from '@/components/suscriptionPayment/suscriptionPayment';


const SubscriptionPage: React.FC = () => {
  return (
    <div>
      <SubscriptionCard
        title="Premium Membership"
        description="Get access to our exclusive app!"
        price={999.99} 
      />
    </div>
  );
};

export default SubscriptionPage;
