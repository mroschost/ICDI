import React from 'react';
import { Mail, Instagram, MapPin, Phone } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="lg:col-span-4 space-y-10 md:space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-gov-blue-900 serif italic">Fale Conosco</h2>
              <div className="space-y-8 md:space-y-10">
                <div className="flex gap-4 md:gap-6">
                  <div className="w-10 h-10 bg-gov-blue-50 rounded-lg flex items-center justify-center text-gov-blue-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-1">Telefone</p>
                    <p className="text-sm font-bold text-gov-blue-900">61 99968-2497</p>
                  </div>
                </div>
                <div className="flex gap-4 md:gap-6">
                  <div className="w-10 h-10 bg-gov-blue-50 rounded-lg flex items-center justify-center text-gov-blue-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-1">Endereco</p>
                    <p className="text-sm font-bold text-gov-blue-900">CLN 07, bloco K, lote 05, loja 01, Riacho Fundo I</p>
                  </div>
                </div>
                <div className="flex gap-4 md:gap-6">
                  <div className="w-10 h-10 bg-gov-blue-50 rounded-lg flex items-center justify-center text-gov-blue-700 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-1">E-mail</p>
                    <p className="text-sm font-bold text-gov-blue-900">icdi.projetos@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-4 md:gap-6">
                  <div className="w-10 h-10 bg-gov-blue-50 rounded-lg flex items-center justify-center text-gov-blue-700 shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-1">Instagram</p>
                    <p className="text-sm font-bold text-gov-blue-900">@icdi_df</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-slate-50 p-6 md:p-16 rounded-3xl border border-slate-100">
            <form className="grid sm:grid-cols-2 gap-8" onSubmit={e => e.preventDefault()}>
              <div className="sm:col-span-1">
                <label className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-900 mb-3 block">Nome Completo</label>
                <input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-5 text-sm focus:ring-2 focus:ring-gov-blue-700 outline-none transition-all" placeholder="Digite seu nome" />
              </div>
              <div className="sm:col-span-1">
                <label className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-900 mb-3 block">E-mail</label>
                <input type="email" className="w-full bg-white border border-slate-200 rounded-lg p-5 text-sm focus:ring-2 focus:ring-gov-blue-700 outline-none transition-all" placeholder="seu@email.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-900 mb-3 block">Assunto / Mensagem</label>
                <textarea className="w-full bg-white border border-slate-200 rounded-lg p-5 text-sm h-40 resize-none focus:ring-2 focus:ring-gov-blue-700 outline-none transition-all" placeholder="Como podemos ajudar" />
              </div>
              <div className="sm:col-span-2">
                <button className="w-full py-5 bg-gov-blue-700 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-gov-blue-800 transition-all shadow-lg">
                  Encaminhar Solicitao
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
