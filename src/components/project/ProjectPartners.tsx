import React from 'react';
import { Handshake } from 'lucide-react';

interface Props {
  partners: string[];
}

export const ProjectPartners = ({ partners }: Props) => {
  if (!partners || partners.length === 0) return null;

  return (
    <section className="py-20 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-gov-blue-50 text-gov-blue-700 flex items-center justify-center">
            <Handshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-700">Colaboração</span>
            <h2 className="text-3xl font-bold text-gov-blue-900">Parceiros</h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 px-8 py-4 shadow-sm"
            >
              <span className="text-sm font-bold text-gov-blue-900">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
