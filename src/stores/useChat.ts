// import { create } from "zustand";
// import axios from "axios";
// import socket from "./socket";

// interface ChatMessage {
//   id: number;
//   content: string;
//   sender: { id: string; name: string };
//   timestamp: string;
// }

// interface ChatState {
//   messages: ChatMessage[];
//   fetchChatHistory: (chatId: string) => void;
//   sendMessage: (chatId: string, senderId: number, content: string) => void;
//   joinChat: (chatId: string, userId: number, role: "Admin" | "User") => void;
// }

// export const useChatStore = create<ChatState>((set) => ({
//   messages: [],
//   fetchChatHistory: async (chatId) => {
//     const response = await axios.get(`/chat/${chatId}/history`);
//     set({ messages: response.data });
//   },
//   sendMessage: async (chatId, senderId, content) => {
//     socket.emit("sendMessage", { chatId, senderId, content });
//   },
//   joinChat: (chatId, userId, role) => {
//     if (role === "Admin") {
//       socket.emit("joinChat", { userId, chatId });
//     } else if (role === "User") {
//       const personalChatId = `chat_${userId}`;
//       socket.emit("joinChat", { userId, chatId: personalChatId });
//     }

//     socket.on("newMessage", (message: ChatMessage) => {
//       set((state) => ({ messages: [...state.messages, message] }));
//     });
//   },
// }));
