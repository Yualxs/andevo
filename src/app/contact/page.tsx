// EN: src/app/contact/page.tsx
'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import React, { useState, useRef } from 'react'; // Asegúrate de que 'useState' y 'useRef' estén importados
import ReCAPTCHA from 'react-google-recaptcha'; // Para el anti-spam

// Importamos nuestros componentes reutilizables
import { Container } from '@/components/Container';
import { AnimatedButton } from '@/components/AnimatedButton';
import { StaggeredEntryAnimation } from '@/components/StaggeredEntryAnimation';

// Importamos los componentes del formulario que ya creamos
import { AnimatedCheckbox } from '@/components/forms/AnimatedCheckbox';
import { AnimatedRadio } from '@/components/forms/AnimatedRadio';
import { AnimatedInput } from '@/components/forms/AnimatedInput';
import { PhoneInput } from '@/components/forms/PhoneInput';
import { FilepondInput } from '@/components/forms/FilepondInput';

// Datos para los checkboxes
const services = [
  "Sitio Web", "Publicidad Online/Offline", "Diseño UX/UI", "SEO", "Identidad Corporativa", "Aplicación"
];
// Datos para los radios
const budgets = [
  "S/. 2,000 a S/. 3,000", "S/. 3,000 a S/. 4,000", "S/. 4,000 a más"
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Para validar el email

export default function ContactPage() {
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const itiRef = useRef<any>(null); // Ref para guardar la instancia de intl-tel-input

  // Función para mostrar errores
  const ErrorMessage = ({ name }: { name: string }) => {
    return errors[name] ? <div className="mt-2 text-red-600 text-sm">{errors[name]}</div> : null;
  };

  const validateForm = (form: HTMLFormElement): boolean => {
    const newErrors: Record<string, string> = {};
    const formData = new FormData(form);
    
    // 1. Validar Nombre
    const name = formData.get('Name') as string;
    if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Por favor, ingresa solo letras en tu nombre.";
    }

    // 2. Validar Email
    const email = formData.get('Email') as string;
    if (!emailRegex.test(email)) {
      newErrors.email = "Por favor, ingresa un correo electrónico válido.";
    }

    // 3. Validar Teléfono (usando la instancia)
    if (itiRef.current && !itiRef.current.isValidNumber()) {
      newErrors.phone = "Por favor, ingresa un número de WhatsApp válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 4. REEMPLAZA tu 'handleSubmit' vacío con este:
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({}); // Limpia errores antiguos
    
    if (!validateForm(e.currentTarget)) {
      setIsSubmitting(false);
      return;
    }

    // Validar reCAPTCHA
    const token = await recaptchaRef.current?.executeAsync();
    if (!token) {
      setErrors({ form: "Falló la verificación de reCAPTCHA. Por favor, inténtalo de nuevo." });
      setIsSubmitting(false);
      return;
    }

    // Si todo es válido...
    console.log("¡Formulario válido! Token:", token);
    // Aquí enviarías los datos a tu API/backend...
    // Simulación de envío:
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("¡Formulario enviado!");
    setIsSubmitting(false);
  };

  return (
    // La sección principal usa fondo blanco
    <main className="bg-white text-black">
      
      {/* 1. REEMPLAZO DE PADDING: 
        Usamos el padding de la referencia de Webflow:
        .padding-section-large (móvil: 12rem/11.3rem, desktop: 20rem/24rem)
        Traducido a Tailwind: pt-48 pb-44 lg:pt-80 lg:pb-96
      */}
      <div className="pt-48 pb-44 lg:pt-80 lg:pb-96">
        <Container>
          
          {/* Breadcrumbs */}
          <StaggeredEntryAnimation>
            <div className="mb-16 flex items-center text-base text-black/70"> {/* mb-16 = margin-large */}
              <Link href="/" className="hover:text-black">Home</Link>
              <ChevronRight size={16} className="mx-1" />
              <span className="text-black">Contact</span>
            </div>
          </StaggeredEntryAnimation>

          {/* Título */}
          <StaggeredEntryAnimation delay={0.1}>
            <div className="mb-24"> {/* mb-24 = margin-xhuge */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium">
                <span className="italic">¡Hola!</span> Cuéntanoslo todo 👋
              </h1>
            </div>
          </StaggeredEntryAnimation>

          {/* Formulario */}
          <StaggeredEntryAnimation delay={0.2}>
            <form onSubmit={handleSubmit} onChange={() => setErrors({})} className="flex flex-col gap-16">
              
              {/* Grupo 1: Intereses (Checkboxes) */}
              <div className="form_field">
                <label className="mb-6 block text-2xl font-medium">
                  Estamos interesados en...
                </label>
                <div className="form_group flex flex-wrap gap-4">
                  {services.map(service => (
                    <AnimatedCheckbox key={service} label={service} name="services" value={service} />
                  ))}
                </div>
              </div>

              {/* Grupo 2: Inputs de Texto */}
              <AnimatedInput 
                name="Name" 
                placeholder="Nombre Completo" 
                type="text" 
                required 
                pattern="[A-Za-z\s]+"
                title="Por favor, ingresa solo letras."
              />
              
              <PhoneInput onInstanceReady={(instance) => (itiRef.current = instance)} />
              <ErrorMessage name="phone" />
              
              <AnimatedInput 
                name="Email" 
                placeholder="Correo Electrónico" 
                type="email" 
                required 
              />
              <ErrorMessage name="email" />

              <AnimatedInput 
                isTextArea 
                name="Message" 
                placeholder="Cuéntanos sobre tu proyecto" 
                required
                maxLength={5000} // <-- AÑADE ESTO
              />

              {/* Grupo 3: Presupuesto (Radios) */}
              <div className="form_field">
                <label className="mb-6 block text-2xl font-medium">
                  Presupuesto del proyecto (USD)
                </label>
                <div className="form_group flex flex-wrap gap-4">
                  {budgets.map(budget => (
                    <AnimatedRadio key={budget} label={budget} name="budget" value={budget} />
                  ))}
                </div>
              </div>

              {/* Grupo 4: Subida de Archivos */}
              <div className="form_field">
                <label className="mb-6 block text-2xl font-medium">
                  Añadir archivo adjunto
                </label>
                <FilepondInput />
              </div>
              
              {/* Botón de Envío */}
              <div className="mt-8">
                <AnimatedButton
                  text="Enviar Mensaje"
                  ariaLabel="Enviar formulario de contacto"
                  as="button"
                  type="submit"
                  disabled={isSubmitting}
                />
                <ErrorMessage name="form" />
              </div>

            </form>
          </StaggeredEntryAnimation>
          
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          />
        </Container>
      </div>
    </main>
  );
}