import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'chat_conversations';

export const useConversations = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Add state for the search term

  // Load conversations from local storage on initial render
  useEffect(() => {
    const storedConversations = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedConversations) {
      const parsed = JSON.parse(storedConversations);
      setConversations(parsed);
      if (parsed.length > 0) {
        // Set the most recent conversation as the current one
        setCurrentConversationId(parsed[0].id);
      }
    } else {
      // If no conversations exist, create a new one
      startNewChat();
    }
  }, []);

  // Sync conversations to local storage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

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
      const updatedConversations = prevConversations.filter(convo => convo.id !== id);
      
      // If the deleted conversation was the current one, switch to the first remaining conversation
      if (currentConversationId === id) {
        setCurrentConversationId(updatedConversations.length > 0 ? updatedConversations[0].conversationId : null);
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