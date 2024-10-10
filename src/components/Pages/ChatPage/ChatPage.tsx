import React from "react";

const ChatPage = () => {
  return (
    <div className="flex flex-col sm:flex-row h-full">
      {/* Lista de clientes */}
      <div className="w-full sm:w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">Clientes del Entrenador</h2>
        <div className="space-y-4">
          {/* Cliente 1 */}
          <div className="flex justify-between items-center p-2 bg-white border rounded-lg">
            <span>Cliente 1</span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>{" "}
            {/* Indicador de mensaje nuevo */}
          </div>
          {/* Cliente 2 */}
          <div className="flex justify-between items-center p-2 bg-white border rounded-lg">
            <span>Cliente 2</span>
            <span className="w-3 h-3 rounded-full border border-gray-300"></span>{" "}
            {/* Sin mensaje */}
          </div>
        </div>
      </div>

      {/* Ventana de chat */}
      <div className="flex-1 flex flex-col h-full">
        {/* Título del chat */}
        <div className="p-4 bg-gray-200 border-b">
          <h3 className="text-lg font-semibold">Chat con Cliente 1</h3>
        </div>

        {/* Cuerpo del chat */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {/* Mensajes */}
          <div className="mb-4">
            <div className="p-2 bg-gray-200 rounded-lg w-auto max-w-sm">
              Hola, ¿cómo va el entrenamiento?
            </div>
          </div>
          <div className="mb-4 text-right">
            <div className="p-2 bg-blue-500 text-white rounded-lg w-auto max-w-sm ml-auto">
              Todo bien, gracias por preguntar.
            </div>
          </div>
        </div>

        {/* Input de mensaje */}
        <div className="p-4 bg-gray-200 border-t flex items-center">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-lg"
            placeholder="Escribe un mensaje..."
          />
          <button className="p-2 bg-blue-500 text-white rounded-r-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2 2m-2-2v6m4-10h6m-6-6H4v16h6m0-6h4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
