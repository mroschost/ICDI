import React, { useEffect, useState } from 'react';
import { projectService } from '../services/projectService';
import { Project } from '../types';
import { MediaModal } from '../components/MediaModal';
import { Image } from 'lucide-react';

type SelectedMedia = {
  url: string;
  title: string;
};

export const Galeria = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await projectService.getAll();
      setProjects(data.filter(p => p.gallery && p.gallery.length > 0));
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-gov-blue-700 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="min-h-screen pt-28 md:pt-40 pb-24 md:pb-32">
      <MediaModal
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        url={selectedMedia?.url || ''}
        title={selectedMedia?.title || ''}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-gov-yellow rounded-full" />
            <span className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-700">ICDI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gov-blue-900 mb-4">Galeria</h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Fotos e registros dos projetos e eventos realizados pelo ICDI.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <Image className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Nenhuma imagem na galeria ainda.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.slug} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold text-gov-blue-900 mb-6">{project.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMedia({ url: img, title: `${project.title} - Imagem ${idx + 1}` })}
                    className="group aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100"
                  >
                    <img
                      src={img}
                      alt={`${project.title} - ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
