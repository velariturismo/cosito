
/**
 * AIChatbot — Velari travel assistant widget
 *
 * Uses the Anthropic Messages API directly from the browser.
 * ⚠️  Set VITE_ANTHROPIC_API_KEY in your .env file.
 *
 * For production on Hostinger, route requests through /api/chat.php
 * (see README) to avoid exposing the key in the client bundle.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';

// ── System prompt for Velari's AI assistant ────────────────────
const SYSTEM_PROMPT = `Sos el asistente virtual de Velari, una agencia de viajes boutique del Norte Argentino especializada en experiencias personalizadas de alta gama.

Tu rol:
- Ayudar a los visitantes del sitio a explorar opciones de viaje
- Hacer preguntas inteligentes para entender sus preferencias (tipo de viajero, fechas, presupuesto, intereses)
- Sugerir destinos y experiencias alineadas con su perfil
- Recopilar información para que el equipo humano haga una propuesta formal
- Derivar a WhatsApp (+54 388 433-5569) o email (Velariturismo@gmail.com) para el seguimiento

Tone & style:
- Usás "vos" (argentino), sos cálido, profesional y entusiasta
- Respuestas concisas (máximo 3-4 párrafos cortos)
- Nunca usás jerga técnica del turismo
- Enfocado en beneficios y experiencias, no en características
- Si el usuario está listo para planear, siempre ofrecé conectarlo con el equipo

Especialidades de Velari:
- Jujuy (Quebrada de Humahuaca, Tilcara, Purmamarca, Salinas Grandes)
- Salta y Cafayate
- Ruta del Vino del NOA
- Experiencias culturales e indígenas del Norte
- Paquetes nacionales e internacionales personalizados
- Enoturismo, trekking de altura, astroturismo`;

// ── Helpers ─────────────────────────────────────────────────────
const callAnthropic = async (messages, signal) => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    signal,
    headers: {
      'Content-Type':      'application/json',
      'x-api-key':         apiKey,
      'anthropic-version': '2023-06-01',
      // Required for browser-side calls
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model:      'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system:     SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text ?? '';
};

// ── Sub-components ───────────────────────────────────────────────
const Bubble = ({ role, text }) => {
  const isBot = role === 'assistant';
  return (
    <div className={`flex gap-2 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs
          ${isBot ? 'bg-velari-deep text-velari-sand' : 'bg-velari-sand text-velari-deep'}`}
      >
        {isBot ? <Bot size={14} /> : <User size={14} />}
      </div>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
          ${isBot
            ? 'bg-white text-velari-deep rounded-tl-none border border-velari-beige'
            : 'bg-velari-deep text-white rounded-tr-none'}`}
        style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}
      >
        {text}
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex gap-2 items-start">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-velari-deep flex items-center justify-center">
      <Bot size={14} className="text-velari-sand" />
    </div>
    <div className="bg-white border border-velari-beige rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-velari-sand"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  </div>
);

// ── Main component ───────────────────────────────────────────────
const GREETING = '¡Hola! Soy el asistente de Velari 👋\n\n¿Estás pensando en algún viaje? Contame adónde soñás ir y te ayudo a explorar opciones.';

const AIChatbot = () => {
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState([
    { role: 'assistant', text: GREETING },
  ]);
  const [input, setInput]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [noKey, setNoKey]         = useState(false);

  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);
  const abortRef   = useRef(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    // Build message list for API (role: user/assistant only)
    const apiMessages = next.map((m) => ({ role: m.role, content: m.text }));

    abortRef.current = new AbortController();
    try {
      const reply = await callAnthropic(apiMessages, abortRef.current.signal);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      if (err.name === 'AbortError') return;
      if (err.message === 'NO_API_KEY') {
        setNoKey(true);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: 'Por ahora estoy en modo demo 😊\nPara hablar con nuestro equipo en tiempo real, escribinos al WhatsApp +54 388 433-5569 o a Velariturismo@gmail.com.',
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: 'Ups, algo salió mal de mi lado 🙈\nPodés escribirnos directo a Velariturismo@gmail.com o por WhatsApp.',
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  return (
    <>
      {/* Trigger button — sits above WhatsApp button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-[5.5rem] right-6 z-[59] w-14 h-14 rounded-full bg-velari-deep text-velari-sand flex items-center justify-center shadow-xl border-2 border-velari-sand/30"
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente de viajes'}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.span>
            : <motion.span key="msg" initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><MessageCircle size={22} /></motion.span>
          }
        </AnimatePresence>
        {/* Notification dot */}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-velari-sand rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-velari-deep text-[8px] font-bold">IA</span>
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed bottom-[9.5rem] right-6 z-[58] w-[calc(100vw-3rem)] max-w-sm bg-velari-beige rounded-3xl shadow-2xl border border-velari-beige overflow-hidden flex flex-col"
            style={{ height: '480px' }}
          >
            {/* Header */}
            <div className="bg-velari-deep px-5 py-4 flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-velari-sand flex items-center justify-center">
                <Bot size={18} className="text-velari-deep" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm" style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}>
                  Asistente Velari
                </p>
                <p className="text-white/50 text-xs">Responde al instante</p>
              </div>
              {!apiKey && (
                <span className="ml-auto text-velari-sand/60 text-xs">modo demo</span>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} text={m.text} />
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies (shown only on greeting) */}
            {messages.length === 1 && !loading && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                {[
                  'Quiero visitar Jujuy',
                  'Viaje en familia',
                  'Buscamos escapada romántica',
                  'Quiero una sorpresa',
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); setTimeout(send, 0); }}
                    className="text-xs bg-white border border-velari-sand/40 text-velari-petrol px-3 py-1.5 rounded-full hover:bg-velari-sand hover:text-velari-deep transition-colors"
                    style={{ fontFamily: "'Codec Pro','Inter',sans-serif" }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input area */}
            <div className="px-4 py-3 border-t border-velari-beige bg-white flex-shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  disabled={loading}
                  rows={1}
                  placeholder="Escribí tu consulta..."
                  className="flex-1 resize-none rounded-xl border border-velari-beige px-3 py-2 text-sm text-velari-deep placeholder-velari-petrol/40 focus:outline-none focus:ring-2 focus:ring-velari-sand disabled:opacity-50 bg-velari-beige/50"
                  style={{ fontFamily: "'Codec Pro','Inter',sans-serif", maxHeight: '96px' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 flex-shrink-0 rounded-xl bg-velari-deep text-velari-sand flex items-center justify-center disabled:opacity-40 hover:bg-velari-petrol transition-colors"
                  aria-label="Enviar mensaje"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
