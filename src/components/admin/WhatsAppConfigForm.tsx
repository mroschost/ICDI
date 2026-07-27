import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Plus, Trash2, CheckCircle2, Save } from 'lucide-react';
import { WhatsAppConfig } from '../../types';
import { configService } from '../../services/configService';

const whatsappSchema = z.object({
  photoUrl: z.string().url('URL da foto inválida'),
  chatName: z.string().min(3, 'Nome do chat é obrigatório'),
  welcomeMessage: z.string().min(5, 'Mensagem de boas-vindas é obrigatória'),
  ctaText: z.string().min(5, 'Texto do CTA é obrigatório'),
  phoneNumber: z.string().min(10, 'Número de telefone inválido'),
  questions: z.array(z.object({
    text: z.string().min(1, 'Pergunta é obrigatória'),
    options: z.array(z.string()),
  })).min(1, 'Pelo menos uma pergunta'),
});

type WhatsAppFormData = z.infer<typeof whatsappSchema>;

const WhatsAppQuestionOptions = ({ control, qIndex, register }: { control: any, qIndex: number, register: any }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${qIndex}.options` as any
  });

  return (
    <div className="mt-4 pl-14 space-y-3 overflow-hidden">
      <div className="flex items-center justify-between pb-2 border-b border-white/40">
        <label className="text-[0.5625rem] font-black uppercase tracking-widest text-slate-400">Opções de Resposta Rápida (Botões)</label>
        <button 
          type="button" 
          onClick={() => append('')}
          className="text-[0.5625rem] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md"
        >
          <Plus className="w-3 h-3" /> Adicionar Opção
        </button>
      </div>
      <div className="flex flex-wrap gap-2 min-h-8">
        {fields.map((field, optIndex) => (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={field.id} 
            className="flex items-center gap-2 bg-white border border-slate-100 rounded-lg px-2 py-1 shadow-sm group"
          >
            <input 
              {...register(`questions.${qIndex}.options.${optIndex}` as const)} 
              className="bg-transparent border-none text-[0.625rem] font-bold outline-none w-20 focus:ring-0"
              placeholder="Ex: Sim"
            />
            <button type="button" onClick={() => remove(optIndex)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
        {fields.length === 0 && <p className="text-[0.5625rem] text-slate-300 italic">Nenhuma opção configurada. O usuário digitará a resposta.</p>}
      </div>
    </div>
  );
};

export const WhatsAppConfigForm = ({ config, onSuccess }: { config: WhatsAppConfig | null, onSuccess: () => void }) => {
  const [success, setSuccess] = useState(false);
  const { register, control, handleSubmit, formState: { isSubmitting }, reset } = useForm<WhatsAppFormData>({
    resolver: zodResolver(whatsappSchema),
    defaultValues: config ? {
      photoUrl: config.photoUrl,
      chatName: config.chatName,
      welcomeMessage: config.welcomeMessage,
      ctaText: config.ctaText,
      phoneNumber: config.phoneNumber,
      questions: config.questions.map(q => ({
        text: q.text,
        options: q.options || []
      }))
    } : {
      photoUrl: '',
      chatName: '',
      welcomeMessage: '',
      ctaText: '',
      phoneNumber: '',
      questions: [{ text: '', options: [] }]
    }
  });

  useEffect(() => {
    if (config) {
      const { id, ...rest } = config;
      reset(rest);
    }
  }, [config, reset]);

  const { fields, append, remove } = useFieldArray({
    control: control as any,
    name: "questions"
  });

  const onSubmit = async (data: WhatsAppFormData) => {
    try {
      await configService.saveWhatsAppConfig(data as WhatsAppConfig);
      onSuccess();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving WhatsApp config:', error);
      alert('Erro ao salvar configurações.');
    }
  };

  const handleReset = async () => {
    if (confirm('Deseja redefinir as configurações para os padrões?')) {
      const defaultConfig = await configService.seedDefaultConfig();
      reset(defaultConfig);
      onSuccess();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-xl"
    >
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <MessageSquare className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gov-blue-900">WhatsApp Widget</h2>
            <p className="text-slate-500 text-sm italic">Personalize o comportamento e aparência do chat flutuante.</p>
          </div>
        </div>
        <button 
          type="button"
          onClick={handleReset}
          className="text-[0.625rem] font-black uppercase tracking-widest text-slate-300 hover:text-gov-blue-700 transition-colors"
        >
          Redefinir Padrões
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-3 block">Nome do Chat / Atendente</label>
              <input 
                {...register('chatName')} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-base focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Ex: Suporte ICDI"
              />
            </div>
            
            <div>
              <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-3 block">Mensagem de Boas-vindas (Balão)</label>
              <input 
                {...register('welcomeMessage')} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-base focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Ex: Olá! Como podemos ajudar?"
              />
            </div>

            <div>
              <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-3 block">Texto de Chamada (CTA)</label>
              <input 
                {...register('ctaText')} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-base focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Ex: Iniciar nossa conversa"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-3 block">URL da Foto de Perfil</label>
              <input 
                {...register('photoUrl')} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-base focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="https://exemplo.com/foto.jpg"
              />
            </div>

            <div>
              <label className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mb-3 block">Número do WhatsApp (com DDD)</label>
              <input 
                {...register('phoneNumber')} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-base focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="5561999999999"
              />
              <p className="text-[0.5625rem] text-slate-400 mt-2 italic px-2">Apenas números, começando com 55 (Brasil).</p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gov-blue-900">Fluxo de Perguntas</h3>
              <p className="text-xs text-slate-500 mt-1">
                Defina as perguntas do chat. Use <code className="bg-emerald-50 text-emerald-600 px-1 rounded font-bold">{"{nome}"}</code> para chamar o usuário pelo nome.
              </p>
            </div>
            <button 
              type="button" 
              onClick={() => append({ text: '', options: [] })}
              className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-[0.625rem] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Adicionar Pergunta
            </button>
          </div>

          <div className="space-y-6">
            {fields.map((field, index) => (
              <motion.div 
                layout
                key={field.id} 
                className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xs font-black text-slate-300 shrink-0">
                    {index + 1}
                  </div>
                  <input 
                    {...register(`questions.${index}.text` as const)} 
                    className="flex-1 bg-transparent border-none text-sm font-bold text-slate-700 outline-none focus:ring-0"
                    placeholder="Ex: Em qual projeto você tem interesse?"
                  />
                  <button 
                    type="button" 
                    onClick={() => remove(index)}
                    className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <WhatsAppQuestionOptions 
                  control={control} 
                  qIndex={index} 
                  register={register} 
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pt-10 flex justify-end items-center gap-6">
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2 text-emerald-600 font-bold text-sm"
              >
                <CheckCircle2 className="w-5 h-5" />
                Salvo com sucesso!
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            type="button"
            onClick={handleReset}
            className="px-6 py-5 bg-slate-100 text-slate-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
          >
            Restaurar Padrões
          </button>
          <button 
            disabled={isSubmitting}
            className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl disabled:opacity-50 flex items-center gap-3"
          >
            {isSubmitting ? 'Salvando...' : <><Save className="w-5 h-5" /> Salvar Configurações</>}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
