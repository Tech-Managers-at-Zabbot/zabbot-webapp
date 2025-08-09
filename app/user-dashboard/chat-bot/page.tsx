"use client"

import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeProvider";

const ChatBot = () => {
  const { theme } = useTheme();
  const [backgroundColor, setBackgroundColor] = useState("#dff9fb");
  const [logoUrl, setLogoUrl] = useState("/general/zabbot-logo-blue.svg");
  const [cloudsUrl, setCloudsUrl] = useState("/userDashboard/light-clouds.svg");
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setBackgroundColor(theme === "dark" ? "#012657" : "#dff9fb");
    // setCloudsUrl(
    //   theme === "dark"
    //     ? "/userDashboard/dark-clouds.svg"
    //     : "/userDashboard/light-clouds.svg"
    // );
    // setLogoUrl(
    //   theme === "dark"
    //     ? "/general/zabbot-logo-white.svg"
    //     : "/general/zabbot-logo-blue.svg"
    // );
  }, [theme]);
  
  // List of possible proverbs
  const allProverbs = [
    'A stitch in time saves nine',
    'The early bird catches the worm',
    'Don\'t count your chickens before they hatch',
    'Actions speak louder than words',
    'Beauty is in the eye of the beholder',
    'Better late than never',
    'Don\'t put all your eggs in one basket',
    'Every cloud has a silver lining',
    'Honesty is the best policy',
    'When in Rome, do as the Romans do',
    'What is a dog',
    'Tell me a Proverb',
    'Translate “dog"',
    'What is “Saturday” in Yoruba'
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


  return (
    <div className="">
      <Head>
        <title>Chat Bot</title>
        <meta
          name="chat with ore"
          content="Join users from all over the world and immerse yourself in language & culture"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="h-screen flex overflow-hidden" style={{ fontFamily: "Lexend", backgroundColor: backgroundColor }}>
        {/* Sidebar */}
        <aside className="w-75 bg-[#012657] text-white p-5 overflow-y-auto">
          {/* <h2 className="text-xl font-semibold mb-4 mt-10">Names</h2> */}
        
          <div className="flex items-center">
            <div className="relative h-10 w-30 lg:h-[77px] lg:w-[273px]">
              <Image
                src={"/general/zabbot-logo-white.svg"}
                alt="Zabbot Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <button className="w-full bg-blue-500 mb-5 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+ New Chat</button>
          <div className="relative mb-10">
            <input type="text" className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500" placeholder="Search..."/>
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <div className="flex items-center mb-5">
            <p className="mr-5 text-lg font-medium text-white-800">
              Recent Conversations
            </p>
            <span className="bg-gray-100 text-black text-xs font-semibold px-2 py-1 rounded-full">
              3
            </span>
          </div>

          <hr></hr>

          <div className="mt-5 flex items-center p-4 bg-blue-400 rounded-lg shadow-md max-w-sm">
            <div className="flex items-center justify-center w-10 h-10 rounded-full mr-1">
              <svg className="w-6 h-6 text-white-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.896 9.896 0 01-4.991-1.398L2 21l1.398-3.518A9.896 9.896 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white-900">What is a dog in Yoruba?...</h4>
              <p className="text-xs text-gray-200">Yesterday</p>
            </div>
          </div>

          <div className="mt-5 flex items-center p-4 bg-blue-400 rounded-lg shadow-md max-w-sm">
            <div className="flex items-center justify-center w-10 h-10 rounded-full mr-1">
              <svg className="w-6 h-6 text-white-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.896 9.896 0 01-4.991-1.398L2 21l1.398-3.518A9.896 9.896 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white-900">Tell me a Yoruba proverb...</h4>
              <p className="text-xs text-gray-200">Yesterday</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#04326B] overflow-y-auto p-6">
          <div className="flex flex-col items-center mt-30">
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
                  <div className="bg-[#123F77] flex items-center space-x-2 p-4 rounded-md">
                    <svg className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12h4v2h-4v-2zm0 4h4v2h-4v-2z"/>
                    </svg>
                    <p className="text-[#77C2E6] text-[20px] font-[400] py-5">{proverb}</p>
                  </div>
                </div>
              ))}
              
            </div>
          </div>

          {/* Input box */}
          <div className="flex items-center p-4 bg-transparent border border-blue-500 rounded-lg mt-30">

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
            
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-white-500" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>Telegram icon</title>
                <path fill="currentColor" d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53"></path>
              </svg>
            </div>
          </div>

          <div className="flex flex-col items-center ">
            <p className="text-white-500 font-[400] text-[14px] mt-1">Ọ̀rẹ can make mistakes. Consider checking important information.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatBot;