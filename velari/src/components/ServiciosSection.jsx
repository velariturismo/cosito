
import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Package, Route, Star } from 'lucide-react';

const servicios = [
  {
    Icon: UserCheck,
    title: 'Consultoría Personalizada',
    description:
      'Una sesión uno a uno donde conocemos tus gustos, necesidades y sueños para diseñar la experiencia ideal.',
    badge: 'Gratis',
  },
  {
    Icon: Package,
    title: 'Paquetes Premium Llave en Mano',
    description:
      'Todo incluido y coordinado: vuelos, traslados, alojamiento boutique y experiencias seleccionadas.',
    badge: null,
  },
  {
    Icon: Route,
    title: 'Gestión Integral de Viajes',
    description:
      'Coordinamos cada segmento de tu viaje. Desde el primer vuelo hasta el último traslado, sin que vos te preocupes por nada.',
    badge: null,
  },
  {
    Icon: Star,
    title: 'Experiencias Exclusivas',
    description:
      'Acceso a lugares, guías y experiencias que no encontrás en ninguna plataforma. Nuestros partners locales, tu beneficio.',
    badge: 'Exclusivo',
  },
];

const ServiciosSection = () => (
  <section
    id="servicios"
    className="relative py-28 bg-velari-beige overflow-hidden"
  >
    {/* Decorative organic blob */}
    <div
      className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
      style={{ background: '#ceb59c', filter: 'blur(80px)', transform: 'translate(30%, -30%)' }}
    />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-accent text-velari-sand text-2xl mb-3">Lo que hacemos</p>
        <h2 className="section-heading text-velari-deep">Nuestros servicios</h2>
        <p className="section-subheading max-w-2xl mx-auto mt-4">
          Cada servicio está pensado para que vos no tengas que pensar en nada más que disfrutar.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {servicios.map(({ Icon, title, description, badge }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative bg-white rounded-3xl p-8 border border-velari-beige hover:border-velari-sand shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {badge && (
              <span className="absolute top-4 right-4 text-xs font-semibold bg-velari-sand text-velari-deep px-3 py-1 rounded-full">
                {badge}
              </span>
            )}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-velari-deep flex items-center justify-center group-hover:bg-velari-petrol transition-colors duration-300">
                <Icon size={22} className="text-velari-sand" />
              </div>
              <div>
                <h3
                  className="text-xl font-bold text-velari-deep mb-2"
                  style={{ fontFamily: "'Helony','Cormorant Garamond',Georgia,serif" }}
                >
                  {title}
                </h3>
                <p className="text-velari-petrol leading-relaxed text-sm" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
                  {description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiciosSection;
