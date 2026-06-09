import React from 'react';
import { projectService } from '../services/projectService';
import { Project } from '../types';
import { MediaModal } from '../components/MediaModal';
import { TransparencyHero } from '../components/transparency/TransparencyHero';
import { ProjectTransparencyCard } from '../components/transparency/ProjectTransparencyCard';
import { EthicsCommitment } from '../components/transparency/EthicsCommitment';

export default function Transparency() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedMedia, setSelectedMedia] = React.useState<{ url: string; title: string } | null>(null);

  React.useEffect(() => {
    const load = async () => {
      const data = await projectService.getAll();
      setProjects(data);
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
    <div className="min-h-screen">
      <MediaModal 
        isOpen={!!selectedMedia} 
        onClose={() => setSelectedMedia(null)}
        url={selectedMedia?.url || ''}
        title={selectedMedia?.title || ''}
      />
      
      <TransparencyHero />

      <section className="py-12 md:py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <ProjectTransparencyCard 
                key={project.slug} 
                project={project} 
                index={index} 
                onSelectMedia={setSelectedMedia} 
              />
            ))}
          </div>
        </div>
      </section>

      <EthicsCommitment />
    </div>
  );
}
