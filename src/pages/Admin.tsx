import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  LogOut, 
  Lock, 
  LayoutDashboard,
  Eye,
  PlusCircle,
  ExternalLink,
  X
} from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, User } from 'firebase/auth';
import { projectService } from '../services/projectService';
import { configService } from '../services/configService';
import { Project, WhatsAppConfig } from '../types';
import { LucideIcon } from '../components/LucideIcon';
import { getSafeImageUrl } from '../lib/imageUtils';
import { LeadsPanel } from '../components/LeadsPanel';
import { ProjectForm } from '../components/admin/ProjectForm';
import { WhatsAppConfigForm } from '../components/admin/WhatsAppConfigForm';

export const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'transparency' | 'whatsapp' | 'leads'>('projects');
  const [whatsappConfig, setWhatsappConfig] = useState<WhatsAppConfig | null>(null);

  const [syncing, setSyncing] = useState(false);
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    checkConnection();
    loadProjects();
    loadWhatsAppConfig();
  }, []);

  const checkConnection = async () => {
    try {
      const { doc, getDocFromServer } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      await getDocFromServer(doc(db, 'test', 'connection'));
      setDbStatus('connected');
    } catch (error: any) {
      console.log('Note: Connection test doc might not exist, but let us check if offline:', error.message);
      if (error.message?.includes('offline')) {
        setDbStatus('error');
      } else {
        setDbStatus('connected'); // If it just says not found, it's connected
      }
    }
  };

  const handleForceSeed = async () => {
    if (!window.confirm('Isso irá sincronizar os caminhos das fotos com os arquivos locais. Deseja continuar?')) return;
    setSyncing(true);
    try {
      await projectService.seed();
      await loadProjects();
      alert('Sincronização concluída!');
    } catch (error) {
      console.error('Sync error:', error);
      alert('Erro na sincronização. Verificando console.');
    } finally {
      setSyncing(false);
    }
  };

  const loadProjects = async () => {
    const data = await projectService.getAll();
    setProjects(data);
    setLoading(false);
  };

  const loadWhatsAppConfig = async () => {
    const data = await configService.getWhatsAppConfig();
    if (data) setWhatsappConfig(data);
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      await projectService.delete(id);
      loadProjects();
    }
  };

  const openEditModal = (project: Project | null = null) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-gov-blue-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 md:pt-40 pb-16 md:pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LayoutDashboard className="w-5 h-5 text-gov-blue-700" />
              <span className="text-[0.625rem] font-black uppercase tracking-[0.2em] text-gov-blue-700">Painel Administrativo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gov-blue-900">Gerenciar ICDI</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-gov-blue-900">
                Status: {dbStatus === 'connected' ? '🟢 Conectado' : dbStatus === 'error' ? '🔴 Erro de Conexão' : '🟡 Verificando...'}
              </p>
              <button 
                onClick={handleForceSeed}
                disabled={syncing}
                className="text-[0.625rem] text-gov-blue-700 font-black uppercase tracking-tighter hover:underline disabled:opacity-50"
              >
                {syncing ? 'Sincronizando...' : 'Forçar Sincronização de Fotos'}
              </button>
            </div>
            <button 
              onClick={() => openEditModal()}
              className="px-8 py-4 bg-gov-blue-700 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gov-blue-800 transition-all shadow-lg flex items-center gap-3"
            >
              <Plus className="w-4 h-4" /> Novo Projeto
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-4 mb-12 bg-white p-2 rounded-[2rem] border border-slate-200 w-fit shadow-sm">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-8 py-4 rounded-[1.5rem] text-[0.625rem] font-black uppercase tracking-widest transition-all ${activeTab === 'projects' ? 'bg-gov-blue-700 text-white shadow-md' : 'text-slate-400 hover:text-gov-blue-700'}`}
          >
            Projetos
          </button>
          <button 
            onClick={() => setActiveTab('transparency')}
            className={`px-8 py-4 rounded-[1.5rem] text-[0.625rem] font-black uppercase tracking-widest transition-all ${activeTab === 'transparency' ? 'bg-gov-blue-700 text-white shadow-md' : 'text-slate-400 hover:text-gov-blue-700'}`}
          >
            Transparência
          </button>
          <button 
            onClick={() => setActiveTab('whatsapp')}
            className={`px-8 py-4 rounded-[1.5rem] text-[0.625rem] font-black uppercase tracking-widest transition-all ${activeTab === 'whatsapp' ? 'bg-gov-blue-700 text-white shadow-md' : 'text-slate-400 hover:text-gov-blue-700'}`}
          >
            WhatsApp Widget
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`px-8 py-4 rounded-[1.5rem] text-[0.625rem] font-black uppercase tracking-widest transition-all ${activeTab === 'leads' ? 'bg-gov-blue-700 text-white shadow-md' : 'text-slate-400 hover:text-gov-blue-700'}`}
          >
            Contatos Capturados
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                   <p className="text-slate-400 mb-8 italic">Nenhum projeto encontrado no banco de dados.</p>
                   <button 
                    onClick={async () => {
                      setLoading(true);
                      await projectService.seed();
                      await loadProjects();
                      setLoading(false);
                    }}
                    className="px-8 py-4 bg-gov-blue-50 text-gov-blue-700 rounded-2xl font-bold text-[0.625rem] uppercase tracking-widest hover:bg-gov-blue-700 hover:text-white transition-all shadow-sm"
                   >
                     Restaurar Dados Iniciais
                   </button>
                </div>
              )}
              {projects.map((project) => (
                <motion.div
                  key={project.id || project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="h-40 relative group overflow-hidden">
                    <img 
                      src={getSafeImageUrl(project.image)} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gov-blue-900/40" />
                    <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl ${project.color} flex items-center justify-center text-white shadow-lg`}>
                      <LucideIcon name={project.iconName} className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gov-blue-900 mb-2 truncate">{project.title}</h3>
                    <p className="text-slate-500 text-xs mb-8 line-clamp-2">{project.description}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openEditModal(project)}
                          className="p-3 bg-slate-50 text-slate-400 hover:text-gov-blue-700 hover:bg-gov-blue-50 rounded-xl transition-colors"
                          title="Editar"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)}
                          className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <a 
                        href={`/projeto/${project.slug}`} 
                        target="_blank" 
                        className="p-3 text-gov-blue-700 hover:bg-gov-blue-50 rounded-xl transition-colors"
                        title="Visualizar Project"
                      >
                        <Eye className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <button 
                onClick={() => openEditModal()}
                className="group h-full min-h-[400px] rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 hover:text-gov-blue-700 hover:border-gov-blue-200 hover:bg-gov-blue-50/30 transition-all"
              >
                <PlusCircle className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Adicionar Novo</span>
              </button>
            </div>
          )}

          {activeTab === 'transparency' && (
            <div className="col-span-full space-y-8">
              {projects.map((project) => (
                <div key={project.slug} className="bg-white rounded-[2rem] p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl ${project.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                      <LucideIcon name={project.iconName} className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gov-blue-900 mb-1">{project.title}</h3>
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-black">
                        {project.transparency?.length || 0} Arquivos de Transparência
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => openEditModal(project)}
                      className="px-6 py-3 bg-gov-blue-50 text-gov-blue-700 rounded-xl font-bold text-[0.625rem] uppercase tracking-widest hover:bg-gov-blue-700 hover:text-white transition-all flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Gerenciar Documentos
                    </button>
                    <a 
                      href={`/transparencia#${project.slug}`} 
                      target="_blank"
                      className="p-3 bg-slate-50 text-slate-400 hover:text-gov-blue-700 rounded-xl transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'whatsapp' && (
            <div className="max-w-4xl mx-auto">
              <WhatsAppConfigForm 
                config={whatsappConfig} 
                onSuccess={loadWhatsAppConfig} 
              />
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="max-w-6xl mx-auto">
              <LeadsPanel />
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gov-blue-900/60 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl relative z-10 flex flex-col"
            >
              <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-1 bg-gov-yellow rounded-full" />
                    <span className="text-[0.625rem] font-black uppercase tracking-widest text-gov-blue-700">Configuração de Projeto</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gov-blue-900">{editingProject ? 'Editar Projeto' : 'Novo Projeto'}</h2>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all text-slate-400 hover:text-gov-blue-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10">
                <ProjectForm 
                  project={editingProject} 
                  onSuccess={() => {
                    setIsModalOpen(false);
                    loadProjects();
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

