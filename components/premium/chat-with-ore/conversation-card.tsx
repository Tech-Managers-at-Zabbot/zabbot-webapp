import React, { useState } from "react";

// Define the shape of the props
interface CardProps {
  id: string;
  title: string;
  date: string;
  onRename: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

// The component now accepts 'title' and 'date' as props
const ConversationCard = ({
  id,
  title,
  date,
  onRename,
  onDelete,
}: CardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close the menu when a button is clicked
  const handleRenameClick = () => {
    setIsOpen(false);
    const newTitle = prompt("Enter a new title:");
    if (newTitle) {
      onRename(id, newTitle);
    }
  };

  const handleDeleteClick = () => {
    setIsOpen(false);
    if (confirm("Are you sure you want to delete this conversation?")) {
      onDelete(id);
    }
  };

  return (
    <div className="mt-5 flex items-center p-4 bg-blue-400 rounded-lg shadow-md max-w-sm relative h-full">
      {/* Left Side: Chat Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full mr-1">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.896 9.896 0 01-4.991-1.398L2 21l1.398-3.518A9.896 9.896 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          ></path>
        </svg>
      </div>

      {/* Center: Title and Sub-text */}
      <div>
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <p className="text-xs text-gray-200">{date}</p>
      </div>

      {/* Right Side: Hamburger Menu Button and Dropdown */}
      <div className="ml-auto relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
          >
            <path
              d="M2.71094 9.62857C2.71094 10.2738 3.23403 10.7969 3.8793 10.7969C4.52458 10.7969 5.04767 10.2738 5.04767 9.62857C5.04767 8.9833 4.52458 8.46021 3.8793 8.46021C3.23403 8.46021 2.71094 8.9833 2.71094 9.62857Z"
              fill="#EBEBEB"
            />
            <path
              d="M10.1106 10.7969C9.46533 10.7969 8.94223 10.2738 8.94223 9.62857C8.94223 8.9833 9.46533 8.46021 10.1106 8.46021C10.7559 8.46021 11.279 8.9833 11.279 9.62857C11.279 10.2738 10.7559 10.7969 10.1106 10.7969Z"
              fill="#EBEBEB"
            />
            <path
              d="M16.3419 10.7969C15.6966 10.7969 15.1735 10.2738 15.1735 9.62857C15.1735 8.9833 15.6966 8.46021 16.3419 8.46021C16.9872 8.46021 17.5103 8.9833 17.5103 9.62857C17.5103 10.2738 16.9872 10.7969 16.3419 10.7969Z"
              fill="#EBEBEB"
            />
          </svg>
        </button>

        {/* Dropdown List (conditionally rendered) */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            {/* Rename Option */}
            <a
              href="#"
              onClick={handleRenameClick}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
              Rename
            </a>

            {/* Archive Option */}
            {/* <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6zm0 0v6a2 2 0 002 2h10a2 2 0 002-2v-6m-4 5h-4"></path>
              </svg>
              Archive
            </a> */}

            {/* Delete Option */}
            <a
              href="#"
              onClick={handleDeleteClick}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.013 21H7.987a2 2 0 01-1.92-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
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
