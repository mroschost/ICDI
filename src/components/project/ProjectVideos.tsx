import React from 'react';
import { Film } from 'lucide-react';

interface Props {
  videos: string[];
  projectTitle: string;
}

export const ProjectVideos = ({ videos, projectTitle }: Props) => {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-gov-blue-50 text-gov-blue-700 flex items-center justify-center">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-700">Mídia</span>
            <h2 className="text-3xl font-bold text-gov-blue-900">Vídeos</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, idx) => (
            <div key={idx} className="aspect-video rounded-2xl overflow-hidden bg-slate-100">
              <iframe
                src={video}
                title={`${projectTitle} - Vídeo ${idx + 1}`}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
