import { useTranslation } from 'react-i18next';
import { CATALOG_PDF_URL } from '../constants/catalog';

export default function CatalogPage() {
  const { t } = useTranslation();

  return (
    <iframe
      src={CATALOG_PDF_URL}
      title={t('catalog.title')}
      className="fixed inset-0 w-full h-full border-0 bg-[#525659]"
    />
  );
}
