/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useAlert } from "next-alert";
import { useUser } from "@/contexts/UserContext";
// import { useDailyLimit } from "@/hooks/useChatDailyLimit";

interface InLessonChatWithOreModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: string;
  backgroundColor?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const InLessonChatWithOreModal: React.FC<InLessonChatWithOreModalProps> = ({
  isOpen,
  onClose,
  word,
//   backgroundColor = "#dff9fb",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { addAlert } = useAlert();
  const { userDetails } = useUser();
  const firstName = userDetails?.firstName || "User";
  const chatLetter = firstName.charAt(0).toUpperCase();

//   const { callsRemaining, canMakeCall, decrementCalls } = useDailyLimit();

  // Initialize with the prefilled question when modal opens or word changes
  useEffect(() => {
    if (isOpen && word) {
    //   const initialQuestion = `use this word "${word}" in simple sentences with english interpretations`;
      setMessages([]);
      setInputValue("");
      // Automatically send the initial question
    //   sendInitialMessage(initialQuestion);
    }
  }, [isOpen, word]);

//   const sendInitialMessage = async (message: string) => {
//     if (!canMakeCall) {
//       addAlert(
//         "Notice!!!",
//         "You have reached your daily limit of 30 calls. Please try again tomorrow.",
//         "error"
//       );
//       return;
//     }

//     setLoading(true);
//     const userMessage: Message = { role: "user", content: message };
//     setMessages([userMessage]);

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//       });
//       const data = await res.json();
//       const reply =
//         data.choices?.[0]?.message?.content || "No response received.";

//       const assistantMessage: Message = { role: "assistant", content: reply };
//       setMessages([userMessage, assistantMessage]);

//       if (reply !== "No response received.") decrementCalls();
//     } catch (err) {
//       console.error(err);
//       addAlert("Error", "Failed to send message. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

  // Normalize function to remove diacritics for flexible matching
  
 const normalizeYorubaString = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

const sendMessage = async () => {
  if (!inputValue.trim()) return;

  // Normalize both strings
  const normalizedInput = normalizeYorubaString(inputValue);
  const normalizedWord = normalizeYorubaString(word);
  
  // Extract core word parts (split by spaces and check each part)
  const wordParts = normalizedWord.split(/\s+/).filter(p => p.length > 1);
  
  // Check if at least one significant word part is in the input
  const isRelated = wordParts.some(part => normalizedInput.includes(part)) ||
                    normalizedInput === normalizedWord ||
                    normalizedWord.includes(normalizedInput);
  
  if (!isRelated) {
    addAlert(
      "Invalid Question",
      `Only questions about the word "${word}" are allowed.`,
      "error"
    );
    return;
  }

  const userMessage: Message = { role: "user", content: inputValue };
  setMessages((prev) => [...prev, userMessage]);
  setInputValue("");
  setLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: inputValue }),
    });
    const data = await res.json();
    const reply =
      data.choices?.[0]?.message?.content || "No response received.";

    const assistantMessage: Message = { role: "assistant", content: reply };
    setMessages((prev) => [...prev, assistantMessage]);

  } catch (err) {
    console.error(err);
    addAlert("Error", "Failed to send message. Please try again.", "error");
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 p-4">
      <div
        className="bg-[#04326B] rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        style={{ fontFamily: "Lexend" }}
      >
       {/* <div
        className="relative rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        style={{ 
          fontFamily: "Lexend",
          backgroundImage: "url('/lessons/green-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      > */}
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-500">
          <div>
            <h2 className="text-white text-2xl font-semibold">
              Practice with {word}
            </h2>
            <p className="text-yellow-500 text-sm mt-1">
              Ask questions about this word only, eg use this word {word} in simple sentences with english interpretations`
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 hover:cursor-pointer transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end ${
                msg.role === "user" ? "justify-start" : "justify-end"
              }`}
            >
              {/* User icon on the left */}
              {msg.role === "user" && (
                <div className="w-12 h-12 mr-2 flex-shrink-0 flex font-bold text-xl items-center justify-center rounded-full bg-[#0098DE] text-white">
                  {chatLetter}
                </div>
              )}

              <div
                className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md border-2 border-[#33BBFA] ${
                  msg.role === "user"
                    ? "bg-[#213F67] text-white rounded-bl-none"
                    : "bg-[#213F67] text-white rounded-br-none"
                }`}
              >
                {msg.role === "assistant" && msg.content.includes("[") ? (
                  <>
                    <span className="text-yellow-500 font-normal">
                      {msg.content.substring(0, msg.content.indexOf("["))}
                    </span>
                    <span className="text-white">
                      {msg.content.substring(msg.content.indexOf("["))}
                    </span>
                  </>
                ) : (
                  <span className="text-white">{msg.content}</span>
                )}
              </div>

              {/* Assistant icon on the right */}
              {msg.role === "assistant" && (
                <div className="w-12 h-12 ml-2 flex-shrink-0 bg-[#0098DE] rounded-full flex items-center justify-center">
                  <img
                    src="../../../../premium/zabbot-ore-robot.svg"
                    alt="Assistant Avatar"
                    className="w-full h-full rounded-full object-cover object-top"
                  />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="text-gray-500 flex justify-end">
              <div className="pr-14 text-lg">Òrẹ́ is typing...</div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-blue-500">
          <div className="flex items-center p-4 border border-blue-500 rounded-lg bg-white">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeWidth="2"
                  d="M8 15h7.01v.01H15L8 15Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeWidth="2"
                  d="M20 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeWidth="2"
                  d="M6 9h.01v.01H6V9Zm0 3h.01v.01H6V12Zm0 3h.01v.01H6V15Zm3-6h.01v.01H9V9Zm0 3h.01v.01H9V12Zm3-3h.01v.01H12V9Zm0 3h.01v.01H12V12Zm3 0h.01v.01H15V12Zm3 0h.01v.01H18V12Zm0 3h.01v.01H18V15Zm-3-6h.01v.01H15V9Zm3 0h.01v.01H18V9Z"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder={`Ask questions about "${word}" in English or Yorùbá`}
              className="flex-grow mx-2 px-3 py-2 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  sendMessage();
                }
              }}
            />

            <button
              className="flex-shrink-0 p-3 rounded-lg bg-[#0098DE] hover:bg-[#007ACC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={sendMessage}
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M26.0704 6.01956C28.3929 5.78534 29.9038 8.4038 28.5391 10.2979L16.8516 26.5205C15.5293 28.3558 12.6721 27.8563 12.0498 25.6817L10.6114 20.6514C10.2874 19.5188 10.7328 18.3068 11.7129 17.6534L17.2217 13.9795L11.2862 16.9151C10.2303 17.437 8.95752 17.2158 8.13871 16.3692L4.50199 12.6075C2.92978 10.9812 3.92624 8.25878 6.1768 8.03128L26.0704 6.01956ZM12.5713 18.9414C12.1514 19.2214 11.96 19.7403 12.0987 20.2256L13.5381 25.2569C13.8051 26.1884 15.0291 26.4017 15.5957 25.6153L27.2842 9.39261C27.3716 9.27127 27.4277 9.14183 27.4629 9.01175L12.5713 18.9414ZM26.2256 7.5596L6.33207 9.57035C5.36751 9.66785 4.9404 10.8353 5.6143 11.5323L9.25102 15.294C9.60195 15.6567 10.1482 15.7511 10.6006 15.5274L26.6446 7.59378C26.5145 7.55943 26.3741 7.54463 26.2256 7.5596Z"
                  fill="#FFF9FF"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center mt-2">
            <p className="text-gray-400 text-sm">
              Òrẹ́ can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InLessonChatWithOreModal;