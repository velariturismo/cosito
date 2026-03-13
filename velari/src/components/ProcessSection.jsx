
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Compass, Plane } from 'lucide-react';

const steps = [
  {
    number: '01',
    Icon: MessageCircle,
    title: 'Contanos tu sueño',
    description:
      'Escribinos o charlamos por WhatsApp. Compartís tus ideas, fechas, presupuesto y cómo te gusta viajar.',
  },
  {
    number: '02',
    Icon: Compass,
    title: 'Diseñamos tu experiencia',
    description:
      'En 48 hs te presentamos un itinerario a medida con opciones de alojamiento, traslados y experiencias únicas.',
  },
  {
    number: '03',
    Icon: Plane,
    title: 'Disfrutás sin preocuparte',
    description:
      'Confirmás y nosotros manejamos todo. Vos llegás al destino, nosotros ya arreglamos el resto.',
  },
];

const WaveTop = () => (
  <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none rotate-180">
    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
      <path d="M0,40 C360,0 720,80 1080,40 C1260,20 1380,60 1440,40 L1440,80 L0,80 Z" fill="#314053" />
    </svg>
  </div>
);

const WaveBottom = () => (
  <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
      <path d="M0,60 C360,20 720,80 1080,40 C1200,20 1350,60 1440,50 L1440,80 L0,80 Z" fill="#dfd7cb" />
    </svg>
  </div>
);

const ProcessSection = () => (
  <section
    id="proceso"
    className="relative py-32 bg-velari-petrol overflow-hidden"
  >
    <WaveTop />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-accent text-velari-sand text-2xl mb-3">Simple y transparente</p>
        <h2 className="section-heading text-white">
          Cómo funciona Velari
        </h2>
        <p className="section-subheading text-white/70 max-w-2xl mx-auto mt-4">
          Tres pasos para que tu próximo viaje sea el mejor de tu vida
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Connector line – desktop only */}
        <div
          className="hidden lg:block absolute top-20 left-[calc(16.667%+2rem)] right-[calc(16.667%+2rem)] h-px z-0"
          style={{ background: 'linear-gradient(to right, #ceb59c33, #ceb59c, #ceb59c33)' }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {steps.map(({ number, Icon, title, description }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.18 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number + icon */}
              <div className="relative z-10 mb-6">
                <span
                  className="absolute -top-4 -left-4 text-6xl font-bold text-white/5 select-none"
                  style={{ fontFamily: "'Helony','Cormorant Garamond',Georgia,serif" }}
                >
                  {number}
                </span>
                <div className="w-20 h-20 rounded-full bg-velari-deep border-2 border-velari-sand/40 flex items-center justify-center shadow-xl">
                  <Icon size={32} className="text-velari-sand" />
                </div>
              </div>

              <h3
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "'Helony','Cormorant Garamond',Georgia,serif" }}
              >
                {title}
              </h3>
              <p className="text-white/70 leading-relaxed" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA inline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center mt-14"
      >
        <a
          href="#contacto"
          onClick={(e) => {
            e.preventDefault();
            const el = document.querySelector('#contacto');
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
          }}
          className="btn-primary inline-flex"
        >
          Empezá ahora
        </a>
      </motion.div>
    </div>

    <WaveBottom />
  </section>
);

export default ProcessSection;
