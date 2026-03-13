
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-[#1E5A96] flex items-center justify-center text-white font-bold text-lg">
          {testimonial.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className="fill-[#FFB700] text-[#FFB700]"
              />
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 italic leading-relaxed">
        "{testimonial.comment}"
      </p>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-sm text-[#1E5A96] font-medium">
          {testimonial.destination}
        </span>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
