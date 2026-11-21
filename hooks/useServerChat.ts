"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  chatBackend,
  ServerChatConversation,
  ServerChatMessage,
  ServerChatUsage,
} from "@/services/chatBackend";

// This hook is intentionally not wired to the visible chat screen yet.
// It keeps server conversations separate from the browser's legacy history.
// The caller must not delete localStorage while transitioning users.
export function useServerChat(userId?: string) {
  const [conversations, setConversations] = useState<ServerChatConversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ServerChatMessage[]>([]);
  const [usage, setUsage] = useState<ServerChatUsage | null>(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generation = useRef(0);

  const refresh = useCallback(async () => {
    if (!userId) return;
    const myGeneration = generation.current;
    setLoading(true);
    setError(null);
    try {
      const [list, latestUsage] = await Promise.all([
        chatBackend.listConversations(),
        chatBackend.usage(),
      ]);
      if (generation.current !== myGeneration) return;
      setConversations(list);
      setUsage(latestUsage);
      setActiveId(previous => previous && list.some(item => item.id === previous)
        ? previous
        : (list[0]?.id ?? null));
    } catch (err) {
      if (generation.current === myGeneration) {
        setError("Unable to load saved conversations. Browser history has not been changed.");
      }
      console.error("Unable to load server chat", err);
    } finally {
      if (generation.current === myGeneration) setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    generation.current += 1;
    setConversations([]);
    setActiveId(null);
    setMessages([]);
    setUsage(null);
    setError(null);
    if (userId) void refresh();
    return () => { generation.current += 1; };
  }, [userId, refresh]);

  useEffect(() => {
    const id = activeId;
    const myGeneration = generation.current;
    setMessages([]);
    if (!id) return;
    void chatBackend.listMessages(id)
      .then(items => {
        if (generation.current === myGeneration) setMessages(items);
      })
      .catch(err => {
        if (generation.current === myGeneration) setError("Unable to load conversation messages.");
        console.error("Unable to load chat messages", err);
      });
  }, [activeId]);

  const start = useCallback(async () => {
    const created = await chatBackend.createConversation();
    setConversations(previous => [created, ...previous]);
    setActiveId(created.id);
    return created.id;
  }, []);

  const send = useCallback(async (message: string) => {
    if (!userId || !message.trim() || sending) return;
    setSending(true);
    setError(null);
    try {
      let id = activeId;
      if (!id) id = await start();
      const response = await chatBackend.send(id, message);
      setUsage({
        used: response.used,
        remaining: response.remaining,
        limit: response.limit,
        resetTimezone: response.resetTimezone,
      });
      // Query authoritative messages; do not store duplicate optimistic turns.
      const [latestMessages, latestList] = await Promise.all([
        chatBackend.listMessages(id),
        chatBackend.listConversations(),
      ]);
      setMessages(latestMessages);
      setConversations(latestList);
      return response.reply;
    } catch (err) {
      setError("Message not sent. Please try again.");
      // Resync usage in case the server counted or refunded the request.
      try { setUsage(await chatBackend.usage()); } catch { /* keep last known count */ }
      throw err;
    } finally {
      setSending(false);
    }
  }, [userId, activeId, sending, start]);

  const rename = useCallback(async (id: string, title: string) => {
    const updated = await chatBackend.rename(id, title);
    setConversations(previous => previous.map(item => item.id === id ? {...item, ...updated} : item));
  }, []);

  const remove = useCallback(async (id: string) => {
    await chatBackend.remove(id);
    setConversations(previous => previous.filter(item => item.id !== id));
    setActiveId(previous => previous === id ? null : previous);
  }, []);

  return {
    conversations, activeId, setActiveId, messages, usage,
    loading, sending, error, refresh, start, send, rename, remove,
  };
}
