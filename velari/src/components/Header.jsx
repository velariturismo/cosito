
import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Velari isotipo SVG (cloud + arrow) ────────────────────────────
const VelariIsotipo = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 48 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* cloud body */}
    <path
      d="M38 28H11a9 9 0 110-18 9.004 9.004 0 018.612 6.4A7 7 0 1138 28z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    {/* arrow pointing right */}
    <path
      d="M28 18l6 4-6 4V18z"
      fill="#dfd7cb"
    />
    <path
      d="M24 22h10"
      stroke="#dfd7cb"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const navItems = [
  { label: 'Inicio',        href: '#inicio' },
  { label: 'Servicios',     href: '#servicios' },
  { label: 'Cómo funciona', href: '#proceso' },
  { label: 'Para quién',    href: '#para-quien' },
  { label: 'Contacto',      href: '#contacto' },
];

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.pageYOffset - 80,
    behavior: 'smooth',
  });
};

const Header = () => {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollTo(href);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-velari-deep/98 shadow-2xl backdrop-blur-md py-3'
            : 'bg-velari-deep/90 backdrop-blur-sm py-5'
        }`}
      >
        <nav className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center gap-3 group"
            aria-label="Velari – Inicio"
          >
            <VelariIsotipo className="h-8 w-auto text-velari-sand transition-transform duration-300 group-hover:scale-110" />
            <div className="flex flex-col leading-none">
              <span
                className="text-white text-2xl font-bold tracking-widest"
                style={{ fontFamily: "'Helony','Cormorant Garamond',Georgia,serif" }}
              >
                VELARI
              </span>
              <span className="text-velari-sand text-[10px] tracking-[0.25em] uppercase opacity-80">
                Armá tu viaje
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-white/80 hover:text-velari-sand text-sm tracking-wide transition-colors duration-200 font-medium relative group"
                  style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-velari-sand rounded-full transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, '#contacto')}
            className="hidden md:inline-flex btn-primary text-sm px-6 py-3"
          >
            Empezá a planear
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-velari-deep/98"
            >
              <ul className="container mx-auto px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="block text-white/80 hover:text-velari-sand py-3 text-lg border-b border-white/10 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-4">
                  <a
                    href="#contacto"
                    onClick={(e) => handleNavClick(e, '#contacto')}
                    className="btn-primary w-full justify-center"
                  >
                    Empezá a planear
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating WhatsApp button */}
      <motion.a
        href="https://wa.me/543884335569?text=Hola%20Velari%2C%20quiero%20planear%20mi%20viaje%20%F0%9F%9A%80"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white rounded-full shadow-2xl flex items-center overflow-hidden group"
        style={{ padding: '14px' }}
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={26} className="flex-shrink-0" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[160px] group-hover:ml-2 group-hover:mr-1 transition-all duration-300 text-sm font-semibold">
          ¡Hablemos!
        </span>
      </motion.a>
    </>
  );
};

export default Header;
