'use client'
import Image from 'next/image';
import ConversationCard from './conversation-card';

interface SideMenuProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

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

export default function SideMenu({ isOpen = false, setIsOpen = () => {} }: SideMenuProps) {
  return (
    <>
      {/* Overlay for mobile (only shows when menu is open) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side menu */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-75 bg-[#012657] text-white transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} md:translate-x-0`}
      >
        <div className="p-4 h-full flex flex-col">
           <div className="relative h-10 w-30 lg:h-[77px] lg:w-[273px]">
              <Image
                src={"/general/zabbot-logo-white.svg"}
                alt="Zabbot Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          
          <nav className="flex-1">
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
            </div>

            <hr></hr>
            
            {cardData.map(item => (
              <ConversationCard 
                key={item.id} 
                title={item.title} 
                date={item.date} 
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}