import axiosInstance from "@/services/axiosInstance";

// All requests use the existing subscriber JWT through axiosInstance.
// Do not call /usage/claim: the backend performs atomic quota reservation
// as part of /conversations/:conversationId/send.
export type ServerChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};
export type ServerChatConversation = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};
export type ServerChatUsage = {
  used: number;
  remaining: number;
  limit: number;
  resetTimezone: string;
};
export type ServerChatSendResult = ServerChatUsage & { reply: string };

const prefix = "/chat";

export const chatBackend = {
  async usage(): Promise<ServerChatUsage> {
    const { data } = await axiosInstance.get<ServerChatUsage>(`${prefix}/usage`);
    return data;
  },

  async listConversations(): Promise<ServerChatConversation[]> {
    const { data } = await axiosInstance.get<{ conversations: ServerChatConversation[] }>(
      `${prefix}/conversations`
    );
    return data.conversations;
  },

  async createConversation(title = "New Chat"): Promise<ServerChatConversation> {
    const { data } = await axiosInstance.post<{ conversation: ServerChatConversation }>(
      `${prefix}/conversations`,
      { title }
    );
    return data.conversation;
  },

  async listMessages(conversationId: string): Promise<ServerChatMessage[]> {
    const { data } = await axiosInstance.get<{ messages: ServerChatMessage[] }>(
      `${prefix}/conversations/${encodeURIComponent(conversationId)}/messages`
    );
    return data.messages;
  },

  async send(conversationId: string, message: string): Promise<ServerChatSendResult> {
    const { data } = await axiosInstance.post<ServerChatSendResult>(
      `${prefix}/conversations/${encodeURIComponent(conversationId)}/send`,
      { message }
    );
    return data;
  },

  async rename(conversationId: string, title: string): Promise<ServerChatConversation> {
    const { data } = await axiosInstance.patch<{ conversation: ServerChatConversation }>(
      `${prefix}/conversations/${encodeURIComponent(conversationId)}`,
      { title }
    );
    return data.conversation;
  },

  async remove(conversationId: string): Promise<void> {
    await axiosInstance.delete(
      `${prefix}/conversations/${encodeURIComponent(conversationId)}`
    );
  },
};
