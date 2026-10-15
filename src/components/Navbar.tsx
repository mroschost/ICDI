import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { AccessibilityControls } from './AccessibilityControls';
import { getSafeImageUrl } from '../lib/imageUtils';

const navigationLinks = [
  { name: 'Início', to: '/#home' },
  { name: 'Sobre o ICDI', to: '/#about' },
  { name: 'Projetos', to: '/projetos' },
  { name: 'Transparência', to: '/transparencia' },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const isActiveLink = (to: string) => {
    if (to === '/#home') {
      return location.pathname === '/' && (!location.hash || location.hash === '#home');
    }
    if (to.startsWith('/#')) {
      return location.pathname === '/' && location.hash === to.slice(1);
    }
    return location.pathname === to || (to === '/projetos' && location.pathname.startsWith('/projeto/'));
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleResize = () => {
      if (mediaQuery.matches) setIsMenuOpen(false);
    };
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;

    const container = event.currentTarget;
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter(element => element.getClientRects().length > 0);

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 top-0 z-50 border-b border-[#2A2368]/10 bg-[#f7f7f7]/95 px-4 backdrop-blur-xl sm:px-6"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 grid h-1.5 grid-cols-3">
        <span className="bg-[#DE5121]" />
        <span className="bg-[#FBF137]" />
        <span className="bg-[#3B58AF]" />
      </div>

      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between md:h-20">
        <Link
          to="/"
          aria-label="ICDI — ir para a página inicial"
          onClick={() => setIsMenuOpen(false)}
          className="relative z-50 inline-flex min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B58AF]"
        >
          <img
            src={getSafeImageUrl('/brand/icdi-logo.png')}
            alt="ICDI"
            className="h-14 w-auto max-w-[190px] object-contain"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navigationLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              aria-current={isActiveLink(link.to) ? 'page' : undefined}
              className={'text-[0.625rem] font-black uppercase tracking-widest transition-colors hover:text-gov-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B58AF] ' + (isActiveLink(link.to) ? 'text-[#2A2368]' : 'text-slate-500')}
            >
              {link.name === 'Sobre o ICDI' ? 'Sobre Nós' : link.name}
            </Link>
          ))}
          <div className="mx-2 h-4 w-px bg-[#2A2368]/15" />
          <AccessibilityControls />
          <Link
            to="/#contact"
            className="bg-[#2A2368] px-6 py-3 text-[0.625rem] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#DE5121] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B58AF]"
          >
            Fale Conosco
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-controls="icdi-mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(open => !open)}
          className="relative z-50 inline-flex min-h-11 items-center justify-center gap-2 border border-[#2A2368]/15 bg-white/70 px-3 text-[#2A2368] transition-colors hover:border-[#2A2368]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B58AF] md:hidden"
        >
          <span className="hidden text-[0.65rem] font-bold uppercase tracking-[0.12em] min-[350px]:inline">
            {isMenuOpen ? 'Fechar' : 'Menu'}
          </span>
          {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            id="icdi-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            onKeyDown={handleMenuKeyDown}
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full z-40 h-[calc(100vh-72px)] h-[calc(100dvh-72px)] touch-pan-y overflow-y-auto overscroll-contain border-t border-[#2A2368]/10 bg-[#f7f7f7] shadow-[0_24px_40px_rgba(42,35,104,0.12)] md:hidden"
          >
            <div className="mx-auto flex min-h-full max-w-xl flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-7 sm:px-8">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 bg-[#DE5121]" />
                <span className="h-2.5 w-2.5 bg-[#FBF137]" />
                <span className="h-2.5 w-2.5 bg-[#3B58AF]" />
                <span className="h-2.5 w-2.5 bg-[#2A2368]" />
              </div>
              <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#2A2368]/60">
                Explore o ICDI
              </p>

              <div className="mt-4 border-t border-[#2A2368]/15">
                {navigationLinks.map((link, index) => (
                  <Link
                    key={link.to}
                    ref={index === 0 ? firstLinkRef : undefined}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActiveLink(link.to) ? 'page' : undefined}
                    className={'group flex min-h-[66px] items-center gap-4 border-b border-[#2A2368]/10 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#3B58AF] ' + (isActiveLink(link.to) ? 'text-[#3B58AF]' : 'text-[#2A2368] hover:text-[#3B58AF]')}
                  >
                    <span className="w-6 shrink-0 text-[0.7rem] font-semibold tabular-nums text-[#2A2368]/40">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-[1.22rem] font-semibold tracking-tight">{link.name}</span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 opacity-65 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                ))}
              </div>

              <Link
                to="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-7 flex min-h-14 items-center justify-between bg-[#2A2368] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#3B58AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B58AF]"
              >
                Fale Conosco
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>

              <div className="mt-auto pt-8">
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#2A2368]/15 pt-5">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#2A2368]/65">
                    Acessibilidade
                  </span>
                  <AccessibilityControls />
                </div>
                <p className="mt-7 text-center text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#2A2368]/50">
                  Inclusão • Cultura • Futuro
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
