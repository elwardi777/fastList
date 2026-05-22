import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Production', href: '#production' },
  { label: 'Contact', href: '#contact' },
];

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const QUICK_LINKS_T = [
    { label: t('footer.products'), href: '#products' },
    { label: t('footer.about'), href: '#about' },
    { label: t('footer.production'), href: '#production' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <footer className="bg-[#0B3D78] relative">
      {/* Top rule line */}
      <div className="w-full h-[0.5px] bg-white/[0.06]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Col 1: Logo + Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/governor-4-removebg-preview.png"
                alt="FasLift Solutions"
                className="h-14 w-auto brightness-0 invert"
              />
              <span className="font-bold text-lg text-white">
                FasLift<span className="text-white/50"> Solutions</span>

              </span>
            </div>
            <p className="text-[14px] text-white/50 leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.15em] uppercase text-white/50 mb-5">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS_T.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14px] text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.15em] uppercase text-white/50 mb-5">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-white/40 mt-0.5 shrink-0" />
                <span className="text-[14px] text-white/50 leading-relaxed">
                  Industrial Zone, Casablanca, Morocco
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-white/40 shrink-0" />
                <a
                  href="tel:+212653660399"
                  className="text-[14px] text-white/50 hover:text-white transition-colors"
                >
                  +212 653-660399
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-white/40 shrink-0" />
                <a
                  href="mailto:info@faslift.com"
                  className="text-[14px] text-white/50 hover:text-white transition-colors"
                >
                  info@faslift.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-white/30">
            {t('footer.rights')}
          </p>
          <p className="text-[13px] text-white/30 font-['JetBrains_Mono',monospace] tracking-wide">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
