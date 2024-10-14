export interface IMessage {
  senderId: string;
  content: string;
  receiverId: string;
  sender: {
    name: string;
    role?: string;
  };
}

export interface IMessageUser {
  senderId: string;
  content: string;
  sender: {
    name: string;
    role?: string;
  };
}

export interface IUserMessage {
  id: string;
  name: string;
  hasNewMessage?: boolean;
}
