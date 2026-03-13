
import React from 'react';
import { motion } from 'framer-motion';

const DestinationCard = ({ destination }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
        <p className="text-sm mb-3 text-gray-200 line-clamp-2">{destination.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#FFB700] font-bold text-lg">
            Desde ${destination.price}
          </span>
          <span className="text-xs text-gray-300">{destination.duration}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
