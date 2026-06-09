import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X } from 'lucide-react';
import { WhatsAppConfig } from '../../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppBubbleProps {
  config: WhatsAppConfig;
  showBubble: boolean;
  setShowBubble: (show: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  showNotification: boolean;
}

export const WhatsAppBubble = ({ 
  config, 
  showBubble, 
  setShowBubble, 
  isModalOpen, 
  setIsModalOpen, 
  showNotification 
}: WhatsAppBubbleProps) => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Bubble */}
      <AnimatePresence>
        {showBubble && !isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-4 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 max-w-[240px] relative"
          >
            <p className="text-sm font-bold text-slate-800 mb-1">{config.welcomeMessage}</p>
            <p className="text-xs text-slate-500 mb-2">{config.ctaText}</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-[0.625rem] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              Iniciar Chat <ChevronRight className="w-3 h-3" />
            </button>
            <div className="absolute right-6 -bottom-2 w-4 h-4 bg-white rotate-45 border-r border-b border-slate-100"></div>
            <button 
              onClick={() => setShowBubble(false)}
              className="absolute -top-2 -left-2 bg-slate-100 text-slate-400 p-1 rounded-full hover:bg-slate-200 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <div className="relative">
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0 0px rgba(37, 211, 102, 0.4)',
              '0 0 0 15px rgba(37, 211, 102, 0)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="rounded-full"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          >
            <WhatsAppIcon className="w-10 h-10" />
          </button>
        </motion.div>
        
        {!isModalOpen && showNotification && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
        )}
      </div>
    </div>
  );
};
