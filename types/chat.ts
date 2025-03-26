export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  type: "text" | "file" | "image";
  status: "sent" | "delivered" | "read";
}

export interface ChatRoom {
  id: string;
  participants: string[]; // User IDs
  type: "private" | "group";
  createdAt: Date;
  lastMessage?: ChatMessage;
}
export interface ChatUser {
  id: string;
  name: string;
  avatarUrl?: string;
  lastSeen?: Date;
  status?: "online" | "offline" | "busy";
}
