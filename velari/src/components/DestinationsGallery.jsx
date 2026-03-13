
import React from 'react';
import { motion } from 'framer-motion';
import DestinationCard from '@/components/DestinationCard';

const DestinationsGallery = () => {
  const destinations = [
    {
      name: 'Bali',
      image: 'https://images.unsplash.com/photo-1653189382464-25302f3e7409',
      description: 'Templos místicos, playas paradisíacas y cultura milenaria te esperan en la isla de los dioses.',
      price: '1,299',
      duration: '7 días'
    },
    {
      name: 'Machu Picchu',
      image: 'https://images.unsplash.com/photo-1666067112509-531207e9c5f5',
      description: 'Descubre la ciudad perdida de los incas y maravíllate con la arquitectura ancestral en los Andes.',
      price: '1,099',
      duration: '5 días'
    },
    {
      name: 'Santorini',
      image: 'https://images.unsplash.com/photo-1515288954-02cf4fb6bcd0',
      description: 'Pueblos blancos sobre acantilados, atardeceres espectaculares y la magia del mar Egeo.',
      price: '1,599',
      duration: '6 días'
    },
    {
      name: 'Maldivas',
      image: 'https://images.unsplash.com/photo-1698551658963-46a552f4f56e',
      description: 'Villas sobre el agua, arrecifes de coral y aguas cristalinas en el paraíso tropical.',
      price: '2,199',
      duration: '8 días'
    },
    {
      name: 'Costa Rica',
      image: 'https://images.unsplash.com/photo-1540366693604-81565b065bd8',
      description: 'Selvas tropicales, volcanes activos y biodiversidad única en el corazón de Centroamérica.',
      price: '999',
      duration: '6 días'
    },
    {
      name: 'París',
      image: 'https://images.unsplash.com/photo-1692022743840-f503ed7ac8ae',
      description: 'La ciudad de la luz te espera con su arte, gastronomía y romance en cada esquina.',
      price: '1,399',
      duration: '5 días'
    }
  ];

  return (
    <section id="destinos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E5A96] mb-4">
            Destinos Populares
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora los lugares más increíbles del mundo con paquetes diseñados para ti
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard key={index} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsGallery;
