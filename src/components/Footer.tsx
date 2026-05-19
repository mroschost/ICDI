import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-12 md:py-20 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="flex items-center gap-3">
          <img src="/brand/icdi-logo.png" alt="ICDI" className="h-32 md:h-80 w-auto shrink-0 object-contain" />
        </div>
        <p className="text-[0.625rem] font-bold uppercase tracking-widest text-slate-400 text-center">
           © {new Date().getFullYear()} Instituto de Capacitação, Desenvolvimento e Inovação. <br />
           <span className="mt-1 block">Todos os direitos reservados • Distrito Federal</span>
        </p>
        <div className="flex gap-8">
           <a href="/admin" className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 hover:text-gov-blue-700 transition-colors">Admin</a>
           <a href="#" className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-700 hover:text-gov-blue-900 transition-colors">Privacidade</a>
           <a href="#" className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-700 hover:text-gov-blue-900 transition-colors">Contratos</a>
        </div>
      </div>
    </footer>
  );
};

