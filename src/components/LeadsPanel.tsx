import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Calendar, 
  MessageSquare, 
  ExternalLink, 
  CheckCircle2, 
  Clock,
  ChevronDown,
  ChevronUp,
  Search
} from 'lucide-react';
import { leadService } from '../services/leadService';
import { Lead } from '../types';

export const LeadsPanel = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = leadService.getLeads((data) => {
      setLeads(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const formatDate = (date: any) => {
    if (!date) return '-';
    // Handle Firestore Timestamp or Date
    const d = date.toDate ? date.toDate() : new Date(date);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d);
  };

  const openWhatsApp = (lead: Lead) => {
    if (!lead.name) return;
    const text = encodeURIComponent(`Olá ${lead.name.split(' ')[0]}! Aqui é da equipe do ICDI. Vimos seu interesse em nosso site e gostaria de dar continuidade ao seu contato.`);
    // Ideally we would have the phone number captured, but if not, we can't open WA without a number.
    // Let's assume the last question asks for the phone/email.
    // We'll look for something that looks like a phone number in the answers.
    // Improved regex for Brazilian phone numbers: (XX) 9XXXX-XXXX or XX9XXXXXXXX
    const phoneRegex = /(?:(?:\+?55\s?)?(?:\(?([1-9][1-9])\)?\s?)?(?:9\s?)?(\d{4})[-\s]?(\d{4}))/;
    const foundPhone = lead.answers.find(a => {
      const clean = a.answer.replace(/\D/g, '');
      return (clean.length >= 10 && clean.length <= 13);
    });
    
    if (foundPhone) {
      let cleanPhone = foundPhone.answer.replace(/\D/g, '');
      // If it doesn't start with 55 and has 10 or 11 digits, add 55
      if (cleanPhone.length === 10 || cleanPhone.length === 11) {
        cleanPhone = `55${cleanPhone}`;
      } else if (cleanPhone.length === 13 && cleanPhone.startsWith('55')) {
        // already has 55
      }
      window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
    } else {
      alert('Número de telefone não identificado nas respostas deste lead. O usuário deve digitar um número com DDD (ex: 61999999999).');
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.answers.some(a => a.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gov-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-gov-blue-900">Leads Capturados</h3>
            <p className="text-xs text-slate-500 mt-1">
              Contatos que iniciaram interação com o chat do WhatsApp em tempo real.
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Buscar por nome ou conteúdo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-gov-blue-500 outline-none w-full md:w-64"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm italic">Nenhum lead capturado ainda.</p>
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <motion.div 
                layout
                key={lead.id}
                className={`border rounded-2xl transition-all ${expandedLead === lead.id ? 'border-gov-blue-200 bg-gov-blue-50/30' : 'border-slate-100 bg-white hover:border-gov-blue-100'}`}
              >
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${lead.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gov-blue-900 flex items-center gap-2">
                        {lead.name}
                        {lead.completed ? (
                          <span className="flex items-center gap-1 text-[0.5625rem] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Completo
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[0.5625rem] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                            <Clock className="w-2.5 h-2.5" /> Incompleto
                          </span>
                        )}
                      </h4>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1 text-[0.625rem] text-slate-400">
                          <Calendar className="w-3 h-3" /> {formatDate(lead.createdAt)}
                        </span>
                        <span className="flex items-center gap-1 text-[0.625rem] text-slate-400">
                          <MessageSquare className="w-3 h-3" /> {lead.answers.length} respostas
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openWhatsApp(lead);
                      }}
                      className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#075e54] text-white rounded-lg text-[0.625rem] font-bold uppercase tracking-wider hover:bg-[#128c7e] transition-all shadow-sm"
                    >
                      <ExternalLink className="w-3 h-3" /> WhatsApp
                    </button>
                    {expandedLead === lead.id ? <ChevronUp className="w-5 h-5 text-slate-300" /> : <ChevronDown className="w-5 h-5 text-slate-300" />}
                  </div>
                </div>

                {expandedLead === lead.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 pb-4 pt-0 border-t border-slate-100"
                  >
                    <div className="mt-4 space-y-4">
                      {lead.answers.map((item, idx) => (
                        <div key={idx} className="relative pl-4 border-l-2 border-slate-100 py-1">
                          <p className="text-[0.625rem] font-black uppercase text-slate-400 tracking-wider mb-1">{item.question}</p>
                          <p className="text-sm font-medium text-gov-blue-800">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex sm:hidden">
                      <button 
                        onClick={() => openWhatsApp(lead)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#075e54] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                      >
                        <ExternalLink className="w-4 h-4" /> Entrar em contato via WhatsApp
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
