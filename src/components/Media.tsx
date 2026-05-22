import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Download } from 'lucide-react';
import Lightbox from './Lightbox';
import { CATALOG_PDF_URL, CATALOG_PDF_FILENAME } from '../constants/catalog';

interface GalleryImage {
  src: string;
  alt: string;
}

interface CatalogItem {
  name: string;
  file: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  { src: '/images/governor-1.jpg', alt: 'Speed Governor Front View' },
  { src: '/images/governor-2.jpg', alt: 'Speed Governor Side View' },
  { src: '/images/governor-3.jpg', alt: 'Speed Governor Detail' },
  { src: '/images/governor-hero.png', alt: 'Speed Governor Hero' },
  { src: '/images/governor-4.jpg', alt: 'Speed Governor Assembly' },
];


const SectionHeading: React.FC<{ children: string }> = ({ children }) => (
  <div className="relative z-10 flex items-center gap-4 mb-12 md:mb-16">
    <div className="w-8 h-[2px] bg-[#0B3D78]/30" />
    <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.15em] uppercase text-[#0B3D78]/70">
      {children}
    </span>
    <div className="flex-1 h-[0.5px] bg-[#0B3D78]/10" />
  </div>
);

const Media: React.FC = () => {
  const { t } = useTranslation();
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const CATALOGS: CatalogItem[] = [
    { name: t('catalog.name'), file: CATALOG_PDF_URL },
  ];

  return (
    <section id="media" className="relative py-20 md:py-28 bg-[#F5F7FA] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 product-groups-blueprint opacity-60" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>{t('media.heading')}</SectionHeading>

        {/* Masonry Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={image.src}
              className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group border border-[#DDE3EC] bg-white shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setLightboxImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* Catalog Download Cards */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4">
          {CATALOGS.map((catalog, index) => (
            <motion.div
              key={catalog.name}
              className="relative z-10 border border-[#DDE3EC] bg-white/80 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#0B3D78]/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* PDF Icon Badge */}
              <div className="w-12 h-12 rounded-xl bg-[#0B3D78]/10 flex items-center justify-center shrink-0">
                <FileText size={22} className="text-[#0B3D78]" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[#0B3D78] font-bold text-[15px] leading-tight truncate">
                  {catalog.name}
                </h4>
                <p className="text-[#0B3D78]/60 text-[13px] mt-0.5">{t('media.pdfDocument')}</p>
              </div>

              {/* Download Button */}
              <a
                href={catalog.file}
                download={CATALOG_PDF_FILENAME}
                className="w-10 h-10 rounded-full border border-[#0B3D78]/25 flex items-center justify-center text-[#0B3D78]/80 hover:bg-[#0B3D78] hover:text-white transition-all duration-200 shrink-0"
                aria-label={t('catalog.download')}
              >
                <Download size={18} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        src={lightboxImage?.src ?? ''}
        alt={lightboxImage?.alt ?? ''}
        isOpen={lightboxImage !== null}
        onClose={() => setLightboxImage(null)}
      />
    </section>
  );
};

export default Media;
