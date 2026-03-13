
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const inputClass = (hasError) =>
  `w-full px-4 py-3 rounded-xl border bg-white text-velari-deep placeholder-velari-petrol/40
   transition-all duration-200
   focus:outline-none focus:ring-2 focus:ring-velari-sand focus:border-transparent
   disabled:opacity-50
   ${hasError ? 'border-red-400' : 'border-velari-beige'}`;

const fieldLabel = 'block text-sm font-semibold text-velari-deep mb-2';

const Field = ({ label, error, children }) => (
  <div>
    <label className={fieldLabel}>{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const TIPOS_VIAJERO = [
  'Profesional / Ejecutivo',
  'Familia con niños',
  'Pareja',
  'Grupo de amigos',
  'Viajero solo',
  'Adultos mayores',
];

const DESTINOS = [
  'Jujuy y Quebrada de Humahuaca',
  'Salta y Cafayate',
  'Norte Argentino completo',
  'Patagonia Argentina',
  'Buenos Aires + escapada',
  'Destino internacional',
  'Aún no lo sé — necesito sugerencias',
];

const PRESUPUESTOS = [
  'Hasta $500 USD por persona',
  '$500 – $1.500 USD por persona',
  '$1.500 – $3.000 USD por persona',
  'Más de $3.000 USD por persona',
  'Prefiero no indicarlo',
];

const LeadCaptureForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    destino: '',
    fecha: '',
    presupuesto: '',
    tipo: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.nombre.trim())  e.nombre  = 'Campo requerido';
    if (!formData.email.trim())   e.email   = 'Campo requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Email inválido';
    if (!formData.destino)        e.destino = 'Seleccioná un destino';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Send lead via mailto fallback (no backend required for MVP)
      // In production, replace with an API call to your email service
      const subject = encodeURIComponent(`Nuevo lead Velari — ${formData.nombre}`);
      const body = encodeURIComponent(
        `Nombre: ${formData.nombre}\n` +
        `Email: ${formData.email}\n` +
        `Teléfono: ${formData.telefono || '—'}\n` +
        `Destino: ${formData.destino}\n` +
        `Fecha tentativa: ${formData.fecha || '—'}\n` +
        `Presupuesto: ${formData.presupuesto || '—'}\n` +
        `Tipo de viajero: ${formData.tipo || '—'}\n` +
        `Mensaje: ${formData.mensaje || '—'}`
      );
      window.location.href = `mailto:Velariturismo@gmail.com?subject=${subject}&body=${body}`;

      setIsSubmitted(true);
      toast({
        title: '¡Solicitud enviada!',
        description: 'Te contactamos en las próximas 24 horas.',
        className: 'bg-white border-velari-sand text-velari-deep',
      });
      setFormData({ nombre: '', email: '', telefono: '', destino: '', fecha: '', presupuesto: '', tipo: '', mensaje: '' });
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Por favor escribinos directamente a Velariturismo@gmail.com.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contacto" className="py-28 bg-velari-beige">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl p-12 text-center border border-velari-sand/20"
          >
            <CheckCircle2 size={64} className="text-velari-sand mx-auto mb-6" />
            <h3
              className="text-3xl font-bold text-velari-deep mb-4"
              style={{ fontFamily: "'Helony','Cormorant Garamond',Georgia,serif" }}
            >
              ¡Perfecto, lo recibimos!
            </h3>
            <p className="text-velari-petrol leading-relaxed mb-6" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
              Te contactamos en las próximas 24 horas para comenzar a diseñar
              tu experiencia perfecta.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Enviar otra consulta
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-28 bg-velari-beige">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-accent text-velari-sand text-2xl mb-3">¿Listo para empezar?</p>
          <h2 className="section-heading text-velari-deep">Contanos tu viaje ideal</h2>
          <p className="section-subheading max-w-xl mx-auto mt-4">
            Completá el formulario y en menos de 24 horas te armamos una propuesta personalizada.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl shadow-md border border-velari-beige p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row: nombre + email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Tu nombre *" error={errors.nombre}>
                <input
                  name="nombre" type="text" value={formData.nombre}
                  onChange={handleChange} disabled={loading}
                  placeholder="María González"
                  className={inputClass(!!errors.nombre)}
                />
              </Field>
              <Field label="Email *" error={errors.email}>
                <input
                  name="email" type="email" value={formData.email}
                  onChange={handleChange} disabled={loading}
                  placeholder="tu@email.com"
                  className={inputClass(!!errors.email)}
                />
              </Field>
            </div>

            {/* Row: telefono + tipo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="WhatsApp / Teléfono">
                <input
                  name="telefono" type="tel" value={formData.telefono}
                  onChange={handleChange} disabled={loading}
                  placeholder="+54 9 388 000-0000"
                  className={inputClass(false)}
                />
              </Field>
              <Field label="Tipo de viajero">
                <select
                  name="tipo" value={formData.tipo}
                  onChange={handleChange} disabled={loading}
                  className={inputClass(false)}
                >
                  <option value="">Seleccioná una opción</option>
                  {TIPOS_VIAJERO.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
            </div>

            {/* Destino */}
            <Field label="¿A dónde querés ir? *" error={errors.destino}>
              <select
                name="destino" value={formData.destino}
                onChange={handleChange} disabled={loading}
                className={inputClass(!!errors.destino)}
              >
                <option value="">Seleccioná un destino</option>
                {DESTINOS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </Field>

            {/* Row: fecha + presupuesto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Fecha tentativa de viaje">
                <input
                  name="fecha" type="date" value={formData.fecha}
                  onChange={handleChange} disabled={loading}
                  min={new Date().toISOString().split('T')[0]}
                  className={inputClass(false)}
                />
              </Field>
              <Field label="Presupuesto aproximado">
                <select
                  name="presupuesto" value={formData.presupuesto}
                  onChange={handleChange} disabled={loading}
                  className={inputClass(false)}
                >
                  <option value="">Seleccioná un rango</option>
                  {PRESUPUESTOS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </Field>
            </div>

            {/* Mensaje libre */}
            <Field label="¿Algo más que quieras contarnos?">
              <textarea
                name="mensaje" value={formData.mensaje}
                onChange={handleChange} disabled={loading}
                rows={3}
                placeholder="Fechas especiales, preferencias de alojamiento, actividades que te interesan..."
                className={`${inputClass(false)} resize-none`}
              />
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={18} /> Enviando...</>
              ) : (
                <><Send size={18} /> Quiero mi propuesta personalizada</>
              )}
            </button>

            <p className="text-center text-velari-petrol/50 text-xs" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
              Sin spam. Tu información es confidencial. Te contactamos solo para planear tu viaje.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
