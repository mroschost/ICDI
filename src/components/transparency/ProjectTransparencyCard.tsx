import React from 'react';
import { motion } from 'motion/react';
import { FileText, Eye } from 'lucide-react';
import { Project } from '../../types';
import { LucideIcon } from '../LucideIcon';
import { getSafeImageUrl } from '../../lib/imageUtils';

interface ProjectTransparencyCardProps {
  project: Project;
  index: number;
  onSelectMedia: (media: { url: string; title: string }) => void;
}

export const ProjectTransparencyCard: React.FC<ProjectTransparencyCardProps> = ({ project, index, onSelectMedia }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      id={project.slug}
      className="bg-white rounded-2xl md:rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden group hover:shadow-xl transition-all duration-500"
    >
      <div className="p-6 md:p-12">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Project Info */}
          <div className="md:w-1/3">
            <div className={`w-12 h-12 md:w-14 md:h-14 ${project.color} rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg`}>
              <LucideIcon name={project.iconName} className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gov-blue-900 mb-3 md:mb-4">{project.title}</h2>
            <p className="text-sm md:text-slate-600 mb-6 md:mb-8 leading-relaxed">
              Compilado de documentos e registros oficiais referentes à execução deste projeto.
            </p>
          </div>

          {/* Documents List */}
          <div className="md:w-2/3">
            <div className="bg-slate-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100">
              <h3 className="text-[0.625rem] md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2">
                <FileText className="w-3 h-3 md:w-4 md:h-4" /> Arquivos Disponíveis
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {project.transparency && project.transparency.length > 0 ? (
                  project.transparency.map((doc, docIndex) => {
                    const isImage = doc.match(/\.(jpg|jpeg|png|gif|webp|dng)$/i);
                    const fileName = doc.split('/').pop() || 'Documento';
                    
                    return (
                      <div 
                        key={docIndex}
                        className={`group/doc bg-white p-4 rounded-2xl border border-slate-200 hover:border-gov-yellow hover:shadow-md transition-all flex items-center gap-4 cursor-pointer`}
                        onClick={() => {
                          if (isImage) {
                            onSelectMedia({ url: getSafeImageUrl(doc), title: fileName });
                          } else {
                            window.open(getSafeImageUrl(doc), '_blank');
                          }
                        }}
                      >
                        <div className={`w-20 h-20 md:w-32 md:h-32 rounded-xl flex items-center justify-center overflow-hidden shrink-0 ${isImage ? 'bg-blue-50' : 'bg-orange-50 text-orange-500'}`}>
                          {isImage ? (
                            <img 
                              src={getSafeImageUrl(doc)} 
                              alt={fileName} 
                              className="w-full h-full object-cover group-hover/doc:scale-110 transition-transform" 
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <FileText className="w-8 h-8 md:w-10 md:h-10" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-bold text-gov-blue-900 truncate" title={fileName}>
                            {fileName}
                          </p>
                          <p className="text-[0.625rem] text-slate-400 uppercase">
                            {isImage ? 'Imagem' : 'Documento'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-2 text-slate-300 group-hover/doc:text-gov-blue-700 transition-colors hidden sm:block">
                            {isImage ? <Eye className="w-4 h-4" /> : <div className="w-4 h-4 border-2 border-current rounded-sm border-t-4" title="Abrir documento" />}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full py-8 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                    <p className="text-slate-400 italic">Nenhum documento adicional encontrado para este projeto.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
