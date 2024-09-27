"use client";

const CheckoutPage = () => {
  // Producto de prueba
  const cart = [
    {
      id: 1,
      name: "Producto de Prueba",
      price: 100.0,
      quantity: 1,
    },
  ];

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío. Añade productos antes de proceder.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cart }),
      });

      if (!res.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const paymentData = await res.json();

      if (paymentData.init_point) {
        window.location.href = paymentData.init_point; // Redirige a la página de pago de Mercado Pago
      } else {
        alert(
          "No se pudo iniciar el proceso de pago. Intenta de nuevo más tarde."
        );
      }
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      alert(
        "Ocurrió un error al iniciar el pago. Revisa la consola para más detalles."
      );
    }
  };

  return (
    <div>
      <h1>Resumen de tu carrito</h1>
      {cart.length === 0 ? (
        <p>No tienes productos en tu carrito.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price.toFixed(2)} x {product.quantity}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleCheckout}
        className="bg-green-500 text-white py-2 px-4"
      >
        Pagar con Mercado Pago
      </button>
    </div>
  );
};

export default CheckoutPage;
