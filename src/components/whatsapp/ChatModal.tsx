import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';
import { WhatsAppConfig } from '../../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getSafeImageUrl } from '../../lib/imageUtils';

interface ChatModalProps {
  config: WhatsAppConfig;
  isOpen: boolean;
  onClose: () => void;
  messages: { type: 'bot' | 'user'; text: string }[];
  isTyping: boolean;
  currentStep: number;
  answers: string[];
  currentInput: string;
  setCurrentInput: (val: string) => void;
  handleSendMessage: (e?: React.FormEvent, manualMsg?: string) => void;
  finishChat: () => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatModal = ({
  config,
  isOpen,
  onClose,
  messages,
  isTyping,
  currentStep,
  answers,
  currentInput,
  setCurrentInput,
  handleSendMessage,
  finishChat,
  chatEndRef
}: ChatModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-end p-0 sm:p-8 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gov-blue-900/40 backdrop-blur-sm pointer-events-auto"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            className="w-full max-w-full sm:w-[400px] h-[100dvh] sm:h-[600px] bg-[#f0f2f5] shadow-2xl relative pointer-events-auto sm:rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#075e54] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1 shadow-sm">
                  <img 
                    src={getSafeImageUrl(config.photoUrl)} 
                    alt={config.chatName} 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-none mb-1">{config.chatName}</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-[0.625rem] text-white/80">Online agora</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-contain">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10, y: 5 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-sm relative ${
                    msg.type === 'bot' 
                      ? 'bg-white text-slate-800 rounded-tl-none' 
                      : 'bg-[#dcf8c6] text-slate-800 rounded-tr-none'
                  }`}>
                    {msg.text}
                    <span className="block text-[0.5625rem] text-slate-400 text-right mt-1">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 bg-[#f0f2f5]">
              {answers.length >= config.questions.length ? (
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={finishChat}
                  className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-[#1faa56] transition-all"
                >
                  <WhatsAppIcon className="w-6 h-6" />
                  Enviar tudo pelo WhatsApp
                </motion.button>
              ) : (
                <div className="space-y-3">
                  {/* Opções de Resposta Rápida */}
                  {!isTyping && config.questions[currentStep] && Array.isArray(config.questions[currentStep].options) && config.questions[currentStep].options.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2 pb-1">
                      {config.questions[currentStep].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, scale: 0.9, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => handleSendMessage(undefined, opt)}
                          className="bg-white text-[#075e54] border border-emerald-100 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-sm active:scale-95 whitespace-nowrap"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  )}
                  
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      placeholder="Responda aqui..."
                      className="flex-1 bg-white border-none rounded-xl p-3 sm:p-4 text-base focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
                    />
                    <button
                      type="submit"
                      disabled={!currentInput.trim()}
                      className="w-12 h-12 bg-[#075e54] text-white rounded-xl flex items-center justify-center disabled:opacity-50 transition-all shrink-0 shadow-md"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
