import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { CATALOG_PDF_URL, CATALOG_PDF_FILENAME } from '../constants/catalog';

export default function CatalogPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // Detect mobile device (iOS, Android, Windows Phone, etc.)
    const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) {
      // Replaces the route with the direct PDF URL so user gets the browser's native PDF viewer
      window.location.replace(CATALOG_PDF_URL);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#1E2530] text-white overflow-hidden font-sans">
      {/* Premium Top Bar */}
      <header className="h-16 bg-[#0B3D78] flex items-center justify-between px-4 sm:px-6 shadow-[0_4px_20px_rgba(11,61,120,0.15)] z-25 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-display font-bold text-sm sm:text-base tracking-wide uppercase">
              {t('catalog.name')}
            </h1>
            <p className="text-[10px] text-white/50 font-mono tracking-widest uppercase">
              Document Viewer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Open full screen / new window button */}
          <a
            href={CATALOG_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-[#082d5a] hover:bg-[#0B3D78] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors border border-white/10"
          >
            <ExternalLink size={14} />
            Full Screen
          </a>
          
          {/* Download button */}
          <a
            href={CATALOG_PDF_URL}
            download={CATALOG_PDF_FILENAME}
            className="flex items-center gap-2 bg-white text-[#0B3D78] hover:bg-white/90 text-xs font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <Download size={14} />
            {t('catalog.download')}
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 relative bg-[#525659]">
        <iframe
          src={CATALOG_PDF_URL}
          title={t('catalog.title')}
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
