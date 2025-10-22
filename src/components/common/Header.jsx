import React from 'react';
import HamburgerMenu from '../ui/HamburgerMenu';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-transparent">
        <div className="flex items-center space-x-3">
            {/* Ícone de placeholder, podemos trocar depois */}
            <img src="https://cdn-icons-png.flaticon.com/512/13320/13320465.png" alt="CineMind Logo" className="w-10 h-10 sm:w-12 sm:h-12"/>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-wider">
                Cine<span className="text-[#D93F6E]">Mind</span>
            </h1>
        </div>
        
        {/* Ocultando os links de navegação por enquanto, pois o usuário não está logado */}
        {/* <div className="hidden md:flex items-center space-x-6 text-white font-semibold">
            <a href="#" className="hover:text-[#D93F6E] transition-colors">Início</a>
            <a href="#" className="hover:text-[#D93F6E] transition-colors">Meu Perfil</a>
            <a href="#" className="hover:text-[#D93F6E] transition-colors">Descobrir</a>
        </div>
        <div className="md:hidden">
            <HamburgerMenu />
        </div>
        */}
    </header>
  );
};

export default Header;
