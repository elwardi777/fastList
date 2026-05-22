import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, Wrench, ShieldCheck, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import FloatingToolbar from '../components/FloatingToolbar';

type SupportType = 'Commercial Support' | 'Technical Support' | 'Post Sale Support';

export default function SupportPage() {
  const { t } = useTranslation();

  // Selected support type state for dynamic form heading
  const [selectedType, setSelectedType] = useState<SupportType>('Commercial Support');
  const [showForm, setShowForm] = useState(false);

  // Support Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    requestedInfo: '',
    text: '',
    consent1: false,
    consent2: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Newsletter State
  const [newsEmail, setNewsEmail] = useState('');
  const [newsConsent, setNewsConsent] = useState(false);
  const [newsError, setNewsError] = useState('');
  const [newsSuccess, setNewsSuccess] = useState(false);

  const formSectionRef = useRef<HTMLDivElement>(null);

  // Handle scrolling to form and updating title
  const handleCardClick = (type: SupportType) => {
    setSelectedType(type);
    setShowForm(true);
    setTimeout(() => {
      if (formSectionRef.current) {
        formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  // Form Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = t('supportNew.requiredError');
    if (!formData.company.trim()) newErrors.company = t('supportNew.requiredError');

    if (!formData.email.trim()) {
      newErrors.email = t('supportNew.requiredError');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('supportNew.emailError');
    }

    if (!formData.requestedInfo) newErrors.requestedInfo = t('supportNew.requiredError');
    if (!formData.text.trim()) newErrors.text = t('supportNew.requiredError');

    if (!formData.consent1) newErrors.consent1 = t('supportNew.consentError');
    if (!formData.consent2) newErrors.consent2 = t('supportNew.consentError');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Open mailto link pre-filled
    const subject = `FAS LIFT Support Request - ${selectedType}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nRequested Information: ${formData.requestedInfo}\n\nMessage:\n${formData.text}`;
    window.location.href = `mailto:abderahmanelwardi62@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setFormSubmitted(true);
  };

  // Handle Newsletter Submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsError('');
    if (!newsEmail.trim()) {
      setNewsError(t('supportNew.requiredError'));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newsEmail)) {
      setNewsError(t('supportNew.emailError'));
      return;
    }
    if (!newsConsent) {
      setNewsError(t('supportNew.consentError'));
      return;
    }
    setNewsSuccess(true);
    setNewsEmail('');
    setNewsConsent(false);
    setTimeout(() => setNewsSuccess(false), 5000);
  };

  const getFormTitle = () => {
    switch (selectedType) {
      case 'Commercial Support':
        return t('supportNew.commercialTitle');
      case 'Technical Support':
        return t('supportNew.techTitle');
      case 'Post Sale Support':
        return t('supportNew.postSaleTitle');
      default:
        return t('supportNew.commercialTitle');
    }
  };

  return (
    <div className="font-sans bg-white min-h-screen overflow-x-hidden text-[#4a5568]">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden bg-white pt-32 pb-20 md:pt-40 md:pb-28 product-groups-waves product-groups-blueprint">
       
        {/* Subtle grid pattern overlay & wave styles from product groups */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40" />

        {/* Decorative gold/navy technical sketch line */}
       
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A843]/30 to-transparent z-10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0B3D78]/15 bg-white/75 px-4.5 py-2 backdrop-blur-sm shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4A843] animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B3D78]/70">
              {t('support.heading')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-[#0B3D78] uppercase leading-tight tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)' }}
          >
            {t('support.heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base md:text-lg text-[#0B3D78]/80 leading-relaxed font-normal"
          >
            {t('support.heroSubtitle')}
          </motion.p>
        </div>
      </section>
  {/* ── SECTION 2: HERO BANNER ── */}
      <section className="py-20 px-6 md:px-12 bg-white border-t border-b border-[#e6f0fb] flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Gear Frame & Support Icon Cutout */}
          <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
            {/* Gear Icon SVG Frame */}
            <svg
              className="absolute inset-0 w-full h-full text-[#1a4a8a]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            {/* Inner cut-out showing abstract illustration */}
            <div className="absolute w-[68px] h-[68px] bg-white rounded-full flex items-center justify-center z-10 border border-[#e6f0fb]">
              <svg
                className="w-9 h-9 text-[#1a4a8a]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
            </div>
          </div>

          <h2 className="font-display font-bold text-[32px] text-[#0d2b5e] leading-tight mb-2">
            {t('supportNew.talkTitle')}
          </h2>

          <p className="text-[15px] text-[#4a5568] max-w-md mb-6 leading-relaxed">
            {t('supportNew.talkSubtitle')}
          </p>

          <a
            href="tel:+212653660399"
            className="text-[24px] font-bold text-[#1a4a8a] hover:text-[#0d2b5e] transition-colors mb-6 block cursor-pointer"
          >
            +212 653-660399
          </a>

          {/* WhatsApp Pill */}
          <a
            href="https://wa.me/212653660399"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#25d366] text-white rounded-full font-semibold text-[14px] transition-colors duration-200 hover:bg-[#20ba5a] cursor-pointer shadow-none"
          >
            {/* WhatsApp Icon SVG */}
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </section>

      {/* ── SECTION 1: SUPPORT TYPE CARDS ── */}
      <section
        className="py-20 px-6 md:px-12 bg-white"
        style={{
          backgroundImage: 'radial-gradient(#c8d8f0 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Commercial Support */}
            <div className="bg-white rounded-[12px] border-[0.5px] border-[#0d2b5e]/20 p-8 flex flex-col items-center text-center transition-transform duration-200 ease-out hover:-translate-y-[3px]">
              <div className="w-16 h-16 rounded-full bg-[#e6f0fb] flex items-center justify-center text-[#0d2b5e] mb-6">
                <Briefcase size={26} />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0d2b5e] mb-3">
                {t('supportNew.commercialTitle')}
              </h3>
              <p className="text-[14px] text-[#4a5568] leading-relaxed mb-8 flex-grow">
                {t('supportNew.commercialDesc')}
              </p>
              <button
                onClick={() => handleCardClick('Commercial Support')}
                className="w-full py-3 bg-[#0d2b5e] text-white rounded-lg font-semibold text-[14px] transition-colors duration-200 hover:bg-[#1a4a8a] cursor-pointer"
              >
                {t('supportNew.contactUs')}
              </button>
            </div>

            {/* Card 2: Technical Support */}
            <div className="bg-white rounded-[12px] border-[0.5px] border-[#0d2b5e]/20 p-8 flex flex-col items-center text-center transition-transform duration-200 ease-out hover:-translate-y-[3px]">
              <div className="w-16 h-16 rounded-full bg-[#e6f0fb] flex items-center justify-center text-[#0d2b5e] mb-6">
                <Wrench size={26} />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0d2b5e] mb-3">
                {t('supportNew.techTitle')}
              </h3>
              <p className="text-[14px] text-[#4a5568] leading-relaxed mb-8 flex-grow">
                {t('supportNew.techDesc')}
              </p>
              <button
                onClick={() => handleCardClick('Technical Support')}
                className="w-full py-3 border border-[#0d2b5e] text-[#0d2b5e] rounded-lg font-semibold text-[14px] transition-colors duration-200 hover:bg-[#e6f0fb] cursor-pointer"
              >
                {t('supportNew.request')}
              </button>
            </div>

            {/* Card 3: Post Sale Support */}
            <div className="bg-white rounded-[12px] border-[0.5px] border-[#0d2b5e]/20 p-8 flex flex-col items-center text-center transition-transform duration-200 ease-out hover:-translate-y-[3px]">
              <div className="w-16 h-16 rounded-full bg-[#e6f0fb] flex items-center justify-center text-[#0d2b5e] mb-6">
                <ShieldCheck size={26} />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0d2b5e] mb-3">
                {t('supportNew.postSaleTitle')}
              </h3>
              <p className="text-[14px] text-[#4a5568] leading-relaxed mb-8 flex-grow">
                {t('supportNew.postSaleDesc')}
              </p>
              <button
                onClick={() => handleCardClick('Post Sale Support')}
                className="w-full py-3 border border-[#0d2b5e] text-[#0d2b5e] rounded-lg font-semibold text-[14px] transition-colors duration-200 hover:bg-[#e6f0fb] cursor-pointer"
              >
                {t('supportNew.request')}
              </button>
            </div>
          </div>
        </div>
      </section>

    
      {/* ── SECTION 3: COMMERCIAL SUPPORT FORM ── */}
      <AnimatePresence initial={false}>
        {showForm && (
          <motion.section
            id="support-form-section"
            ref={formSectionRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden bg-white"
          >
            <div className="py-24 px-6 md:px-12">
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-[16px] border-[0.5px] border-[#0d2b5e]/20 p-8 md:p-12">
                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <motion.div
                        key="form-container"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-center mb-8">
                          <h2 className="font-display font-bold text-2xl text-[#0d2b5e] uppercase tracking-wide">
                            {getFormTitle()}
                          </h2>
                          <p className="text-sm text-[#4a5568] mt-2">
                            {t('supportNew.formSubtitle')}
                          </p>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-6">
                          {/* Two-column grid for Name + Email */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-semibold text-[#0d2b5e] uppercase tracking-wider mb-2">
                                {t('supportNew.formName')} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => {
                                  setFormData({ ...formData, name: e.target.value });
                                  if (errors.name) setErrors({ ...errors, name: '' });
                                }}
                                className={`w-full border rounded-lg px-4 py-3 text-[14px] outline-none transition-colors bg-white ${
                                  errors.name ? 'border-red-500' : 'border-[#0d2b5e]/20 focus:border-[#1a4a8a]'
                                }`}
                              />
                              {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-[#0d2b5e] uppercase tracking-wider mb-2">
                                {t('supportNew.formEmail')} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.email}
                                onChange={(e) => {
                                  setFormData({ ...formData, email: e.target.value });
                                  if (errors.email) setErrors({ ...errors, email: '' });
                                }}
                                className={`w-full border rounded-lg px-4 py-3 text-[14px] outline-none transition-colors bg-white ${
                                  errors.email ? 'border-red-500' : 'border-[#0d2b5e]/20 focus:border-[#1a4a8a]'
                                }`}
                              />
                              {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                              )}
                            </div>
                          </div>

                          {/* Two-column grid for Company + Requested Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-semibold text-[#0d2b5e] uppercase tracking-wider mb-2">
                                {t('supportNew.formCompany')} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => {
                                  setFormData({ ...formData, company: e.target.value });
                                  if (errors.company) setErrors({ ...errors, company: '' });
                                }}
                                className={`w-full border rounded-lg px-4 py-3 text-[14px] outline-none transition-colors bg-white ${
                                  errors.company ? 'border-red-500' : 'border-[#0d2b5e]/20 focus:border-[#1a4a8a]'
                                }`}
                              />
                              {errors.company && (
                                <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-[#0d2b5e] uppercase tracking-wider mb-2">
                                {t('supportNew.formReqInfo')} <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={formData.requestedInfo}
                                onChange={(e) => {
                                  setFormData({ ...formData, requestedInfo: e.target.value });
                                  if (errors.requestedInfo) setErrors({ ...errors, requestedInfo: '' });
                                }}
                                className={`w-full border rounded-lg px-4 py-3 text-[14px] outline-none transition-colors bg-white appearance-none ${
                                  errors.requestedInfo ? 'border-red-500' : 'border-[#0d2b5e]/20 focus:border-[#1a4a8a]'
                                }`}
                              >
                                <option value="">-- Choose option --</option>
                                <option value="Price">{t('supportNew.optPrice')}</option>
                                <option value="Technical specs">{t('supportNew.optTechSpecs')}</option>
                                <option value="Spare parts">{t('supportNew.optSpareParts')}</option>
                                <option value="Installation">{t('supportNew.optInstallation')}</option>
                                <option value="Other">{t('supportNew.optOther')}</option>
                              </select>
                              {errors.requestedInfo && (
                                <p className="text-red-500 text-xs mt-1">{errors.requestedInfo}</p>
                              )}
                            </div>
                          </div>

                          {/* Text message */}
                          <div>
                            <label className="block text-xs font-semibold text-[#0d2b5e] uppercase tracking-wider mb-2">
                              {t('supportNew.formText')} <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              rows={5}
                              placeholder={t('supportNew.formTextPlaceholder')}
                              value={formData.text}
                              onChange={(e) => {
                                  setFormData({ ...formData, text: e.target.value });
                                  if (errors.text) setErrors({ ...errors, text: '' });
                              }}
                              className={`w-full border rounded-lg px-4 py-3 text-[14px] outline-none transition-colors resize-none bg-white ${
                                errors.text ? 'border-red-500' : 'border-[#0d2b5e]/20 focus:border-[#1a4a8a]'
                              }`}
                            />
                            {errors.text && (
                              <p className="text-red-500 text-xs mt-1">{errors.text}</p>
                            )}
                          </div>

                          {/* Consent 1 */}
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              id="consent1"
                              checked={formData.consent1}
                              onChange={(e) => {
                                setFormData({ ...formData, consent1: e.target.checked });
                                if (errors.consent1) setErrors({ ...errors, consent1: '' });
                              }}
                              className="mt-1 w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor="consent1" className="text-xs text-[#4a5568] leading-relaxed cursor-pointer select-none">
                              {t('supportNew.gdpr1')}{' '}
                              <a href="/privacy-policy" className="text-[#1a4a8a] font-semibold hover:underline">
                                Privacy Policy
                              </a>
                            </label>
                          </div>
                          {errors.consent1 && (
                            <p className="text-red-500 text-[11px] -mt-1 ml-7">{errors.consent1}</p>
                          )}

                          {/* Consent 2 */}
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              id="consent2"
                              checked={formData.consent2}
                              onChange={(e) => {
                                setFormData({ ...formData, consent2: e.target.checked });
                                if (errors.consent2) setErrors({ ...errors, consent2: '' });
                              }}
                              className="mt-1 w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor="consent2" className="text-xs text-[#4a5568] leading-relaxed cursor-pointer select-none">
                              {t('supportNew.gdpr2')}
                            </label>
                          </div>
                          {errors.consent2 && (
                            <p className="text-red-500 text-[11px] -mt-1 ml-7">{errors.consent2}</p>
                          )}

                          {/* Submit Button */}
                          <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3 bg-[#0d2b5e] text-white rounded-lg font-semibold text-[14px] uppercase tracking-wider transition-colors duration-200 hover:bg-[#1a4a8a] cursor-pointer"
                          >
                            {t('supportNew.submit')}
                          </button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success-container"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center py-12 flex flex-col items-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#e6f0fb] text-[#1a4a8a] flex items-center justify-center mb-6">
                          <Check size={32} />
                        </div>
                        <h3 className="font-display font-bold text-2xl text-[#0d2b5e] mb-4">
                          Request Ready!
                        </h3>
                        <p className="text-[15px] text-[#4a5568] max-w-md leading-relaxed mb-8">
                          {t('supportNew.successMsg')}
                        </p>
                        <button
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormData({
                              name: '',
                              email: '',
                              company: '',
                              requestedInfo: '',
                              text: '',
                              consent1: false,
                              consent2: false,
                            });
                          }}
                          className="px-6 py-3 border border-[#0d2b5e] text-[#0d2b5e] rounded-lg font-semibold text-[14px] uppercase tracking-wider transition-colors hover:bg-[#e6f0fb] cursor-pointer"
                        >
                          Send another request
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── SECTION 4: NEWSLETTER ── */}
      <section className="py-24 px-6 md:px-12 bg-[#f4f7fb]">
        <div className="max-w-xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-display font-bold text-3xl text-[#0d2b5e] mb-3">
            {t('supportNew.newsletterTitle')}
          </h2>
          <p className="text-[15px] text-[#4a5568] mb-8 max-w-sm">
            {t('supportNew.newsletterSubtitle')}
          </p>

          <form onSubmit={handleNewsletterSubmit} className="w-full mb-4">
            <div className="flex flex-col sm:flex-row items-stretch rounded-full border-2 border-[#1a4a8a] overflow-hidden bg-white">
              <input
                type="text"
                placeholder={t('supportNew.newsletterPlaceholder')}
                value={newsEmail}
                onChange={(e) => {
                  setNewsEmail(e.target.value);
                  if (newsError) setNewsError('');
                }}
                className="flex-grow px-6 py-4 text-[14px] outline-none bg-white"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#0d2b5e] text-white font-bold text-[14px] hover:bg-[#1a4a8a] transition-colors duration-200 cursor-pointer sm:shrink-0"
              >
                {t('supportNew.subscribe')}
              </button>
            </div>

            {/* Error Message */}
            {newsError && (
              <p className="text-red-500 text-xs text-left px-4 mt-1">{newsError}</p>
            )}

            {/* Success Message */}
            {newsSuccess && (
              <p className="text-[#1a4a8a] text-xs font-semibold text-left px-4 mt-1">
                {t('supportNew.newsSuccess')}
              </p>
            )}
          </form>

          {/* Privacy Consent Checkbox */}
          <div className="flex items-start gap-2 text-left">
            <input
              type="checkbox"
              id="newsConsent"
              checked={newsConsent}
              onChange={(e) => {
                setNewsConsent(e.target.checked);
                if (newsError) setNewsError('');
              }}
              className="mt-1 w-3.5 h-3.5 cursor-pointer"
            />
            <label htmlFor="newsConsent" className="text-[11px] text-[#4a5568] leading-relaxed cursor-pointer select-none">
              {t('supportNew.newsGdpr')}{' '}
              <a href="/privacy-policy" className="text-[#1a4a8a] hover:underline">
                privacy policy
              </a>.
            </label>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: FOOTER ── */}
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <FloatingToolbar />
    </div>
  );
}
