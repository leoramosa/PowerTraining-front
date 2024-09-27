import { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import Image from 'next/image';

interface SubscriptionCardProps {
  title: string;
  description: string;
  price: number;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ title, description, price }) => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Inicializar MercadoPago con la llave pública
    initMercadoPago(`${process.env.NEXT_PUBLIC_PUBLIC_KEY}`, {
      locale: 'es-AR',
    });

    // Función para crear la preferencia de pago
    const createPreference = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            price,
            quantity: 1,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al crear la preferencia de pago');
        }

        const data = await response.json();
        console.log('Respuesta de la API:', data); // Verifica que la respuesta contenga el preferenceId
        setPreferenceId(data.id); // Asegúrate de que 'data.preferenceId' es correcto
      } catch (error) {
        console.error('Error al crear la preferencia de Mercado Pago:', error);
        setError('Hubo un problema al iniciar el proceso de pago. Inténtalo de nuevo más tarde.');
      }
    };

    createPreference();
  }, [title, price]);

  // Coloca el console.log fuera del useEffect para ver si el estado cambia correctamente
  console.log('preferenceId:', preferenceId);

  return (
    <div className="bg-[url('/images/bg.jpg')] bg-fixed bg-cover h-full flex items-center py-[120px] justify-center">
      <div className="bg-[#00000085] backdrop-blur-md w-full mx-10 md:w-3/5 sm:w-full lg:w-2/5 xl:w-4/12 2xl:w-3/12 rounded-[25px] shadow-[19px_17px_20px_3px_#00000012] p-10">
        <div className="flex justify-center mb-6">
          <Image src="/images/solo.png" alt="Logo" width={80} height={200} />
        </div>
        <h2 className="text-2xl text-white text-center mb-4">{title}</h2>
        <p className="text-white text-center mb-4">{description}</p>
        <h3 className="text-xl text-primary text-center mb-6">${price}</h3>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : preferenceId ? (
          <Wallet initialization={{ preferenceId, redirectMode: 'modal' }} />
        ) : (
          <p className="text-white text-center">Loading checkout...</p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;
