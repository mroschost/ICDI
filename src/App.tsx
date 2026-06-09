import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import Transparency from './pages/Transparency';
import { Admin } from './pages/Admin';
import { WhatsAppWidget } from './components/WhatsAppWidget';

// Helper to handle hash links when navigating from other pages
function ScrollToHashElement() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        });
      }
    } else if (pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [hash, pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-gov-blue-100 relative">
        <Navbar />
        <ScrollToHashElement />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/projeto/:slug" element={<ProjectDetail />} />
            <Route path="/transparencia" element={<Transparency />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppWidget />
      </div>
    </Router>
  );
}
