import React from 'react';
import { FileText, Download } from 'lucide-react';

interface Props {
  documents: string[];
  projectTitle: string;
}

export const ProjectDocuments = ({ documents, projectTitle }: Props) => {
  if (!documents || documents.length === 0) return null;

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-gov-blue-50 text-gov-blue-700 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-700">Documentos</span>
            <h2 className="text-3xl font-bold text-gov-blue-900">Documentos Relacionados</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, idx) => (
            <a
              key={idx}
              href={doc}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-gov-blue-50 hover:border-gov-blue-200 transition-all group"
            >
              <FileText className="w-8 h-8 text-gov-blue-700 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gov-blue-900 truncate">
                  {doc.split('/').pop() || `Documento ${idx + 1}`}
                </p>
                <p className="text-xs text-slate-400">{projectTitle}</p>
              </div>
              <Download className="w-5 h-5 text-slate-300 group-hover:text-gov-blue-700 transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
