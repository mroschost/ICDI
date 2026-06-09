import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { AccessibilityControls } from './AccessibilityControls';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const NavLink = ({ to, children, className = "" }: { to: string, children: React.ReactNode, className?: string }) => {
    const isAnchor = to.startsWith('#');
    const href = isHome ? to : `/${to}`;
    
    if (isAnchor && isHome) {
      return (
        <a href={to} className={`text-[0.625rem] font-black hover:text-gov-blue-600 transition-colors uppercase tracking-widest text-slate-500 ${className}`}>
          {children}
        </a>
      );
    }

    return (
      <Link to={isAnchor ? `/${to}` : to} className={`text-[0.625rem] font-black hover:text-gov-blue-600 transition-colors uppercase tracking-widest text-slate-500 ${className}`}>
        {children}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-100 px-6">
      <div className="gov-section-stripe absolute top-0 left-0"></div>
      <div className="max-w-7xl mx-auto h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="ICDI" className="h-10 w-auto" />
          <div className="hidden sm:block">
            <span className="font-bold text-lg tracking-tight block leading-none text-gov-blue-900">Instituto de Capacitação</span>
            <span className="text-[0.5625rem] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Desenvolvimento e Inovação</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="#home">Início</NavLink>
          <NavLink to="#about">Sobre Nós</NavLink>
          <NavLink to="/projetos">Projetos</NavLink>
          <NavLink to="/transparencia">Transparência</NavLink>
          <div className="h-4 w-px bg-slate-100 mx-2"></div>
          <AccessibilityControls />
          <Link to="/#contact" className="px-6 py-2.5 bg-gov-blue-700 text-white rounded-lg text-[0.625rem] font-black hover:bg-gov-blue-800 transition-all uppercase tracking-widest shadow-md">
            Fale Conosco
          </Link>
        </div>

        <button className="md:hidden text-gov-blue-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <div className="pt-24 px-6 h-full flex flex-col gap-4">
              {[
                { name: 'Início', to: '#home' },
                { name: 'Sobre Nós', to: '#about' },
                { name: 'Projetos', to: '/projetos' },
                { name: 'Transparência', to: '/transparencia' },
                { name: 'Contato', to: '#contact', primary: true },
              ].map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={link.to.startsWith('#') ? (isHome ? link.to : `/${link.to}`) : link.to} 
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-3xl font-bold tracking-tight block py-2 ${link.primary ? 'text-gov-blue-600' : 'text-gov-blue-900'}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <p className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-4">Acessibilidade</p>
                <AccessibilityControls />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

