import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FileText, Eye } from 'lucide-react';
import { Project } from '../../types';
import { getSafeImageUrl } from '../../lib/imageUtils';

interface ProjectTransparencyProps {
  project: Project;
  onSelectMedia: (media: { url: string; title: string }) => void;
}

export const ProjectTransparency = ({ project, onSelectMedia }: ProjectTransparencyProps) => {
  if (!project.transparency || project.transparency.length === 0) return null;

  return (
    <section className="py-12 md:py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="max-w-xl">
            <h2 className="text-xl md:text-2xl font-bold text-gov-blue-900 mb-4 md:mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-gov-yellow"></span> Transparencia e Documentacao
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Acesso aos documentos e registros oficiais que comprovam a execucao tecnica e social deste projeto.
            </p>
          </div>
          <Link
            to="/transparencia"
            className="text-[0.625rem] md:text-xs font-bold text-gov-blue-700 uppercase tracking-widest flex items-center gap-2 hover:text-gov-blue-900 transition-colors bg-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl shadow-sm border border-slate-200 w-fit"
          >
            Ver portal completo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {project.transparency.map((doc, i) => {
            const isImage = doc.match(/\.(jpg|jpeg|png|gif|webp|dng)$/i);
            const fileName = doc.split('/').pop() || 'Documento';

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 hover:border-gov-yellow hover:shadow-md transition-all group cursor-pointer"
                onClick={() => {
                  if (isImage) {
                    onSelectMedia({ url: getSafeImageUrl(doc), title: fileName });
                  } else {
                    window.open(getSafeImageUrl(doc), '_blank');
                  }
                }}
              >
                <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-xl flex items-center justify-center overflow-hidden shrink-0 ${isImage ? 'bg-blue-50' : 'bg-orange-50 text-orange-500'}`}>
                  {isImage ? (
                    <img
                      src={getSafeImageUrl(doc)}
                      alt={fileName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <FileText className="w-10 h-10" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.625rem] md:text-[0.6875rem] font-bold text-gov-blue-900 truncate uppercase tracking-tight">
                    {fileName}
                  </p>
                  <p className="text-[0.5rem] md:text-[0.5625rem] text-slate-400 uppercase font-black tracking-widest mt-1">
                    {isImage ? 'Registro Fotografico' : 'Documento PDF/DOC'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 text-slate-300 group-hover:text-gov-blue-700 transition-colors hidden sm:block">
                    {isImage ? <Eye className="w-4 h-4" /> : <div className="w-4 h-4 border-2 border-current rounded-sm border-t-4" title="Abrir" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
