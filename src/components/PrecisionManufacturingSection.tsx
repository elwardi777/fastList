import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const PrecisionManufacturingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Top glowing separator */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden z-10">
        <motion.div
          className="h-full w-full"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #0B3D78 30%, #4a9eff 50%, #0B3D78 70%, transparent 100%)' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Full image — natural size, no crop */}
      <div className="relative w-full">
        <img
          src="/images/Gemini_Generated_Image_s0lqjas0lqjas0lq.png"
          alt="FasLift Speed Governor"
          className="w-full h-auto block"
          draggable={false}
        />

        {/* Text overlay on right side */}
        <div className="absolute inset-0 flex flex-col lg:flex-row">
          {/* LEFT — image shows through */}
          <div className="hidden lg:block lg:w-[55%]" />

          {/* RIGHT — Text content */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-10">
          {/* Logo */}
          <motion.img
            src="/images/governor-4-removebg-preview.png"
            alt="FasLift Solutions"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="h-[72px] w-auto mb-8 self-start"
          />

          {/* Subtitle */}
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#0B3D78]/70 mb-3 font-['Inter',sans-serif]"
          >
            {t('precision.subtitle')}
          </motion.p>

          {/* Heading */}
          <motion.h2
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="font-['Inter',sans-serif] font-extrabold text-[#0B3D78] leading-[1.08] tracking-[-0.03em] mb-5"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
          >
            {t('precision.heading').split('\n').map((line: string, i: number) => (
              <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
            ))}
          </motion.h2>

          {/* Divider */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="w-14 h-[3px] rounded-full bg-[#0B3D78]/50 mb-5"
          />

          {/* Body text */}
          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-[#0B3D78]/80 text-sm sm:text-base leading-relaxed mb-10 font-['Inter',sans-serif]"
          >
            {t('precision.body')}
          </motion.p>

          </div>
        </div>
      </div>

      {/* Bottom glowing separator */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden z-10">
        <motion.div
          className="h-full w-full"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #0B3D78 30%, #4a9eff 50%, #0B3D78 70%, transparent 100%)' }}
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </section>
  );
};

export default PrecisionManufacturingSection;
