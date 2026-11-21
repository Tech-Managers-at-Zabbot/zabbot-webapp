/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

//const LOCAL_STORAGE_KEY = 'chat_conversations';
const getStorageKey = (userId: string) =>
  `chat_conversations_${userId}`;

//export const useConversations = () => {
export const useConversations = (userId?: string) => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const [currentConversationId, setCurrentConversationId] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Add state for the search term

  // Load conversations from local storage on initial render
useEffect(() => {
  if (!userId) {
    setConversations([]);
    setCurrentConversationId('');
    setLoadedUserId(null);
    return;
  }

  const storageKey = getStorageKey(userId);
  const storedConversations = localStorage.getItem(storageKey);

  let parsed = [];

  try {
    const data = storedConversations
      ? JSON.parse(storedConversations)
      : [];

    parsed = Array.isArray(data) ? data : [];
  } catch {
    parsed = [];
  }

  if (parsed.length > 0) {
    setConversations(parsed);
    setCurrentConversationId(parsed[0].id);
  } else {
    const newConversation = {
      id: uuidv4(),
      title: 'New Chat',
      date: new Date().toLocaleString(),
      messages: []
    };

    setConversations([newConversation]);
    setCurrentConversationId(newConversation.id);
  }

  setLoadedUserId(userId);
}, [userId]);

// Save conversations only for the authenticated user
useEffect(() => {
  if (!userId || loadedUserId !== userId) return;

  localStorage.setItem(
    getStorageKey(userId),
    JSON.stringify(conversations)
  );
}, [conversations, userId, loadedUserId]);
  
  // Start a new chat session
  const startNewChat = () => {
    const newId = uuidv4();
    const newConversation = {
      id: newId,
      title: 'New Chat', // Placeholder title
      date: new Date().toLocaleString(),
      messages: []
    };
    setConversations(prevConversations => [newConversation, ...prevConversations]);
    setCurrentConversationId(newId);
  };

  // Add a new message to the current conversation
  const addMessage = (role: string, content: string) => {
    setConversations(prevConversations => {
      const updatedConversations = prevConversations.map(convo => {
        if (convo.id === currentConversationId) {
          const updatedMessages = [...convo.messages, { role, content }];
          // Update the title with the first message if it's the first user message
          if (convo.messages.length === 0 && role === 'user') {
            return {
              ...convo,
              title: content.substring(0, 13) + '...', // Use a substring of the message as the title
              messages: updatedMessages
            };
          }
          return { ...convo, messages: updatedMessages };
        }
        return convo;
      });
      return updatedConversations;
    });
  };

  // Switch to a different conversation
  const switchConversation = (id: string) => {
    setCurrentConversationId(id);
  };

  // Get the current conversation and list of conversations
  const currentConversation = conversations.find(convo => convo.id === currentConversationId) || { messages: [] };
  const getConversationList = () => conversations;

  // Function to rename a conversation
  const renameConversation = (id: string, newTitle: string) => {
    setConversations(prevConversations => {
      return prevConversations.map(convo => {
        if (convo.id === id) {
          return { ...convo, title: newTitle };
        }
        return convo;
      });
    });
  };

  // Function to delete a conversation
const deleteConversation = (id: string) => {
  setConversations(prevConversations => {
    const updatedConversations = prevConversations.filter(
      convo => convo.id !== id
    );

    if (currentConversationId === id) {
      if (updatedConversations.length > 0) {
        setCurrentConversationId(updatedConversations[0].id);
      } else {
        // Always keep one active conversation available
        const newConversation = {
          id: uuidv4(),
          title: 'New Chat',
          date: new Date().toLocaleString(),
          messages: []
        };

        setCurrentConversationId(newConversation.id);
        return [newConversation];
      }
    }

    return updatedConversations;
  });
};

  // Filter conversations based on the search term
  const filteredConversations = conversations.filter(convo =>
    convo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    conversations: filteredConversations,
    currentConversationId,
    currentConversation: conversations.find(convo => convo.id === currentConversationId) || { messages: [] },
    startNewChat,
    addMessage,
    switchConversation,
    getConversationList,
    renameConversation,
    deleteConversation,
    searchTerm,
    setSearchTerm 
  };
};
