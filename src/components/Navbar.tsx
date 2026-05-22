import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface NavLink {
  label: string
  href: string
}

interface NavGroup {
  title: string
  links: NavLink[]
}

function useNavGroups(): NavGroup[] {
  const { t } = useTranslation()
  return [
    {
      title: t('nav.corporate'),
      links: [
        { label: t('nav.aboutUs'), href: '/about' },
        { label: t('nav.production'), href: '/corporate/production' },
        { label: t('nav.career'), href: '/corporate/career' },
        { label: t('nav.contact'), href: '/corporate/contact' },
      ],
    },
    {
      title: t('nav.mediaCenter'),
      links: [
        { label: t('nav.eCatalog'), href: '/catalog' },
        { label: t('nav.newsExhibitions'), href: '/media/news' },
      ],
    },
    {
      title: t('nav.productGroups'),
      links: [
        { label: t('nav.speedGovernors'), href: '/products/speed-governors' },
        { label: t('nav.safetyGears'), href: '/products/safety-gears' },
      ],
    },
  ]
}

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
]

/* ------------------------------------------------------------------ */
/*  Desktop dropdown (pure CSS hover via group)                        */
/* ------------------------------------------------------------------ */

function DesktopDropdown({ group, scrolled }: { group: NavGroup; scrolled: boolean }) {
  return (
    <div className="group relative">
      {/* Trigger */}
      <button
        className={`flex items-center gap-1 px-3 py-2 text-[14px] uppercase font-medium tracking-[0.08em]
                   transition-colors duration-200 cursor-pointer font-['Inter',sans-serif]
                   ${scrolled ? 'text-white/90 hover:text-white' : 'text-[#0B3D78] hover:text-[#0B3D78]/70'}`}
      >
        {group.title}
        <ChevronDown
          size={14}
          className="transition-transform duration-200 group-hover:rotate-180"
        />
      </button>

      {/* Dropdown panel */}
      <div
        className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 pt-2
                    opacity-0 -translate-y-2 transition-all duration-200 ease-out
                    group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0"
      >
        <div
          className="min-w-[220px] rounded-xl border border-white/[0.06]
                      bg-[rgba(11,61,120,0.97)] backdrop-blur-[16px]
                      shadow-[0_8px_32px_rgba(0,0,0,0.28)] overflow-hidden"
        >
          {group.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-5 py-3 text-[13px] font-medium tracking-wide text-white/75
                         transition-colors duration-150 hover:bg-white/[0.08] hover:text-white
                         font-['Inter',sans-serif]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Language selector (desktop)                                        */
/* ------------------------------------------------------------------ */

function LanguageSelector({ scrolled }: { scrolled: boolean }) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  const switchLang = (code: string) => {
    i18n.changeLanguage(code)
  }

  return (
    <div className="group relative">
      <button
        className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold tracking-wide
                   transition-colors duration-200 cursor-pointer font-['JetBrains_Mono',monospace]
                   ${scrolled ? 'text-white/80 hover:text-white' : 'text-[#0B3D78] hover:text-[#0B3D78]/70'}`}
      >
        <Globe size={15} className="opacity-70" />
        {currentLang.toUpperCase()}
        <ChevronDown
          size={12}
          className="transition-transform duration-200 group-hover:rotate-180"
        />
      </button>

      <div
        className="pointer-events-none absolute right-0 top-full pt-2
                    opacity-0 -translate-y-2 transition-all duration-200 ease-out
                    group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0"
      >
        <div
          className="min-w-[120px] rounded-xl border border-white/[0.06]
                      bg-[rgba(11,61,120,0.97)] backdrop-blur-[16px]
                      shadow-[0_8px_32px_rgba(0,0,0,0.28)] overflow-hidden"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLang(lang.code)}
              className={`flex w-full items-center gap-2 px-4 py-2.5 text-[13px] font-medium
                         transition-colors duration-150 cursor-pointer font-['JetBrains_Mono',monospace]
                         ${
                           currentLang === lang.code
                             ? 'bg-white/[0.12] text-white'
                             : 'text-white/75 hover:bg-white/[0.08] hover:text-white'
                         }`}
            >
              {lang.code.toUpperCase()}
              <span className="text-[11px] text-white/40 font-['Inter',sans-serif]">
                {lang.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile language selector                                           */
/* ------------------------------------------------------------------ */

function MobileLangSelector() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  return (
    <div className="mt-8">
      <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-white/40 font-['JetBrains_Mono',monospace]">
        Language
      </p>
      <div className="flex gap-3">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`rounded-lg border border-white/[0.1] px-5 py-2.5 text-[13px]
                       font-semibold transition-colors duration-150 cursor-pointer
                       font-['JetBrains_Mono',monospace]
                       ${currentLang === lang.code
                         ? 'bg-white/[0.12] text-white'
                         : 'text-white/80 hover:bg-white/[0.08] hover:text-white'
                       }`}
          >
            {lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile menu                                                        */
/* ------------------------------------------------------------------ */

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const NAV_GROUPS = useNavGroups()

  const toggleGroup = (title: string) =>
    setOpenGroup((prev) => (prev === title ? null : title))

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[1001] flex flex-col bg-[#0B3D78]/95 backdrop-blur-[20px]"
    >
      {/* Header row */}
      <div className="flex h-[72px] items-center justify-between px-6">
        <img
          src="/images/governor-4-removebg-preview.png"
          alt="FasLift Solutions"
          className="h-auto max-h-[72px] w-auto"
        />
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg
                     text-white/80 transition-colors duration-200 hover:bg-white/[0.08]
                     hover:text-white cursor-pointer"
        >
          <X size={24} />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-6 pb-10 pt-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="border-b border-white/[0.06]">
            <button
              onClick={() => toggleGroup(group.title)}
              className="flex w-full items-center justify-between py-4 text-[16px] uppercase
                         font-semibold tracking-[0.08em] text-white/90
                         font-['Inter',sans-serif] cursor-pointer"
            >
              {group.title}
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  openGroup === group.title ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {openGroup === group.title && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-3 pl-4">
                    {group.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block py-3 text-[15px] font-medium text-white/60
                                   transition-colors duration-150 hover:text-white
                                   font-['Inter',sans-serif]"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Mobile language selector */}
        <MobileLangSelector />
      </nav>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const NAV_GROUPS = useNavGroups()

  /* Track scroll position ------------------------------------------ */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()                 // initialise on mount
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll when mobile menu is open ---------------------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        style={{ zIndex: 1000 }}
        className={`fixed inset-x-0 top-0 flex items-center justify-between
                    px-6 lg:px-10 transition-all duration-300 ease-out
                    ${scrolled
                      ? 'h-[72px] bg-[rgba(11,61,120,0.92)] backdrop-blur-[12px] shadow-[0_1px_0_rgba(255,255,255,0.06)]'
                      : 'h-[80px] bg-transparent'
                    }`}
      >
        {/* ---- Logo (left) ---- */}
        <a href="/" className="relative shrink-0">
          <img
            src="/images/governor-4-removebg-preview.png"
            alt="FasLift Solutions"
            className="h-auto max-h-[64px] w-auto transition-opacity duration-200 hover:opacity-80"
          />
        </a>

        {/* ---- Desktop nav (center) ---- */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_GROUPS.map((group) => (
            <DesktopDropdown key={group.title} group={group} scrolled={scrolled} />
          ))}
        </nav>

        {/* ---- Right side ---- */}
        <div className="flex items-center gap-2">
          {/* Language – desktop only */}
          <div className="hidden lg:block">
            <LanguageSelector scrolled={scrolled} />
          </div>

          {/* Hamburger – mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={`flex lg:hidden h-10 w-10 items-center justify-center rounded-lg
                       transition-colors duration-200 cursor-pointer
                       ${scrolled ? 'text-white hover:text-white' : 'text-[#0B3D78] hover:text-[#0B3D78]/70'}`}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* ---- Mobile menu overlay ---- */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
