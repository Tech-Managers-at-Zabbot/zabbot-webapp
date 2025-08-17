/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeProvider";
import MobileHeader from '../../../components/premium/chat-with-ore/mobile-header'


const ChatBot = () => {
  const { theme } = useTheme();
  const [backgroundColor, setBackgroundColor] = useState("#dff9fb");
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  interface Message {
    role: "user" | "assistant";
    content: string;
  }

  useEffect(() => {
    setBackgroundColor(theme === "dark" ? "#012657" : "#dff9fb");
  }, [theme]);
  
  // List of possible proverbs
  const allProverbs = [
    'TRANSLATE “We will meet tomorrow"',
    'TRANSLATE “I love you” into Yorùbá with a cultural note',
    'TRANSLATE “How much is this?” into Yorùbá and give 2 alternative phrasings',
    'TRANSLATE “Where is the market?” into Yorùbá and give me a pronunciation tip',
    'TRANSLATE “Please call me later” into Yorùbá',
    'TRANSLATE “Happy birthday” into Yorùbá and share a traditional birthday greeting',
    'Teach me a Yorùbá proverb about patience',
    'Tell me a short Yorùbá folktale in English',
    'Explain the cultural meaning of kneeling or prostrating when greeting',
    'Test my tones with five common Yorùbá words',
    'Give me three Yorùbá greetings for elders',
    'Quiz me on five Yorùbá words for family members',
    'Show me how to count from 1 to 5 in Yorùbá',
    'Show me how to say the days of the week in Yorùbá',
    'Teach me how to say hello in Yorùbá in three different ways',
    'Give me five common Yorùbá words for food',
    'Help me ask “What is your name?” in Yorùbá',
    'Teach me a simple Yorùbá song or rhyme',
    'Help me practice saying “thank you” and “you’re welcome” in Yorùbá',
    'How do I say "thank you" and "you\'re welcome" in Yorùbá?'
  ];

  // Function to get 4 random proverbs
  const getRandomProverbs = () => {
    const shuffled = [...allProverbs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  // State to store the current random proverbs
  const [randomProverbs, setRandomProverbs] = useState(getRandomProverbs());

  // Function to refresh the random proverbs
  const refreshProverbs = () => {
    setRandomProverbs(getRandomProverbs());
  };

  // Function to handle proverb click
  const handleProverbClick = (proverb: any) => {
    setInputValue(proverb);
  };

  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", content: inputValue }];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputValue }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'No response received.';

      const assistantMessage: Message = { role: "assistant", content: reply }; // ✅ matches Message interface

      setMessages([...newMessages, assistantMessage]);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cardData = [
    {
      id: 1,
      title: "What is a dog in Yoruba?",
      date: "Yesterday"
    },
    {
      id: 2,
      title: "How to say 'hello' in French",
      date: "2 days ago"
    },
    {
      id: 3,
      title: "What are the components of a Next.js app?",
      date: "Last week"
    }
  ];


  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Mobile header (only shows on small screens) */}
      <MobileHeader />
      
      {/* Main content area */}
      <div className=" flex overflow-hidden" style={{ fontFamily: "Lexend", backgroundColor: backgroundColor }}>

        {/* Main Content */}
        <main className="flex-1 bg-[#04326B] overflow-y-auto p-6">
          <div className="flex flex-col items-center mt-20">
            <p className="text-white text-[28px] font-[500]">Chat with Ọ̀rẹ́, Your Yorùbá AI Buddy</p>
            <p className="text-yellow-500 mt-2 text-[16px] font-[400]">Ask questions, practice phrases, get translations, explore culture.</p>
            <p className="text-yellow-500 mt-20 text-[26px] font-[400]">Instant answers. Bilingual always</p>
            
            {/* <button
              onClick={refreshProverbs}
              className="p-2 bg-[#005278] text-white rounded hover:bg-[#33BBFA] transition mb-6"
            >
              Get New Proverbs
            </button> */}

            {/* Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6 mt-5">

              {randomProverbs.map((proverb, index) => (
                <div className="p-[4px] bg-gradient-to-r from-[#33BBFA] to-[#005278] rounded-lg p-5 cursor-pointer"
                  onClick={() => handleProverbClick(proverb)}
                  key={index}
                >
                  <div className="bg-[#123F77] flex items-center space-x-2 h-full p-4 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.86086 2.86842C9.10454 0.599443 5.89514 0.599445 5.13882 2.86842C4.86016 3.70437 4.20419 4.36035 3.36823 4.639C1.09926 5.39532 1.09926 8.60472 3.36823 9.36104C4.20419 9.63969 4.86016 10.2957 5.13882 11.1316C5.89514 13.4006 9.10454 13.4006 9.86086 11.1316C10.1395 10.2957 10.7955 9.63969 11.6314 9.36104C13.9004 8.60472 13.9004 5.39532 11.6314 4.639C10.7955 4.36035 10.1395 3.70437 9.86086 2.86842ZM7.35241 3.60628C7.3712 3.5499 7.39311 3.53322 7.40448 3.52553C7.42306 3.51296 7.45599 3.50002 7.49984 3.50002C7.54369 3.50002 7.57662 3.51296 7.5952 3.52553C7.60656 3.53322 7.62847 3.5499 7.64726 3.60628C8.15816 5.13898 9.36088 6.34169 10.8936 6.85259C10.95 6.87139 10.9666 6.89329 10.9743 6.90466C10.9869 6.92324 10.9998 6.95617 10.9998 7.00002C10.9998 7.04387 10.9869 7.0768 10.9743 7.09538C10.9666 7.10675 10.95 7.12866 10.8936 7.14745C9.36088 7.65835 8.15816 8.86106 7.64726 10.3938C7.62847 10.4501 7.60656 10.4668 7.5952 10.4745C7.57662 10.4871 7.54369 10.5 7.49984 10.5C7.45599 10.5 7.42306 10.4871 7.40448 10.4745C7.39311 10.4668 7.3712 10.4501 7.35241 10.3938C6.84151 8.86106 5.6388 7.65835 4.1061 7.14745C4.04972 7.12866 4.03304 7.10675 4.02535 7.09538C4.01277 7.0768 3.99984 7.04387 3.99984 7.00002C3.99984 6.95617 4.01277 6.92324 4.02535 6.90466C4.03304 6.89329 4.04972 6.87139 4.1061 6.85259C5.6388 6.34169 6.84151 5.13898 7.35241 3.60628Z" fill="#77C2E6"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.3015 10.5464C20.2439 7.37345 15.7558 7.37345 14.6981 10.5464C14.1234 12.2706 12.7704 13.6236 11.0462 14.1983C7.87326 15.256 7.87326 19.7441 11.0462 20.8017C12.7704 21.3764 14.1234 22.7294 14.6981 24.4536C15.7558 27.6266 20.2439 27.6266 21.3015 24.4536C21.8763 22.7294 23.2292 21.3764 24.9534 20.8017C28.1264 19.7441 28.1264 15.256 24.9535 14.1983C23.2292 13.6236 21.8763 12.2706 21.3015 10.5464ZM16.9117 11.2843C17.2603 10.2386 18.7394 10.2386 19.0879 11.2843C19.8949 13.7052 21.7946 15.6049 24.2156 16.4119C25.2613 16.7605 25.2613 18.2396 24.2156 18.5881C21.7946 19.3951 19.8949 21.2948 19.0879 23.7158C18.7394 24.7614 17.2603 24.7614 16.9117 23.7158C16.1048 21.2948 14.205 19.3951 11.7841 18.5881C10.7384 18.2396 10.7384 16.7605 11.7841 16.4119C14.205 15.6049 16.1048 13.7052 16.9117 11.2843Z" fill="#77C2E6"/>
                    </svg>
                    <p className="text-[#77C2E6] text-[20px] font-[400] py-5">{proverb}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-300 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-gray-500">Ọ̀rẹ is typing...</div>}
          </div>

          {/* Input box */}
          <div className="flex items-center p-4 border border-blue-500 rounded-lg mt-30">

            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M8 15h7.01v.01H15L8 15Z"/>
                <path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M20 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z"/>
                <path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M6 9h.01v.01H6V9Zm0 3h.01v.01H6V12Zm0 3h.01v.01H6V15Zm3-6h.01v.01H9V9Zm0 3h.01v.01H9V12Zm3-3h.01v.01H12V9Zm0 3h.01v.01H12V12Zm3 0h.01v.01H15V12Zm3 0h.01v.01H18V12Zm0 3h.01v.01H18V15Zm-3-6h.01v.01H15V9Zm3 0h.01v.01H18V9Z"/>
              </svg>
            </div>

            <input 
              type="text" 
              placeholder="Ask me anything in English or in Yoruba. My response will always be in both language. For a translation request, start with translate" className="bg-white flex-grow mx-2 px-3 h-15 py-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none rounded" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            
            <button className="flex-shrink-0 p-3 rounded-lg bg-[#005278]" onClick={sendMessage} disabled={loading}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M26.0704 6.01956C28.3929 5.78534 29.9038 8.4038 28.5391 10.2979L16.8516 26.5205C15.5293 28.3558 12.6721 27.8563 12.0498 25.6817L10.6114 20.6514C10.2874 19.5188 10.7328 18.3068 11.7129 17.6534L17.2217 13.9795L11.2862 16.9151C10.2303 17.437 8.95752 17.2158 8.13871 16.3692L4.50199 12.6075C2.92978 10.9812 3.92624 8.25878 6.1768 8.03128L26.0704 6.01956ZM12.5713 18.9414C12.1514 19.2214 11.96 19.7403 12.0987 20.2256L13.5381 25.2569C13.8051 26.1884 15.0291 26.4017 15.5957 25.6153L27.2842 9.39261C27.3716 9.27127 27.4277 9.14183 27.4629 9.01175L12.5713 18.9414ZM26.2256 7.5596L6.33207 9.57035C5.36751 9.66785 4.9404 10.8353 5.6143 11.5323L9.25102 15.294C9.60195 15.6567 10.1482 15.7511 10.6006 15.5274L26.6446 7.59378C26.5145 7.55943 26.3741 7.54463 26.2256 7.5596Z" fill="#FFF9FF"/>
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center ">
            <p className="text-white-500 font-[400] text-[14px] mt-1">Ọ̀rẹ can make mistakes. Consider checking important information.</p>
          </div>

          {response && (
            <div className="text-black" style={{ marginTop: "1rem", padding: "1rem", background: "#f5f5f5" }}>
              <strong>Ọ̀rẹ: </strong> {response}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChatBot;