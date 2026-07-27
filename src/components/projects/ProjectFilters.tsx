import React from 'react';
import { Search } from 'lucide-react';

interface ProjectFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  resultsCount: number;
}

export const ProjectFilters = ({ searchTerm, setSearchTerm, resultsCount }: ProjectFiltersProps) => {
  return (
    <section className="px-6 mb-8 md:mb-12 sticky top-16 md:top-20 z-30 bg-slate-50/80 backdrop-blur-md py-4 md:py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar projeto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 md:py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gov-blue-700 outline-none transition-all shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          <span className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 mr-2 shrink-0">Total: {resultsCount}</span>
        </div>
      </div>
    </section>
  );
};
