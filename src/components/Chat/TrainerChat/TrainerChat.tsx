"use client";
import React, { useEffect, useState, useRef } from "react";
import useSocket from "@/stores/useSocket";
import { useAuthStore } from "@/stores/userAuthStore";
import axios from "axios";
import AvatarUser from "../../../components/images/AvatarUser/AvatarUser";
import TitleH1 from "../../../components/titles/TitleH1";

const TrainerChat: React.FC = () => {
  const { user } = useAuthStore(); // El admin actual logueado
  const socket = useSocket();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]); // Lista real de usuarios desde la API
  const [selectedUser, setSelectedUser] = useState<string | null>(null); // Usuario seleccionado
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Obtener lista de usuarios reales desde la API.
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Obtener estado de "nuevo mensaje" desde el backend
  const fetchNewMessageStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/new-message-status/${user!.id}`
      );
      const status = response.data;
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          hasNewMessage: status[user.id] || false,
        }))
      );
    } catch (error) {
      console.error("Error fetching new message status:", error);
    }
  };

  // Obtener historial de chat real del usuario seleccionado.
  const fetchChatHistory = async (userId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/history/${userId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    if (socket) {
      fetchUsers();
      fetchNewMessageStatus();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      socket.on("message", (message: any) => {
        if (message.sender?.id === selectedUser) {
          setMessages((prevMessages) => [...prevMessages, message]);
        } else {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === message.sender?.id
                ? { ...user, hasNewMessage: true }
                : user
            )
          );
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("message");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, selectedUser]);

  useEffect(() => {
    // Desplazar el scroll al final de los mensajes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const selectUser = async (userId: string) => {
    setSelectedUser(userId);
    await fetchChatHistory(userId);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, hasNewMessage: false } : user
      )
    );
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/mark-as-read/${userId}`
    );
  };

  const sendMessage = () => {
    if (socket && newMessage.trim() && user && selectedUser) {
      const messageToSend = {
        senderId: user.id,
        content: newMessage,
        receiverId: selectedUser,
        sender: {
          name: user.name, // Añadimos el nombre del remitente
        },
      };

      // Emitir el mensaje al servidor
      socket.emit("message", messageToSend);

      // Actualizar inmediatamente los mensajes en el estado local
      setMessages((prevMessages) => [...prevMessages, messageToSend]);

      // Limpiar el campo de texto
      setNewMessage("");
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (socket && user && selectedUser) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      socket.emit("typing", {
        senderId: user.id,
        isTyping: true,
        receiverId: selectedUser,
      });

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("typing", {
          senderId: user.id,
          isTyping: false,
          receiverId: selectedUser,
        });
      }, 1000); // Deja de enviar "typing" después de 1 segundo de inactividad
    }
  };

  // Obtener el nombre del usuario seleccionado
  const selectedUserName =
    users.find((u) => u.id === selectedUser)?.name || "Usuario";

  return (
    <>
      <div className="">
        <TitleH1>Chats</TitleH1>
        <div className="flex pb-3 text-gray-400 ">
          <p className="flex items-center pr-2">
            <span className="ml-2 w-3 h-3 rounded-full bg-gray-300"></span>
            &nbsp; New users and read messages
          </p>
          <p> | </p>
          <p className="flex items-center">
            <span className="ml-2 w-3 h-3 rounded-full bg-orange-500"></span>
            &nbsp; Unread messages
          </p>
        </div>
      </div>

      <div className="flex flex-">
        {/* Panel lateral para seleccionar usuarios */}

        <div className="w-1/4 bg-white rounded-lg mr-5 shadow-lg border-r p-4">
          <div className="text-gray-400 border-b mb-4">Select a chat</div>
          {users
            .filter((u) => u.id !== user?.id) // Filtra para que no muestre al admin
            .map((user) => (
              <div
                key={user.id}
                className={`flex items-center p-2 mb-2 border cursor-pointer rounded-md ${
                  user.hasNewMessage ? "bg-orange-100" : ""
                } ${
                  selectedUser === user.id
                    ? "bg-black text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => selectUser(user.id)}
              >
                <span className="flex-1">{user.name}</span>
                {user.hasNewMessage && (
                  <span className="ml-2 w-3 h-3 rounded-full bg-orange-500"></span>
                )}
              </div>
            ))}
        </div>

        {/* Ventana de chat */}
        <div className="w-3/4  flex flex-col h-[calc(100vh-372px)] bg-white rounded-xl shadow-lg">
          {selectedUser ? (
            <>
              {/* Chat header */}
              <div className="flex items-center p-4 border-b ">
                <AvatarUser
                  className="w-10 h-10 mr-2 bg-gray-500"
                  name={selectedUserName}
                />
                {selectedUserName}
              </div>

              {/* Chat messages */}
              <div
                className="flex-1 messages-scroll flex-col overflow-y-auto px-5  h-full"
                ref={messagesEndRef}
              >
                {messages.map((msg, index) => (
                  <div key={index} className="">
                    {msg.sender?.role === "User" ? (
                      <div className="mb-4 text-left inline-block">
                        <div className="p-2 bg-gray-200 rounded-lg w-auto max-w-xs ml-auto break-words">
                          {msg.content}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4 flex  text-right">
                        <p className="p-2 bg-primary text-white rounded-lg w-auto max-w-xs ml-auto break-words">
                          {msg.content}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input para enviar mensajes */}
              <div className="flex items-center p-5 border-t ">
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleTyping}
                  placeholder="Write a message..."
                  className="flex-1 p-2 border rounded-l-md bg-gray-200 "
                />
                <button
                  onClick={sendMessage}
                  className="p-2 bg-black text-white rounded-r-md"
                >
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
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a chat
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrainerChat;
