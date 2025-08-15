import React, { useState } from 'react';

// Define the shape of the props
interface CardProps {
  title: string;
  date: string;
}

// The component now accepts 'title' and 'date' as props
const ConversationCard = ({ title, date }: CardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-5 flex items-center p-4 bg-blue-400 rounded-lg shadow-md max-w-sm relative">
      
      {/* Left Side: Chat Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full mr-1">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.896 9.896 0 01-4.991-1.398L2 21l1.398-3.518A9.896 9.896 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      </div>
      
      {/* Center: Title and Sub-text */}
      <div>
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <p className="text-xs text-gray-200">{date}</p>
      </div>
      
      {/* Right Side: Hamburger Menu Button and Dropdown */}
      <div className="ml-auto relative">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none hover:text-gray-200">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        
        {/* Dropdown List (conditionally rendered) */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            {/* Rename Option */}
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              Rename
            </a>

            {/* Archive Option */}
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6zm0 0v6a2 2 0 002 2h10a2 2 0 002-2v-6m-4 5h-4"></path>
              </svg>
              Archive
            </a>

            {/* Delete Option */}
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.013 21H7.987a2 2 0 01-1.92-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Delete
            </a>
          </div>
        )}
      </div>

    </div>
  );
};

export default ConversationCard;