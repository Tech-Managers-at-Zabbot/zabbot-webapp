"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  chatBackend,
  type ServerChatConversation,
  type ServerChatMessage,
  type ServerChatUsage,
} from "@/services/chatBackend";

export function useServerChat(userId?: string) {
  const [conversations, setConversations] = useState<ServerChatConversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ServerChatMessage[]>([]);
  const [usage, setUsage] = useState<ServerChatUsage | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const generation = useRef(0);
  const messageRequest = useRef(0);
  const sendingRef = useRef(false);

  useEffect(() => {
    const seq = ++generation.current;
    setConversations([]);
    setActiveId(null);
    setMessages([]);
    setUsage(null);
    setError(null);
    setLoading(Boolean(userId));
    sendingRef.current = false;
    if (!userId) return;

    void Promise.all([chatBackend.listConversations(), chatBackend.usage()])
      .then(([list, currentUsage]) => {
        if (generation.current !== seq) return;
        setConversations(list);
        setUsage(currentUsage);
        setActiveId(list[0]?.id ?? null);
      })
      .catch((cause) => {
        if (generation.current === seq) setError("Unable to load chat history. Please refresh to try again.");
        console.error("Failed to load chat history", cause);
      })
      .finally(() => {
        if (generation.current === seq) setLoading(false);
      });
    return () => { generation.current += 1; };
  }, [userId]);

  useEffect(() => {
    const seq = ++messageRequest.current;
    const id = activeId;
    setMessages([]);
    if (!id) return;
    void chatBackend.listMessages(id)
      .then((items) => {
        if (messageRequest.current === seq) setMessages(items);
      })
      .catch((cause) => {
        if (messageRequest.current === seq) setError("Unable to load messages.");
        console.error("Failed to load chat messages", cause);
      });
  }, [activeId]);

  const refreshUsage = useCallback(async () => {
    if (!userId) return;
    const currentUsage = await chatBackend.usage();
    setUsage(currentUsage);
  }, [userId]);

  const start = useCallback(async () => {
    if (!userId) throw new Error("Not signed in");
    const created = await chatBackend.createConversation();
    setConversations((old) => [created, ...old]);
    setActiveId(created.id);
    setMessages([]);
    return created.id;
  }, [userId]);

  const send = useCallback(async (input: string) => {
    const message = input.trim();
    if (!userId || !message || sendingRef.current || loading || !usage || usage.remaining <= 0) return;
    sendingRef.current = true;
    setSending(true);
    setError(null);
    const accountGeneration = generation.current;
    let id = activeId;
    try {
      if (!id) id = await start();
      const result = await chatBackend.send(id, message);
      if (generation.current !== accountGeneration) return;
      setUsage({
        used: result.used,
        remaining: result.remaining,
        limit: result.limit,
        resetTimezone: result.resetTimezone,
      });
      const [newMessages, newConversations] = await Promise.all([
        chatBackend.listMessages(id),
        chatBackend.listConversations(),
      ]);
      if (generation.current !== accountGeneration) return;
      if (id === activeId || !activeId) setMessages(newMessages);
      setConversations(newConversations);

      // Match the original UI convention of naming a chat after its first message.
      const activeConversation = newConversations.find((c) => c.id === id);
      if (activeConversation?.title === "New Chat") {
        const title = message.slice(0, 30) + (message.length > 30 ? "..." : "");
        try {
          const renamed = await chatBackend.rename(id, title);
          if (generation.current === accountGeneration) {
            setConversations((old) => old.map((c) => c.id === id ? renamed : c));
          }
        } catch (renameError) {
          console.error("Unable to name conversation", renameError);
        }
      }
      return result.reply;
    } catch (cause) {
      if (generation.current === accountGeneration) {
        setError("Unable to send your message. Please try again.");
        try { await refreshUsage(); } catch { /* keep existing quota display */ }
      }
      throw cause;
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }, [userId, activeId, loading, usage, start, refreshUsage]);

  const rename = useCallback(async (id: string, title: string) => {
    const updated = await chatBackend.rename(id, title);
    setConversations((old) => old.map((c) => c.id === id ? { ...c, ...updated } : c));
  }, []);

  const remove = useCallback(async (id: string) => {
    await chatBackend.remove(id);
    setConversations((old) => old.filter((c) => c.id !== id));
    setActiveId((old) => old === id ? null : old);
  }, []);

  return {
    conversations: conversations.filter((c) => c.title.toLowerCase().includes(searchTerm.toLowerCase())),
    activeId, setActiveId, messages, usage, loading, sending, error,
    searchTerm, setSearchTerm, start, send, rename, remove, refreshUsage,
  };
}
