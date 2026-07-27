import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trash2, 
  Plus, 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  Loader2, 
  X,
  FileIcon
} from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';
import { getSafeImageUrl, handleImageError } from '../lib/imageUtils';

interface MediaManagerProps {
  items: string[];
  onChange: (items: string[]) => void;
  title: string;
  type: 'gallery' | 'transparency';
  projectId?: string;
}

export const MediaManager: React.FC<MediaManagerProps> = ({ 
  items = [], 
  onChange, 
  title, 
  type,
  projectId = 'general'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    const newItems = [...items];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `projects/${projectId}/${type}/${Date.now()}-${file.name}`);
      
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        newItems.push(url);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    onChange(newItems);
    setIsUploading(false);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleUpload(e.dataTransfer.files);
  };

  const isImage = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp|avif)$/i) || url.includes('image');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gov-blue-900 uppercase tracking-widest">{title}</h3>
        <span className="text-[0.625rem] text-slate-400 font-medium">{items.length} itens</span>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-4 ${
          isDragging 
            ? 'border-gov-blue-600 bg-gov-blue-50' 
            : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
        }`}
      >
        <input
          type="file"
          multiple
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => handleUpload(e.target.files)}
          disabled={isUploading}
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-gov-blue-700 animate-spin" />
            <p className="text-xs font-bold text-gov-blue-700">Enviando arquivos...</p>
          </div>
        ) : (
          <>
            <div className={`p-4 rounded-full ${isDragging ? 'bg-gov-blue-100 text-gov-blue-800' : 'bg-white text-slate-400 shadow-sm'}`}>
              <Upload className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-slate-600 mb-1">
                Arraste arquivos ou clique para selecionar
              </p>
              <p className="text-[0.625rem] text-slate-400">
                Imagens (JPG, PNG) ou documentos (PDF, DOCX)
              </p>
            </div>
          </>
        )}
      </div>

      {/* Items Preview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative aspect-square rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm"
            >
              {isImage(item) ? (
                <img 
                  src={getSafeImageUrl(item)} 
                  alt={`Media ${index}`} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-50">
                  <FileIcon className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-[0.5rem] text-slate-500 truncate w-full text-center">
                    {item.split('/').pop()}
                  </span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute bottom-2 right-2 p-2 bg-white/90 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
                title="Remover item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
