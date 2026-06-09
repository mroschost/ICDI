import React from 'react';
import { projectService } from '../services/projectService';
import { Project } from '../types';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { ProjectGrid } from '../components/home/ProjectGrid';
import { AboutSection } from '../components/home/AboutSection';
import { TransparencyBanner } from '../components/home/TransparencyBanner';
import { ContactSection } from '../components/home/ContactSection';

export const Home = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [currentProjectIndex, setCurrentProjectIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      // Non-blocking seed to prevent UI freeze on connection issues
      projectService.seed().catch(err => console.error('Seed background error:', err));
      
      const data = await projectService.getAll();
      setProjects(data);
      setLoading(false);
    };
    load();
  }, []);

  React.useEffect(() => {
    if (projects.length === 0) return;
    const timer = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [projects]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-gov-blue-700 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <>
      <HeroSection 
        projects={projects} 
        currentProjectIndex={currentProjectIndex} 
        setCurrentProjectIndex={setCurrentProjectIndex} 
      />
      <StatsSection />
      <ProjectGrid projects={projects} />
      <AboutSection />
      <TransparencyBanner />
      <ContactSection />
    </>
  );
};

