
import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from '@/components/TestimonialCard';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'María González',
      comment: 'Velari hizo realidad nuestro sueño de conocer Bali. Cada detalle fue perfecto, desde el vuelo hasta las excursiones. ¡Una experiencia inolvidable!',
      destination: 'Bali, Indonesia'
    },
    {
      name: 'Carlos Ramírez',
      comment: 'Excelente servicio. Mi asesora personal entendió exactamente lo que buscaba y creó un itinerario increíble para Machu Picchu. Totalmente recomendado.',
      destination: 'Machu Picchu, Perú'
    },
    {
      name: 'Ana Martínez',
      comment: 'Las Maldivas superaron todas nuestras expectativas. Velari se encargó de todo y pudimos disfrutar sin preocupaciones. El mejor viaje de luna de miel.',
      destination: 'Maldivas'
    },
    {
      name: 'Roberto Silva',
      comment: 'Primera vez viajando con una agencia y quedé impresionado. La atención 24/7 nos dio mucha tranquilidad. Ya estamos planeando el próximo viaje con Velari.',
      destination: 'París, Francia'
    }
  ];

  return (
    <section id="testimonios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E5A96] mb-4">
            Testimonios
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lo que nuestros viajeros dicen sobre sus experiencias
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
