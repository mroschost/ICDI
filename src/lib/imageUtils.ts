export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=80&w=1200';

export const getSafeImageUrl = (path: string) => {
  if (!path) return FALLBACK_IMAGE;
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  
  // Clean the path (remove leading slashes)
  const cleanPath = path.replace(/^\/+/, '');
  
  // Use Vite's base URL if available, otherwise default to root
  let base = import.meta.env.BASE_URL || '/';
  if (!base.endsWith('/')) base += '/';
  
  const url = `${base}${cleanPath}`;
  
  // Occasional debug log
  if (Math.random() < 0.05) {
    console.debug('Image Resolution:', { path, base, result: url });
  }
  
  return url;
};

export const handleImageError = (e: any) => {
  const target = e.target as HTMLImageElement;
  const currentSrc = target.getAttribute('src');
  
  if (currentSrc && !currentSrc.includes(FALLBACK_IMAGE)) {
    console.warn('Image fail, fallback triggered:', currentSrc);
    target.src = FALLBACK_IMAGE;
  }
};
