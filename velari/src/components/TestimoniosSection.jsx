
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

// Placeholder testimonials — replace with real ones when available
const testimonios = [
  {
    quote:
      'Velari nos organizó el viaje a Jujuy y Salta perfecto. Cada hotel era una joya, los guías conocían cada rincón. Volvimos transformados.',
    name: 'Martina R.',
    location: 'Buenos Aires',
    avatar: 'MR',
  },
  {
    quote:
      'Viajé solo por primera vez gracias a la confianza que me dio el equipo. Sabía que si algo pasaba, ellos estaban. No hubo ningún inconveniente.',
    name: 'Carlos M.',
    location: 'Córdoba',
    avatar: 'CM',
  },
  {
    quote:
      'La propuesta que nos armaron superó todas las expectativas. No era un paquete armado, era exactamente lo que queríamos.',
    name: 'Familia Gutiérrez',
    location: 'Rosario',
    avatar: 'FG',
  },
];

const TestimoniosSection = () => (
  <section
    id="testimonios"
    className="relative py-28 bg-velari-deep overflow-hidden"
  >
    {/* Decorative quote mark */}
    <div className="absolute top-16 left-8 opacity-5 pointer-events-none">
      <Quote size={200} className="text-velari-sand" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="font-accent text-velari-sand text-2xl mb-3">Lo que dicen nuestros viajeros</p>
        <h2 className="section-heading text-white">
          Experiencias que hablan por sí solas
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonios.map(({ quote, name, location, avatar }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="bg-velari-petrol rounded-3xl p-8 border border-white/5 relative"
          >
            <Quote size={24} className="text-velari-sand mb-4 opacity-60" />
            <p
              className="text-white/80 leading-relaxed mb-6 italic"
              style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}
            >
              "{quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-velari-sand flex items-center justify-center text-velari-deep font-bold text-sm flex-shrink-0">
                {avatar}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{name}</p>
                <p className="text-white/50 text-xs">{location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center text-white/30 text-xs mt-8"
        style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}
      >
        * Testimonios representativos — próximamente reseñas verificadas de Google.
      </motion.p>
    </div>
  </section>
);

export default TestimoniosSection;
