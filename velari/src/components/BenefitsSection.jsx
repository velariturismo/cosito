
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, MapPin } from 'lucide-react';

const pillars = [
  {
    Icon: Sparkles,
    title: 'Personalización Total',
    description:
      'Cada itinerario es único, diseñado exclusivamente para vos. Tus gustos, tus tiempos, tu presupuesto.',
  },
  {
    Icon: ShieldCheck,
    title: 'Cero Preocupaciones',
    description:
      'Nos encargamos de cada detalle: pasajes, alojamiento, traslados y experiencias. Vos solo disfrutás.',
  },
  {
    Icon: MapPin,
    title: 'Expertos Locales',
    description:
      'Conocemos el Norte Argentino como nadie. Acceso a lugares únicos, partners premium y experiencias auténticas.',
  },
];

const WaveBottom = () => (
  <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
      <path d="M0,40 C360,0 720,80 1080,40 C1260,20 1380,60 1440,40 L1440,80 L0,80 Z" fill="#314053" />
    </svg>
  </div>
);

const BenefitsSection = () => (
  <section
    id="propuesta"
    className="relative py-28 bg-velari-beige overflow-hidden"
  >
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-accent text-velari-sand text-2xl mb-3">¿Por qué Velari?</p>
        <h2 className="section-heading text-velari-deep">
          Tres razones que lo cambian todo
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {pillars.map(({ Icon, title, description }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-velari-beige"
          >
            <div className="w-16 h-16 rounded-2xl bg-velari-deep flex items-center justify-center mb-6 group-hover:bg-velari-petrol transition-colors duration-300">
              <Icon size={28} className="text-velari-sand" />
            </div>
            <h3
              className="text-2xl font-bold text-velari-deep mb-3"
              style={{ fontFamily: "'Helony','Cormorant Garamond',Georgia,serif" }}
            >
              {title}
            </h3>
            <p className="text-velari-petrol leading-relaxed" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>

    <WaveBottom />
  </section>
);

export default BenefitsSection;
