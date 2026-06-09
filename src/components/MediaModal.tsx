import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { getSafeImageUrl, handleImageError } from '../lib/imageUtils';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  currentIndex?: number;
  totalItems?: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
  currentIndex,
  totalItems,
  onPrevious,
  onNext
}) => {
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrevious) onPrevious();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent z-10 rounded-t-2xl">
              <div className="text-white">
                <h3 className="font-bold text-lg truncate max-w-[200px] md:max-w-md">{title}</h3>
                <p className="text-white/60 text-xs uppercase tracking-widest">
                  {typeof currentIndex === 'number' && typeof totalItems === 'number'
                    ? `Imagem ${currentIndex + 1} de ${totalItems}`
                    : 'Galeria do Projeto'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="p-3 bg-gov-yellow hover:bg-gov-yellow/90 transition-colors rounded-full text-gov-blue-900"
                  title="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="w-full h-full flex items-center justify-center p-4 relative">
              {onPrevious && (
                <button
                  onClick={onPrevious}
                  className="absolute left-2 md:left-6 z-10 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-sm transition-colors"
                  title="Imagem anterior"
                >
                  <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                </button>
              )}

              <img
                src={getSafeImageUrl(url)}
                alt={title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onError={handleImageError}
              />

              {onNext && (
                <button
                  onClick={onNext}
                  className="absolute right-2 md:right-6 z-10 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-sm transition-colors"
                  title="Próxima imagem"
                >
                  <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
                </button>
              )}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 text-white/80 text-sm flex items-center gap-4">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gov-yellow rounded-full animate-pulse" />
                Visualização Segura
              </span>
              <div className="w-px h-4 bg-white/20" />
              <a href={getSafeImageUrl(url)} download className="hover:text-gov-yellow transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> Baixar
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
