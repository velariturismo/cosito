
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Users2, Globe2, Award } from 'lucide-react';

const items = [
  {
    Icon: Users2,
    title: 'No somos una agencia tradicional',
    description:
      'Sin local físico, sin esperas, sin burocracia. Trabajamos de forma ágil, directa y totalmente orientada a vos.',
  },
  {
    Icon: Cpu,
    title: 'Diseño humano + tecnología',
    description:
      'Combinamos la calidez del trato personal con herramientas de IA para ofrecerte propuestas más precisas y rápidas.',
  },
  {
    Icon: Globe2,
    title: 'Atención personalizada desde Jujuy',
    description:
      'Somos del Norte Argentino y lo conocemos en profundidad. Eso nos da acceso a experiencias que ninguna agencia porteña puede ofrecer.',
  },
  {
    Icon: Award,
    title: 'Red de partners premium',
    description:
      'Trabajamos con alojamientos boutique, guías expertos y operadores locales seleccionados por su excelencia, no por comisión.',
  },
];

const WaveTop = () => (
  <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20 rotate-180">
      <path d="M0,60 C360,20 720,80 1080,40 C1200,20 1350,60 1440,50 L1440,80 L0,80 Z" fill="#dfd7cb" />
    </svg>
  </div>
);

const WaveBottom = () => (
  <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
      <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#1e2b3a" />
    </svg>
  </div>
);

const DiferenciadoresSection = () => (
  <section
    id="diferenciadores"
    className="relative py-32 bg-velari-beige overflow-hidden"
  >
    <WaveTop />

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-accent text-velari-sand text-2xl mb-3">Lo que nos hace diferentes</p>
          <h2 className="section-heading text-velari-deep mb-6">
            Redefiniendo el estándar en el Norte Argentino
          </h2>
          <p className="text-velari-petrol leading-relaxed mb-8" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
            En Velari creemos que un buen viaje no empieza en el aeropuerto —
            empieza en la primera conversación. Por eso ponemos tanto cuidado
            en cómo te escuchamos como en cómo organizamos cada detalle.
          </p>
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#contacto');
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
            }}
            className="btn-primary inline-flex"
          >
            Hablemos de tu viaje
          </a>
        </motion.div>

        {/* Right: feature list */}
        <div className="space-y-6">
          {items.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5 bg-white rounded-2xl p-5 border border-velari-beige hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-velari-deep flex items-center justify-center">
                <Icon size={20} className="text-velari-sand" />
              </div>
              <div>
                <h3
                  className="text-base font-bold text-velari-deep mb-1"
                  style={{ fontFamily: "'Helony','Cormorant Garamond',Georgia,serif" }}
                >
                  {title}
                </h3>
                <p className="text-velari-petrol text-sm leading-relaxed" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    <WaveBottom />
  </section>
);

export default DiferenciadoresSection;
