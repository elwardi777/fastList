import { motion } from 'framer-motion';
import { FileText, Phone } from 'lucide-react';

interface ToolbarAction {
  icon: React.ReactNode;
  href: string;
  label: string;
  external?: boolean;
}

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  {
    icon: <FileText size={20} />,
    href: '#media',
    label: 'Download catalogs',
  },
  {
    icon: <Phone size={20} />,
    href: 'tel:+212653660399',
    label: 'Call us',
    external: true,
  },
];

const FloatingToolbar: React.FC = () => {
  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[998] hidden md:flex flex-col items-center gap-1 bg-white rounded-2xl p-2 border border-[#0B3D78]/20 shadow-[0_4px_20px_rgba(11,61,120,0.18)]"
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {TOOLBAR_ACTIONS.map((action) => (
        <a
          key={action.label}
          href={action.href}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[#0B3D78] hover:text-white hover:bg-[#0B3D78] transition-colors duration-200"
          aria-label={action.label}
          title={action.label}
          {...(action.external ? {} : {})}
        >
          {action.icon}
        </a>
      ))}
    </motion.div>
  );
};

export default FloatingToolbar;
