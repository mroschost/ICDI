import { Project } from '../types';
import { PROJECTS as INITIAL_PROJECTS } from '../constants';

const STORAGE_KEY = 'icdi.projects.v1';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readStoredProjects(): Record<string, Project> {
  if (!canUseStorage()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as Record<string, Project>;
  } catch {
    return {};
  }
}

function writeStoredProjects(map: Record<string, Project>) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore storage quota / privacy mode issues
  }
}

function withIds(projects: Project[]): Project[] {
  return projects.map((p) => ({ ...p, id: p.id ?? p.slug }));
}

function mergeProjects(base: Project[], overrides: Record<string, Project>): Project[] {
  return base.map((p) => {
    const id = p.id ?? p.slug;
    const override = overrides[id];
    if (!override) return { ...p, id };
    return { ...p, ...override, id };
  });
}

export const projectService = {
  async getAll(): Promise<Project[]> {
    const base = withIds([...INITIAL_PROJECTS]);
    const overrides = readStoredProjects();
    return mergeProjects(base, overrides);
  },

  async getBySlug(slug: string): Promise<Project | null> {
    const base = withIds([...INITIAL_PROJECTS]).find((p) => p.slug === slug) || null;
    if (!base) return null;
    const overrides = readStoredProjects();
    const id = base.id ?? base.slug;
    const override = overrides[id];
    return override ? { ...base, ...override, id } : { ...base, id };
  },

  async create(project: Omit<Project, 'id'>): Promise<string> {
    const id = project.slug;
    const overrides = readStoredProjects();
    overrides[id] = { ...project, id };
    writeStoredProjects(overrides);
    return id;
  },

  async update(id: string, project: Partial<Project>): Promise<void> {
    const overrides = readStoredProjects();
    const existing = overrides[id];
    overrides[id] = { ...(existing || { id } as Project), ...project, id } as Project;
    writeStoredProjects(overrides);
  },

  async delete(id: string): Promise<void> {
    const overrides = readStoredProjects();
    if (overrides[id]) {
      delete overrides[id];
      writeStoredProjects(overrides);
    }
  },

  async seed() {
    writeStoredProjects({});
  }
};
