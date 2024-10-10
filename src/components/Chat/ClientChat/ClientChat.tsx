"use client";
import React, { useState, useEffect, useRef } from "react";
import useSocket from "@/stores/useSocket";
import { useAuthStore } from "@/stores/userAuthStore";
import axios from "axios";

const ClientChat: React.FC = () => {
  const { user } = useAuthStore();
  const socket = useSocket();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [adminOnline, setAdminOnline] = useState(false);
  const [adminTyping, setAdminTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/history/${user?.id}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (socket) {
      fetchChatHistory();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      socket.on("message", (message: any) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      socket.on("adminStatus", (status: { online: boolean }) => {
        setAdminOnline(status.online);
      });
      socket.on("adminTyping", (status: { isTyping: boolean }) => {
        setAdminTyping(status.isTyping);
      });
    }

    return () => {
      if (socket) {
        socket.off("message");
        socket.off("adminStatus");
        socket.off("adminTyping");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = () => {
    if (socket && newMessage.trim() && user) {
      socket.emit("message", {
        senderId: user.id,
        content: newMessage,
      });
      setNewMessage("");
      // Elimina esta línea para evitar duplicados
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { sender: user, content: newMessage },
      // ]);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!user || user.role !== "User") {
    return null;
  }

  return (
    <>
      {!isOpen && (
        <div
          className="fixed flex transition-all border border-gray-600 duration-300 bottom-0 right-0 m-4 py-2 px-3 items-center bg-black text-white rounded-2xl cursor-pointer shadow-md hover:shadow-xl"
          onClick={toggleModal}
        >
          <span className="font-semibold text-sm">Trainer</span> &nbsp;
          <span className="flex items-center">
            <span className="text-sm text-gray-400">
              {adminOnline ? "Online" : "Offline"}
            </span>
            <span
              className={`ml-2 w-2 h-2 rounded-full ${
                adminOnline ? "bg-green-500" : "bg-red-800"
              }`}
            ></span>
          </span>
        </div>
      )}
      {isOpen && (
        <div className="fixed bg-black bg-opacity-80 backdrop-blur-md flex flex-col bottom-0 right-0 w-96 h-96 border rounded-lg  z-50">
          <button
            onClick={toggleModal}
            className="flex relative justify-between items-center p-3 shadow-md bg-black text-white rounded-t-lg border-b"
          >
            <div className="font-semibold flex">
              Trainer
              {adminTyping && (
                <div className="text-sm text-normal text-gray-500 ml-2">
                  typing...
                </div>
              )}
            </div>
            <span className="flex items-center">
              <span className="text-md text-gray-600">
                {adminOnline ? "Online" : "Offline"}
              </span>
              <span
                className={`ml-2 w-2 h-2 rounded-full ${
                  adminOnline ? "bg-green-500" : "bg-red-800"
                }`}
              ></span>
            </span>
          </button>

          <div className="flex-1 p-4 relative overflow-y-scroll overflow-x-hidden messages-scroll">
            <div className="relative ">
              {loadingMessages && (
                <div className="fixed rounded-lg w-full h-full inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md">
                  <div>
                    <span className="text-white">Loading messages ...</span>
                  </div>
                </div>
              )}
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg.sender?.role === "Admin" ? (
                    <div className="mb-4 text-left inline-block">
                      <div className="p-2 bg-gray-200 rounded-lg w-auto max-w-xs ml-auto">
                        {msg.content}
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 flex  text-right">
                      <p className="p-2 bg-primary text-white rounded-lg w-auto max-w-xs ml-auto ">
                        {msg.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="flex items-center p-2 bg-gray-400 border-t">
            <input
              type="text"
              value={newMessage}
              className="flex-1 p-2 border rounded-l-lg text-black"
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write a message..."
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-black text-white rounded-r-lg"
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
        </div>
      )}
    </>
  );
};

export default ClientChat;
