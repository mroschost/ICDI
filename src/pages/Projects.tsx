import React from 'react';
import { Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { Project } from '../types';
import { ProjectsHero } from '../components/projects/ProjectsHero';
import { ProjectFilters } from '../components/projects/ProjectFilters';
import { ProjectCard } from '../components/projects/ProjectCard';

export const Projects = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      const data = await projectService.getAll();
      setProjects(data);
      setLoading(false);
    };
    load();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-gov-blue-700 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="pt-28 md:pt-40 pb-20 md:pb-32 min-h-screen bg-slate-50">
      <ProjectsHero />

      <ProjectFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resultsCount={filteredProjects.length}
      />

      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={projects.indexOf(project)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-gov-blue-900 mb-2">Nenhum projeto encontrado</h3>
              <p className="text-slate-500 text-sm">Tente ajustar sua busca ou limpar os filtros.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-6 text-sm font-bold text-gov-blue-700 hover:underline"
              >
                Ver todos os projetos
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gov-blue-900 rounded-3xl p-8 md:p-20 text-center relative overflow-hidden text-white">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gov-yellow/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

            <h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-6 md:mb-8 relative z-10 italic serif">Tem uma sugestão de projeto?</h2>
            <p className="text-gov-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-12 relative z-10 opacity-90">
              O ICDI está sempre em busca de novas frentes de atuação para melhorar o Distrito Federal. Entre em contato conosco para parcerias.
            </p>
            <Link
              to="/#contact"
              className="px-8 md:px-10 py-4 md:py-5 bg-gov-yellow text-gov-blue-900 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl relative z-10 inline-flex items-center gap-3"
            >
              Fale com nossa equipe
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
