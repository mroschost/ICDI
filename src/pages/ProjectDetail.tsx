import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { Project } from '../types';
import { MediaModal } from '../components/MediaModal';
import { ProjectHeader } from '../components/project/ProjectHeader';
import { ProjectContent } from '../components/project/ProjectContent';
import { ProjectGallery } from '../components/project/ProjectGallery';
import { ProjectTransparency } from '../components/project/ProjectTransparency';
import { ProjectCTA } from '../components/project/ProjectCTA';

type SelectedMedia = {
  url: string;
  title: string;
  index?: number;
};

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = React.useState<Project | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedMedia, setSelectedMedia] = React.useState<SelectedMedia | null>(null);

  useEffect(() => {
    const load = async () => {
      if (slug) {
        setLoading(true);
        const data = await projectService.getBySlug(slug);
        setProject(data);
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const galleryItems = project?.gallery ?? [];
  const selectedIndex = selectedMedia?.index ?? -1;
  const hasGalleryNavigation = selectedIndex >= 0 && galleryItems.length > 1;

  const handlePreviousMedia = React.useCallback(() => {
    if (!hasGalleryNavigation || !selectedMedia) return;
    const nextIndex = selectedIndex === 0 ? galleryItems.length - 1 : selectedIndex - 1;
    setSelectedMedia({
      url: galleryItems[nextIndex],
      title: `${project?.title} - Imagem ${nextIndex + 1}`,
      index: nextIndex
    });
  }, [galleryItems, hasGalleryNavigation, project?.title, selectedIndex, selectedMedia]);

  const handleNextMedia = React.useCallback(() => {
    if (!hasGalleryNavigation || !selectedMedia) return;
    const nextIndex = selectedIndex === galleryItems.length - 1 ? 0 : selectedIndex + 1;
    setSelectedMedia({
      url: galleryItems[nextIndex],
      title: `${project?.title} - Imagem ${nextIndex + 1}`,
      index: nextIndex
    });
  }, [galleryItems, hasGalleryNavigation, project?.title, selectedIndex, selectedMedia]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-gov-blue-700 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold text-gov-blue-900 mb-4">Projeto não encontrado</h2>
        <Link to="/" className="text-gov-blue-700 hover:underline">Voltar para a página inicial</Link>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <MediaModal
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        url={selectedMedia?.url || ''}
        title={selectedMedia?.title || ''}
        currentIndex={selectedMedia?.index}
        totalItems={hasGalleryNavigation ? galleryItems.length : undefined}
        onPrevious={hasGalleryNavigation ? handlePreviousMedia : undefined}
        onNext={hasGalleryNavigation ? handleNextMedia : undefined}
      />

      <ProjectHeader project={project} />
      <ProjectContent project={project} />
      <ProjectGallery project={project} onSelectMedia={setSelectedMedia} />
      <ProjectTransparency project={project} onSelectMedia={setSelectedMedia} />
      <ProjectCTA />
    </div>
  );
};
