
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Heart } from 'lucide-react';

const personas = [
  {
    Icon: Briefcase,
    tag: 'El Profesional',
    headline: 'Que valora su tiempo al máximo',
    description:
      'Tenés una agenda apretada y no querés dedicar horas a investigar vuelos, hoteles y reviews. Delegás toda la organización y llegás al destino sabiendo que todo está perfecto.',
    highlight: '"Mi tiempo vale más que cualquier ahorro."',
    imgUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80',
    imgAlt: 'Profesional viajando',
  },
  {
    Icon: Users,
    tag: 'La Familia',
    headline: 'Que busca seguridad y organización',
    description:
      'Viajar en familia es complejo. Necesitás alojamientos adecuados, actividades para todas las edades y la certeza de que nada va a salir mal. Nosotros nos encargamos.',
    highlight: '"Quiero que mis hijos vivan experiencias únicas, sin el estrés de organizar todo."',
    imgUrl: 'https://images.unsplash.com/photo-1502301103845-f88e68db6cbb?w=600&q=80',
    imgAlt: 'Familia feliz de vacaciones',
  },
  {
    Icon: Heart,
    tag: 'El Viajero Exigente',
    headline: 'Que exige excelencia en cada detalle',
    description:
      'Ya recorriste el mundo y sabes exactamente lo que querés. Comfort, cultura, gastronomía de nivel y experiencias que pocos conocen. Nosotros accedemos a donde otros no llegan.',
    highlight: '"El lujo no grita. Se vive en cada detalle."',
    imgUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
    imgAlt: 'Viajero experimentado en destino premium',
  },
];

const ParaQuienSection = () => (
  <section
    id="para-quien"
    className="relative py-28 bg-velari-deep overflow-hidden"
  >
    {/* Organic background texture */}
    <div
      className="absolute inset-0 opacity-5 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ceb59c' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-accent text-velari-sand text-2xl mb-3">Para quién trabajamos</p>
        <h2 className="section-heading text-white">
          Diseñamos viajes para personas exigentes
        </h2>
        <p className="section-subheading text-white/60 max-w-2xl mx-auto mt-4">
          No somos para todos. Somos para quienes valoran que cada cosa esté bien hecha.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {personas.map(({ Icon, tag, headline, description, highlight, imgUrl, imgAlt }, i) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group flex flex-col bg-velari-petrol rounded-3xl overflow-hidden border border-white/5 hover:border-velari-sand/30 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={imgUrl}
                alt={imgAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-velari-petrol to-transparent" />
              {/* Tag badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-velari-sand flex items-center justify-center">
                  <Icon size={14} className="text-velari-deep" />
                </div>
                <span className="text-velari-sand text-sm font-semibold tracking-wide" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
                  {tag}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-7">
              <h3
                className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: "'Helony','Cormorant Garamond',Georgia,serif" }}
              >
                {headline}
              </h3>
              <p className="text-white/65 text-sm leading-relaxed mb-4 flex-1" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
                {description}
              </p>
              <p className="font-accent text-velari-sand text-base">
                {highlight}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ParaQuienSection;
