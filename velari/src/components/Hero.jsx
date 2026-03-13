
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Organic wave divider
const WaveBottom = () => (
  <div className="wave-bottom absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
    <svg
      viewBox="0 0 1440 80"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="w-full h-16 md:h-20"
    >
      <path
        d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
        fill="#dfd7cb"
      />
    </svg>
  </div>
);

const Hero = () => {
  const scrollToContact = () => {
    const el = document.querySelector('#contacto');
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 80,
      behavior: 'smooth',
    });
  };

  const scrollToProcess = () => {
    const el = document.querySelector('#proceso');
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 80,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80"
          alt="Paisaje del Norte Argentino – Quebrada de Humahuaca"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Gradient overlay — deep blue tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-velari-deep/85 via-velari-petrol/70 to-velari-deep/60" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-radial-gradient" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(30,43,58,0.6) 100%)'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-24">
        {/* Pre-heading accent */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-accent text-velari-sand text-2xl md:text-3xl mb-4"
        >
          Arquitectos de experiencias
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="section-heading text-white mb-6 max-w-4xl mx-auto"
        >
          Diseñamos tu viaje perfecto.
          <br />
          <span className="text-velari-sand">Vos solo disfrutás.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}
        >
          Experiencias personalizadas de alta gama desde el Norte Argentino.
          Sin fricciones, sin estrés — cada detalle, en nuestras manos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={scrollToContact} className="btn-primary text-base px-10 py-4">
            Empezá a planear tu viaje
          </button>
          <button onClick={scrollToProcess} className="btn-outline text-base px-10 py-4">
            ¿Cómo funciona?
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12"
        >
          {[
            '✓ 100% personalizado',
            '✓ Atención directa',
            '✓ Desde Jujuy para el mundo',
          ].map((badge) => (
            <span
              key={badge}
              className="text-white/70 text-sm tracking-wide"
              style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToProcess}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-velari-sand transition-colors focus:outline-none"
        aria-label="Desplazarse hacia abajo"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>

      {/* Organic wave separator */}
      <WaveBottom />
    </section>
  );
};

export default Hero;
