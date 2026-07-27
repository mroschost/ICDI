import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { AccessibilityControls } from './AccessibilityControls';
import { getSafeImageUrl } from '../lib/imageUtils';

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
    <nav className="fixed top-0 w-full z-50 bg-[#f7f7f7]/95 border-b border-[#2A2368]/10 px-6 backdrop-blur-xl">
      <div className="absolute top-0 left-0 grid h-1.5 w-full grid-cols-3"><span className="bg-[#DE5121]"/><span className="bg-[#FBF137]"/><span className="bg-[#3B58AF]"/></div>
      <div className="max-w-7xl mx-auto h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={getSafeImageUrl('/brand/icdi-logo.png')} alt="ICDI" className="h-14 w-auto object-contain" />
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="#home">Início</NavLink>
          <NavLink to="#about">Sobre Nós</NavLink>
          <NavLink to="/projetos">Projetos</NavLink>
          <NavLink to="/transparencia">Transparência</NavLink>
          <div className="h-4 w-px bg-slate-100 mx-2"></div>
          <AccessibilityControls />
          <Link to="/#contact" className="px-6 py-3 bg-[#2A2368] text-white text-[0.625rem] font-semibold hover:bg-[#DE5121] transition-all uppercase tracking-widest">
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
