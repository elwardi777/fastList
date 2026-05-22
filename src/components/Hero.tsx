import React from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProductShowcase360 from './ProductShowcase360';

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const titleLineVariants = {
  hidden: { y: 40, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: 0.7,
      delay: 0.3 + i * 0.18,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const fadeUpVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const showcaseVariants = {
  hidden: { opacity: 0, scale: 0.96, x: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const Hero: React.FC = () => {
  const { t } = useTranslation();

  const TITLE_LINES = [
    { text: t('hero.line1'), opacity: 1 },
    { text: t('hero.line2'), opacity: 0.7 },
    { text: t('hero.line3'), opacity: 0.4 },
  ];
  const sectionRef = React.useRef<HTMLElement>(null);

  // Parallax for the isometric grid
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 1000], [0, 300]); // 0.3× speed

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center bg-[#edf2f8]"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:bg-[length:100%_auto] lg:bg-top hero-bg-desktop"
        style={{
          backgroundImage: "url('/images/ChatGPT Image 22 mai 2026, 23_23_26.png')",
          backgroundRepeat: 'no-repeat',
        }}
      >
        <style>{`
          @media (min-width: 1024px) {
            .hero-bg-desktop {
              background-image: url('/images/Gemini_Generated_Image_bkv7n3bkv7n3bkv7.png') !important;
            }
          }
        `}</style>
      </div>

      {/* =========================================================
          CONTENT WRAPPER
          ========================================================= */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16 pt-32 sm:pt-40 pb-16 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-4">
          {/* -------------------------------------------------------
              LEFT SIDE — Text Content  (≈45%)
              ------------------------------------------------------- */}
          <motion.div
            className="w-full lg:w-[45%] flex flex-col items-start"
            initial="hidden"
            animate="visible"
          >

            {/* Title lines */}
            <div className="mb-8">
              {TITLE_LINES.map((line, i) => (
                <motion.h1
                  key={line.text}
                  custom={i}
                  variants={titleLineVariants}
                  className="font-['Inter',sans-serif] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0B3D78]"
                  style={{
                    opacity: line.opacity,
                    fontSize: 'clamp(2.25rem, 5vw, 4rem)', // 36px → 64px
                  }}
                >
                  {line.text}
                </motion.h1>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUpVariants}
              custom={0.95}
              className="text-[#0B3D78]/80 text-base sm:text-lg leading-relaxed max-w-[520px] mb-10 font-normal"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA Button */}
            <motion.a
              href="#products"
              variants={fadeUpVariants}
              custom={1.2}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="cta-btn inline-flex items-center gap-2 bg-[#0B3D78] text-white font-semibold
                         text-sm sm:text-base px-7 py-3.5 rounded-full
                         shadow-[0_8px_0_rgba(0,0,0,0.18)]
                         hover:shadow-[0_12px_4px_rgba(0,0,0,0.22)]
                         active:shadow-[0_4px_0_rgba(0,0,0,0.18)]
                         transition-shadow duration-200"
            >
              {t('hero.cta')}
              <span className="text-lg leading-none">→</span>
            </motion.a>
          </motion.div>

          {/* -------------------------------------------------------
              RIGHT SIDE — Product Showcase  (≈55%)
              ------------------------------------------------------- */}
          <motion.div
            className="relative w-full max-w-full overflow-hidden lg:w-[55%] flex items-center justify-center"
            variants={showcaseVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Isometric grid overlay with parallax + drift */}
            <motion.div
              className="absolute inset-0 iso-grid-light pointer-events-none"
              style={{
                y: gridY,
                animation: 'grid-drift 60s linear infinite',
                willChange: 'transform',
              }}
            />

            {/* Product showcase */}
            <ProductShowcase360 className="relative z-10 w-full py-8 mt-16" />
          </motion.div>
        </div>
      </div>

      {/* =========================================================
          DECORATIVE — Subtle bottom rule
          ========================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#0B3D78]/10" />
    </section>
  );
};

export default Hero;
