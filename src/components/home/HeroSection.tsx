import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { getSafeImageUrl } from '../../lib/imageUtils';

interface HeroSectionProps {
  projects: Project[];
  currentProjectIndex: number;
  setCurrentProjectIndex: (index: number) => void;
}

const palette = {
  purple: '#2A2368',
  blue: '#3B58AF',
  yellow: '#FBF137',
  orange: '#DE5121',
};

export const HeroSection = ({ projects, currentProjectIndex, setCurrentProjectIndex }: HeroSectionProps) => {
  const activeProject = projects[currentProjectIndex];

  const changeProject = (direction: number) => {
    setCurrentProjectIndex((currentProjectIndex + direction + projects.length) % projects.length);
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f7f7f7] pt-20 text-[#2A2368] lg:min-h-[790px]"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="absolute inset-x-0 top-0 z-30 h-2" style={{ backgroundColor: palette.purple }} />

      <div className="relative mx-auto min-h-[710px] max-w-[1600px] lg:min-h-[710px]">
        <div className="relative z-20 flex min-h-[710px] w-full flex-col px-6 py-16 md:px-10 lg:w-[52%] lg:justify-center lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-[3px] w-14" style={{ backgroundColor: palette.orange }} />
            <span className="text-xs font-medium uppercase tracking-[0.22em]" style={{ color: palette.orange }}>
              Promovendo
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="max-w-[720px] text-[clamp(3rem,5.1vw,5.7rem)] font-normal leading-[1.02] tracking-[-0.055em]"
          >
            Transformação<br />
            de vidas através<br />
            da <strong className="font-bold">cultura</strong>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-xl text-[0.96rem] font-normal leading-7 text-[#2A2368]/72 md:text-base"
          >
            O ICDI transforma realidades por meio da cultura, da educação e da inovação, criando oportunidades para crianças, adolescentes, jovens e comunidades do Distrito Federal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              to="/projetos"
              className="group inline-flex items-center gap-3 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_35px_rgba(42,35,104,0.2)] transition-transform hover:-translate-y-1"
              style={{ backgroundColor: palette.purple }}
            >
              Conheça nossos projetos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#about"
              className="inline-flex items-center border border-[#2A2368]/25 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-[#2A2368] hover:bg-[#2A2368] hover:text-white"
            >
              Sobre o ICDI
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center gap-3"
          >
            {[palette.orange, palette.yellow, palette.blue, palette.purple].map((color, index) => (
              <motion.span
                key={color}
                className="block h-3 w-3"
                style={{ backgroundColor: color }}
                animate={{ y: [0, index % 2 === 0 ? -4 : 4, 0] }}
                transition={{ duration: 2.8 + index * 0.35, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
            <span className="ml-2 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[#2A2368]/50">
              Inclusão • cultura • futuro
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[430px] w-full overflow-hidden sm:h-[520px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[54%]"
        >
          <motion.img
            src={getSafeImageUrl('/idv/hero-institutional.jpg')}
            alt="Mulher participante de iniciativa do ICDI"
            className="absolute inset-0 h-full w-full object-cover object-right sm:object-[68%_center] lg:-top-[54px] lg:bottom-auto lg:left-auto lg:right-0 lg:h-[calc(100%+54px)] lg:w-[178%] lg:max-w-none lg:object-right"
            animate={{ scale: [1.01, 1.035, 1.01] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#f7f7f7] to-transparent lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-24 lg:bg-gradient-to-r" />

          <motion.div
            aria-hidden="true"
            className="absolute left-4 top-9 hidden h-14 w-14 sm:left-5 sm:top-16 sm:block sm:h-24 sm:w-24"
            style={{ backgroundColor: palette.yellow, clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            animate={{ x: [0, 14, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute bottom-12 left-5 hidden h-20 w-20 rounded-full opacity-70 sm:bottom-28 sm:left-10 sm:block sm:h-32 sm:w-32"
            style={{
              background: `repeating-conic-gradient(${palette.orange} 0deg 8deg, transparent 8deg 16deg)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55 }}
          className="relative z-30 mx-4 -mt-14 flex max-w-[620px] items-center justify-between gap-3 px-4 py-4 text-white shadow-2xl sm:mx-6 sm:-mt-20 sm:gap-5 sm:px-5 lg:absolute lg:bottom-9 lg:right-10 lg:mx-0 lg:mt-0 lg:w-[520px]"
          style={{ backgroundColor: palette.purple }}
        >
          <div className="min-w-0 border-l-4 pl-3 sm:pl-4" style={{ borderColor: palette.yellow }}>
            <span className="block text-[0.58rem] font-medium uppercase tracking-[0.2em] text-white/55">
              Projeto em destaque
            </span>
            <AnimatePresence mode="wait">
              <motion.strong
                key={activeProject.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-1 block max-w-[180px] truncate text-xs font-semibold min-[390px]:max-w-[230px] sm:max-w-none sm:text-sm md:text-base"
              >
                {activeProject.title}
              </motion.strong>
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => changeProject(-1)}
              aria-label="Projeto anterior"
              className="grid h-9 w-9 place-items-center border border-white/25 transition-colors hover:bg-white hover:text-[#2A2368] sm:h-10 sm:w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => changeProject(1)}
              aria-label="Próximo projeto"
              className="grid h-9 w-9 place-items-center text-[#2A2368] sm:h-10 sm:w-10"
              style={{ backgroundColor: palette.yellow }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="relative z-20 mt-10 grid grid-cols-3 sm:mt-20 lg:mt-0">
        <motion.div
          className="h-3"
          style={{ backgroundColor: palette.orange }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        />
        <motion.div
          className="h-3"
          style={{ backgroundColor: palette.yellow }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.82 }}
        />
        <motion.div
          className="h-3"
          style={{ backgroundColor: palette.blue }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.94 }}
        />
      </div>
    </section>
  );
};
