
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const WaveTop = () => (
  <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none rotate-180">
    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
      <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#1e2b3a" />
    </svg>
  </div>
);

const CTAFinal = () => (
  <section
    id="cta-final"
    className="relative py-32 overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #ceb59c 0%, #dfd7cb 50%, #ceb59c 100%)' }}
  >
    <WaveTop />

    {/* Decorative blobs */}
    <div
      className="absolute top-1/4 left-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
      style={{ background: '#1e2b3a', filter: 'blur(80px)' }}
    />
    <div
      className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-15 pointer-events-none"
      style={{ background: '#314053', filter: 'blur(100px)' }}
    />

    <div className="container mx-auto px-4 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-accent text-velari-deep/70 text-2xl mb-4">¿Estás listo?</p>
        <h2
          className="section-heading text-velari-deep mb-6 max-w-3xl mx-auto"
        >
          Tu próxima aventura empieza con una conversación
        </h2>
        <p
          className="text-velari-petrol text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}
        >
          Sin compromiso, sin costos ocultos. Solo contanos tu sueño y
          nosotros nos encargamos del resto.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#contacto');
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center gap-2 bg-velari-deep text-white font-semibold rounded-full px-10 py-4 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}
          >
            Hablemos de tu viaje
            <ArrowRight size={18} />
          </a>
          <a
            href="https://wa.me/543884335569?text=Hola%20Velari%2C%20quiero%20planear%20mi%20viaje%20%F0%9F%9A%80"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-velari-deep text-velari-deep font-semibold rounded-full px-10 py-4 hover:bg-velari-deep hover:text-white transition-all duration-300"
            style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}
          >
            WhatsApp directo
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTAFinal;
