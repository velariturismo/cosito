
import { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export const useSupabaseLead = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitLead = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: supabaseError } = await supabase
        .from('leads')
        .insert([
          {
            nombre: formData.nombre,
            email: formData.email,
            destino: formData.destino,
            fecha: formData.fecha
          }
        ])
        .select();

      if (supabaseError) {
        throw supabaseError;
      }

      return { success: true, data };
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError(err.message || 'Error al enviar el formulario');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { submitLead, loading, error };
};
