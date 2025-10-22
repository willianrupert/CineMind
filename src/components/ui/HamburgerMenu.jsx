import React, { useState, useRef, useEffect } from 'react';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full bg-[#381127] hover:bg-[#D93F6E] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#260F21] border border-[#381127] rounded-lg shadow-xl py-2 animate-fade-in" style={{animationDuration: '0.2s'}}>
          <a href="#" className="block px-4 py-2 text-white hover:bg-[#381127]">Perfil</a>
          <a href="#" className="block px-4 py-2 text-white hover:bg-[#381127]">Configurações</a>
          <a href="#" className="block px-4 py-2 text-white hover:bg-[#381127]">Sobre o App</a>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
