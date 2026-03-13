
import React from 'react';
import { Instagram, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const scrollTo = (e, href) => {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
};

const VelariIsotipo = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M38 28H11a9 9 0 110-18 9.004 9.004 0 018.612 6.4A7 7 0 1138 28z" fill="currentColor" fillOpacity="0.9" />
    <path d="M28 18l6 4-6 4V18z" fill="#dfd7cb" />
    <path d="M24 22h10" stroke="#dfd7cb" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const quickLinks = [
  { label: 'Inicio',        href: '#inicio' },
  { label: 'Servicios',     href: '#servicios' },
  { label: 'Cómo funciona', href: '#proceso' },
  { label: 'Para quién',    href: '#para-quien' },
  { label: 'Contacto',      href: '#contacto' },
];

const Footer = () => (
  <footer className="bg-velari-deep text-white">
    {/* Wave top */}
    <div className="overflow-hidden leading-none">
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
        <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#ceb59c" />
      </svg>
    </div>

    <div className="container mx-auto px-4 pt-6 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Branding */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <VelariIsotipo className="h-8 w-auto text-velari-sand" />
            <div className="flex flex-col leading-none">
              <span className="text-white text-2xl font-bold tracking-widest" style={{ fontFamily: "'Helony','Cormorant Garamond',Georgia,serif" }}>
                VELARI
              </span>
              <span className="text-velari-sand text-[10px] tracking-[0.25em] uppercase opacity-70">Armá tu viaje</span>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
            Arquitectos de experiencias de viaje en el Norte Argentino. Sin fricciones, sin estrés — solo momentos que recordás para siempre.
          </p>
          <a
            href="https://wa.me/543884335569?text=Hola%20Velari%2C%20quiero%20planear%20mi%20viaje%20%F0%9F%9A%80"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 text-sm"
            style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-velari-sand font-semibold uppercase tracking-widest text-xs mb-5" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
            Navegación
          </h4>
          <ul className="space-y-3">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => scrollTo(e, href)}
                  className="text-white/60 hover:text-velari-sand text-sm transition-colors duration-200"
                  style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-velari-sand font-semibold uppercase tracking-widest text-xs mb-5" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
            Contacto
          </h4>
          <ul className="space-y-4">
            <li>
              <a href="mailto:Velariturismo@gmail.com" className="flex items-start gap-3 text-white/60 hover:text-velari-sand text-sm transition-colors">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <span style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>Velariturismo@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="tel:+543884335569" className="flex items-start gap-3 text-white/60 hover:text-velari-sand text-sm transition-colors">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <span style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>+54 388 433-5569</span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/60 text-sm">
              <MapPin size={16} className="mt-0.5 flex-shrink-0" />
              <span style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>San Salvador de Jujuy,<br />Jujuy, Argentina</span>
            </li>
          </ul>
        </div>

        {/* Social + tagline */}
        <div>
          <h4 className="text-velari-sand font-semibold uppercase tracking-widest text-xs mb-5" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
            Seguinos
          </h4>
          <div className="flex gap-3 mb-6">
            <a
              href="https://instagram.com/velari.tur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Velari"
              className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-velari-sand hover:text-velari-deep text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <Instagram size={18} />
            </a>
          </div>
          <blockquote className="font-accent text-velari-sand text-lg leading-snug">
            "El lujo no grita.<br />Se vive en cada detalle."
          </blockquote>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-white/30 text-xs" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
          © {new Date().getFullYear()} Velari. Todos los derechos reservados.
        </p>
        <p className="text-white/20 text-xs" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
          Diseñado con ♥ en el Norte Argentino
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
