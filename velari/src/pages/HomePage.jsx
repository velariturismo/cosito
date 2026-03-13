
import React from 'react';
import { Helmet } from 'react-helmet';
import Header            from '@/components/Header';
import Hero              from '@/components/Hero';
import BenefitsSection   from '@/components/BenefitsSection';
import ProcessSection    from '@/components/ProcessSection';
import ServiciosSection  from '@/components/ServiciosSection';
import ParaQuienSection  from '@/components/ParaQuienSection';
import DiferenciadoresSection from '@/components/DiferenciadoresSection';
import TestimoniosSection from '@/components/TestimoniosSection';
import CTAFinal          from '@/components/CTAFinal';
import LeadCaptureForm   from '@/components/LeadCaptureForm';
import Footer            from '@/components/Footer';
import AIChatbot         from '@/components/AIChatbot';

const HomePage = () => (
  <>
    <Helmet>
      <title>Velari – Armá tu viaje | Agencia de Viajes Boutique, Norte Argentino</title>
      <meta
        name="description"
        content="Velari es tu agencia de viajes boutique del Norte Argentino. Diseñamos experiencias personalizadas de alta gama: Jujuy, Salta, Patagonia y más. Sin fricciones, sin estrés."
      />
      <meta name="keywords" content="agencia de viajes jujuy, viajes personalizados norte argentino, turismo boutique, velari, salta turismo, quebrada de humahuaca" />
      {/* Open Graph */}
      <meta property="og:title"       content="Velari – Armá tu viaje" />
      <meta property="og:description" content="Arquitectos de experiencias de viaje en el Norte Argentino. Personalizadas, exclusivas y sin preocupaciones." />
      <meta property="og:type"        content="website" />
      <meta property="og:locale"      content="es_AR" />
      {/* Preconnect for fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Caveat:wght@700&display=swap"
        rel="stylesheet"
      />
    </Helmet>

    <div className="min-h-screen overflow-x-hidden">
      <Header />

      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Propuesta de valor (3 pillars) */}
        <BenefitsSection />

        {/* 3. Cómo funciona */}
        <ProcessSection />

        {/* 4. Servicios */}
        <ServiciosSection />

        {/* 5. Para quién */}
        <ParaQuienSection />

        {/* 6. Diferenciadores */}
        <DiferenciadoresSection />

        {/* 7. Testimonios */}
        <TestimoniosSection />

        {/* 8. CTA Final */}
        <CTAFinal />

        {/* 9. Formulario de contacto / Lead capture */}
        <LeadCaptureForm />
      </main>

      <Footer />

      {/* AI Chatbot floating widget */}
      <AIChatbot />
    </div>
  </>
);

export default HomePage;
