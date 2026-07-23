import React from 'react';
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';

const contacts = [
  { icon: Phone, label: 'Telefone', value: '61 99968-2497' },
  { icon: Mail, label: 'E-mail', value: 'icdi.projetos@gmail.com' },
  { icon: Instagram, label: 'Instagram', value: '@icdi_df' },
  { icon: MapPin, label: 'Endereço', value: 'CLN 07, bloco K, lote 05, loja 01, Riacho Fundo I' },
];

export const ContactSection = () => (
  <section id="contact" className="relative overflow-hidden bg-[#2A2368] px-6 py-20 text-white md:py-28">
    <motion.div className="absolute -bottom-40 -left-36 h-[430px] w-[430px] rounded-full border-[72px] border-[#3B58AF]/45" animate={{rotate:360}} transition={{duration:46,repeat:Infinity,ease:'linear'}} />
    <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[.24em] text-[#FBF137]">Vamos conversar</span>
        <h2 className="mt-6 text-5xl font-semibold leading-[.98] tracking-[-.055em] md:text-7xl">Boas ideias começam com um encontro.</h2>
        <p className="mt-8 max-w-md text-sm leading-7 text-white/60">Fale com o ICDI para conhecer nossos projetos, propor parcerias ou construir novas possibilidades de impacto.</p>
        <div className="mt-12 grid gap-px bg-white/15 sm:grid-cols-2">
          {contacts.map(({icon:Icon,label,value})=><div key={label} className="bg-[#2A2368] p-5"><Icon className="mb-5 h-5 w-5 text-[#FBF137]"/><span className="block text-[9px] font-semibold uppercase tracking-[.18em] text-white/40">{label}</span><strong className="mt-2 block text-xs font-medium leading-5">{value}</strong></div>)}
        </div>
      </div>

      <motion.form initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="relative bg-[#f7f7f7] p-7 text-[#2A2368] md:p-12" onSubmit={e=>e.preventDefault()}>
        <div className="absolute right-0 top-0 h-3 w-32 bg-[#DE5121]" />
        <h3 className="text-2xl font-semibold tracking-[-.03em] md:text-3xl">Envie uma mensagem</h3>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <label className="text-[10px] font-semibold uppercase tracking-[.16em]">Seu nome<input className="mt-3 w-full border-0 border-b border-[#2A2368]/25 bg-transparent px-0 py-4 text-sm outline-none transition-colors focus:border-[#DE5121]" placeholder="Nome completo"/></label>
          <label className="text-[10px] font-semibold uppercase tracking-[.16em]">Seu e-mail<input type="email" className="mt-3 w-full border-0 border-b border-[#2A2368]/25 bg-transparent px-0 py-4 text-sm outline-none transition-colors focus:border-[#DE5121]" placeholder="voce@email.com"/></label>
          <label className="text-[10px] font-semibold uppercase tracking-[.16em] sm:col-span-2">Como podemos ajudar?<textarea className="mt-3 h-28 w-full resize-none border-0 border-b border-[#2A2368]/25 bg-transparent px-0 py-4 text-sm outline-none transition-colors focus:border-[#DE5121]" placeholder="Conte um pouco sobre sua ideia"/></label>
        </div>
        <button className="mt-9 flex w-full items-center justify-between bg-[#DE5121] px-6 py-5 text-xs font-semibold uppercase tracking-[.15em] text-white transition-transform hover:-translate-y-1">Enviar mensagem <ArrowUpRight className="h-4 w-4"/></button>
      </motion.form>
    </div>
  </section>
);
