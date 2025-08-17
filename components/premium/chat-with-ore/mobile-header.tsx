'use client'

import { useState } from 'react'
import SideMenu from './side-menu'
import Image from 'next/image';

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="md:hidden bg-gray-800 text-white p-4 w-full flex justify-between items-center sticky top-0 z-30">
        <div className="relative h-10 w-30 lg:h-[77px] lg:w-[270px]">
          <Image
            src={"/general/zabbot-logo-white.svg"}
            alt="Zabbot Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <span className="text-2xl">✕</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>
      </header>
      
      {/* Side menu (rendered here so it appears only once) */}
      <SideMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  )
}