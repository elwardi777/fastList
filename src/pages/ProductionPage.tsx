import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronLeft, ChevronRight, Settings, Cpu, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import FloatingToolbar from '../components/FloatingToolbar';

const IMAGES = [
  {
    src: '/images/Gemini_Generated_Image_rim8vwrim8vwrim8.png',
    key: 'sliderCnc'
  },
  {
    src: '/images/Gemini_Generated_Image_mez5hgmez5hgmez5.png',
    key: 'sliderRobotic'
  },
  {
    src: '/images/quality_control.png',
    key: 'sliderQc'
  }
];

export default function ProductionPage() {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveSlide(prev => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  const handleNext = () => {
    setActiveSlide(prev => (prev + 1) % IMAGES.length);
  };

  return (
    <div className="font-sans bg-[#F5F7FA] min-h-screen overflow-x-hidden text-[#4a5568]">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-white pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[#0d2b5e]/5">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-[0.05] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0B3D78" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F7FA]/50 via-white to-white z-0" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B3D78]/60 mb-6">
            <Link to="/" className="hover:text-[#0B3D78] transition-colors">
              {t('productionPage.breadcrumbHome')}
            </Link>
            <span>&gt;</span>
            <span className="text-[#0B3D78]">{t('productionPage.breadcrumbCurrent')}</span>
          </nav>

          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-[#0B3D78] uppercase leading-tight tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)' }}
            >
              {t('productionPage.heroTitle')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-[#0b3d78]/80 leading-relaxed font-normal"
            >
              {t('productionPage.heroSubtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT SECTION ── */}
      <section className="py-24 px-6 md:px-12 bg-[#F5F7FA] relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Typography Block */}
            <div className="lg:col-span-5 space-y-8">
              {/* Monospace section heading */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-[2px] bg-[#0b3d78]/30" />
                <span className="font-mono text-xs tracking-[0.15em] uppercase text-[#0b3d78]/60">
                  {t('productionPage.sectionTitle')}
                </span>
              </div>

              <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0d2b5e] leading-tight">
                {t('productionPage.sectionSubtitle')}
              </h2>

              <p className="text-base leading-relaxed text-[#4a5568]/90">
                {t('productionPage.descParagraph1')}
              </p>

              <p className="text-base leading-relaxed text-[#4a5568]/90">
                {t('productionPage.descParagraph2')}
              </p>

              {/* Manufacturing Features list */}
              <div className="space-y-6 pt-4">
                {/* Feature 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#0d2b5e]/5 shadow-sm flex items-center justify-center text-[#0B3D78] shrink-0">
                    <Settings size={22} className="animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0d2b5e] mb-1">
                      {t('productionPage.feature1Title')}
                    </h3>
                    <p className="text-xs text-[#4a5568]/80 leading-relaxed">
                      {t('productionPage.feature1Desc')}
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#0d2b5e]/5 shadow-sm flex items-center justify-center text-[#0B3D78] shrink-0">
                    <Cpu size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0d2b5e] mb-1">
                      {t('productionPage.feature2Title')}
                    </h3>
                    <p className="text-xs text-[#4a5568]/80 leading-relaxed">
                      {t('productionPage.feature2Desc')}
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#0d2b5e]/5 shadow-sm flex items-center justify-center text-[#0B3D78] shrink-0">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0d2b5e] mb-1">
                      {t('productionPage.feature3Title')}
                    </h3>
                    <p className="text-xs text-[#4a5568]/80 leading-relaxed">
                      {t('productionPage.feature3Desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Monochrome Image Slider */}
            <div className="lg:col-span-7">
              <div className="relative bg-white rounded-[24px] border border-[#0d2b5e]/5 p-3 shadow-[0_15px_45px_rgba(0,0,0,0.06)] overflow-hidden">
                {/* Slider Image Container */}
                <div className="relative aspect-[4/3] rounded-[18px] overflow-hidden bg-slate-900 group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeSlide}
                      src={IMAGES[activeSlide].src}
                      alt="Manufacturing Process"
                      className="w-full h-full object-cover grayscale brightness-90 contrast-110 hover:scale-105 transition-transform duration-700 ease-out"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      draggable={false}
                    />
                  </AnimatePresence>

                  {/* Dark gradient overlay at bottom for text contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />

                  {/* Active Slide description */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <motion.p
                      key={activeSlide}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-1"
                    >
                      Step {activeSlide + 1} of {IMAGES.length}
                    </motion.p>
                    <motion.h3
                      key={`h-${activeSlide}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      className="font-display font-bold text-lg md:text-xl leading-tight"
                    >
                      {t(`productionPage.${IMAGES[activeSlide].key}`)}
                    </motion.h3>
                  </div>

                  {/* Slider Control arrows */}
                  <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0b3d78] transition-all duration-200 pointer-events-auto cursor-pointer"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0b3d78] transition-all duration-200 pointer-events-auto cursor-pointer"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Slider indicators */}
                <div className="flex justify-center gap-2 mt-4 pb-2">
                  {IMAGES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeSlide === index ? 'w-8 bg-[#0b3d78]' : 'w-2 bg-[#0b3d78]/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: PRODUCTION PROCESS STEPS ── */}
      <section className="relative py-24 px-6 md:px-12 bg-[#0B3D78] overflow-hidden border-t border-b border-[#0d2b5e]/10">
        {/* Diagonal hatch pattern overlay */}
        <div className="absolute inset-0 hatch-pattern pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section heading */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-6 h-[2px] bg-white/30" />
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-white/50">
              {t('production.heading')}
            </span>
          </div>

          {/* Grid Layout of steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(step => (
              <motion.div
                key={step}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[24px] relative overflow-hidden transition-all duration-300 hover:-translate-y-[6px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: step * 0.05 }}
              >
                {/* Step indicator */}
                <span className="absolute top-6 right-8 font-mono font-bold text-5xl text-white/5 select-none">
                  {String(step).padStart(2, '0')}
                </span>

                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white font-mono font-bold text-sm mb-6">
                  {step}
                </div>

                <h3 className="font-bold text-lg text-white mb-2 leading-tight">
                  {t(`production.step${step}Title`)}
                </h3>

                <p className="text-xs text-white/70 leading-relaxed">
                  {t(`production.step${step}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER & UTILITIES ── */}
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <FloatingToolbar />
    </div>
  );
}
