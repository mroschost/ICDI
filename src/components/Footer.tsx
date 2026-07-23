import React from 'react';
import { getSafeImageUrl } from '../lib/imageUtils';

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden py-12 md:py-16 border-t-0 bg-[#2A2368] text-white">
      <div className="absolute inset-x-0 top-0 grid grid-cols-3"><span className="h-2 bg-[#DE5121]"/><span className="h-2 bg-[#FBF137]"/><span className="h-2 bg-[#3B58AF]"/></div>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="flex items-center gap-3">
          <img src={getSafeImageUrl('/brand/icdi-logo.png')} alt="ICDI" className="h-24 md:h-32 w-auto shrink-0 object-contain brightness-0 invert" />
        </div>
        <p className="text-[0.625rem] font-bold uppercase tracking-widest text-white/55 text-center">
          © {new Date().getFullYear()} Instituto de Capacitação, Desenvolvimento e Inovação. <br />
          <span className="mt-1 block">Todos os direitos reservados • Distrito Federal</span>
        </p>
        <div className="flex gap-8">
          <a href="/admin" className="text-[0.625rem] font-black uppercase tracking-widest text-white/50 hover:text-[#FBF137] transition-colors">Admin</a>
          <a href="/transparencia" className="text-[0.625rem] font-black uppercase tracking-widest text-white hover:text-[#FBF137] transition-colors">Transparência</a>
          <a href="/#contact" className="text-[0.625rem] font-black uppercase tracking-widest text-white hover:text-[#FBF137] transition-colors">Contato</a>
        </div>
      </div>
    </footer>
  );
};
