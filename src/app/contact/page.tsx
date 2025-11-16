// EN: src/app/contact/page.tsx
'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
// --- CORRECCIÓN 1: 'from' en lugar de 'em' ---
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import validator from 'email-validator';

// Componentes (sin cambios)
import { Container } from '@/components/Container';
import { AnimatedButton } from '@/components/AnimatedButton';
import { StaggeredEntryAnimation } from '@/components/StaggeredEntryAnimation';
import { AnimatedCheckbox } from '@/components/forms/AnimatedCheckbox';
import { AnimatedRadio } from '@/components/forms/AnimatedRadio';
import { AnimatedInput } from '@/components/forms/AnimatedInput';
import { PhoneInput, isValidPhoneNumber } from '@/components/forms/PhoneInput';
import { FilepondInput } from '@/components/forms/FilepondInput';
import ReCAPTCHA from 'react-google-recaptcha';

// Datos (sin cambios)
const services = [
  "Branding",
  "Desarrollo Web"
];
const timelines = [
  "Urgente (Próximas 2 semanas)",
  "Próximamente (En 1-3 meses)",
  "Flexible (Sin prisa)",
  "Solo estoy cotizando"
];

// --- DEFINIR ESTADO DEL FORMULARIO (sin cambios) ---
interface FormData {
  name: string;
  email: string;
  message: string;
  phone: string | undefined; // El tipo de react-phone-number-input
  services: string[];
  timeline: string;
}

export default function ContactPage() {
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    phone: undefined,
    services: [],
    timeline: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const router = useRouter();

  const ErrorMessage = ({ name }: { name: string }) => {
    const errorType = errors[name];
    if (!errorType) return null;

    // --- LÓGICA ESPECIAL PARA EL TYPO DEL EMAIL ---
    if (name === 'email' && errorType === 'TYPO' && emailSuggestion) {
      const suggestedDomain = emailSuggestion.split('@')[1];
      return (
        <div className="mt-1 text-red-600 text-base">
          <span>¿Quisiste decir "</span>
          <button
            type="button" // Importante para que no envíe el formulario
            className="font-medium underline hover:text-red-700 no-cursor-pointer"
            onClick={() => handleSuggestionClick(emailSuggestion)}
          >
            {suggestedDomain}
          </button>
          <span>"?</span>
        </div>
      );
    }
    // --- FIN DE LA LÓGICA ESPECIAL ---

    // --- LÓGICA PARA TRADUCIR OTRAS PALABRAS CLAVE ---
    let errorText = errorType;
    if (name === 'email' && errorType === 'INVALID_FORMAT') {
      errorText = "Por favor, ingresa un correo electrónico válido.";
    }
    // (Aquí puedes añadir más 'if' para otros campos si los refactorizas)

    // Mensaje de error por defecto
    return (
      <div className="mt-1 text-red-600 text-base">
        {errorText}
      </div>
    );
  };

  // --- LÓGICA DE VALIDACIÓN INDIVIDUAL (sin cambios) ---
  const validateField = (name: string, value: string | undefined | string[]): string | null => {
    switch (name) {
      case 'name':
        // Aseguramos que 'value' se trate como string
        return /^[A-Za-z\s]{3,}$/.test((value as string) || '') 
          ? null 
          : "Por favor, ingresa un nombre válido.";
          
      case 'email':
        const email = (value as string) || '';
        // 1. Primero, valida el formato general
        if (!validator.validate(email)) {
          return "INVALID_FORMAT";
        }
        
        // 2. Si el formato es válido, busca typos comunes
        const [localPart, domain] = email.split('@');
        
        // --- NUESTRO DETECTOR DE TYPOS ---
        const commonTypos: Record<string, string> = {
          'gmai.com': 'gmail.com',
          'gamil.com': 'gmail.com',
          'gmail.con': 'gmail.com',
          'hotmai.com': 'hotmail.com',
          'hotmal.com': 'hotmail.com',
          'hotmail.con': 'hotmail.com',
          'outlok.com': 'outlook.com',
          'outlock.com': 'outlook.com'
        };

        if (commonTypos[domain]) {
          const suggestion = localPart + '@' + commonTypos[domain];
          setEmailSuggestion(suggestion);
          return "TYPO";
        }
        // --- FIN DEL DETECTOR ---
        return null;
        
      case 'message':
        // Aseguramos que 'value' se trate como string
        if (((value as string) || '').trim().length < 30) {
          return "Por favor, danos más detalles (mín. 30 caracteres).";
        }
        if (((value as string) || '').trim().length > 2000) {
          return "Tu mensaje es muy largo (máx. 2000 caracteres).";
        }
        return null;
        
      case 'phone':
        // Aseguramos que 'value' se trate como string | undefined
        return (value && isValidPhoneNumber(value as string))
          ? null
          : "Por favor, ingresa un número de WhatsApp válido.";
      
      // --- ESTA LÓGICA AHORA FUNCIONARÁ ---
      case 'services':
        // 'value' aquí SÍ es un array
        return (Array.isArray(value) && value.length > 0)
          ? null
          : "Por favor, selecciona al menos un interés.";
      
      case 'timeline':
      return (value && typeof value === 'string' && value.length > 0)
        ? null
        : "Por favor, selecciona un plazo para tu proyecto.";

      default:
        return null;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    // 1. Actualiza el formulario con el email corregido
    setFormData(prev => ({ ...prev, email: suggestion }));
    
    // 2. Limpia el error del email
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.email;
      return newErrors;
    });

    // 3. Limpia la sugerencia
    setEmailSuggestion(null);
  };

  // --- CORRECCIÓN 2: Añadir tipos a 'prev' ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (name === 'phone') {
      // (ignora, se maneja en 'handlePhoneChange')
    } else if (type === 'checkbox') { // <-- AÑADE ESTA CONDICIÓN
      // (ignora, se maneja en 'handleCheckboxChange')
    } else {
      // Esto ahora maneja 'name', 'email', 'message', Y 'budget'
      setFormData((prev: FormData) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev: Record<string, string>) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target; // 'name' será "services"

    setFormData((prev: FormData) => {
      const currentServices = prev.services;
      let newServices: string[];
      
      if (checked) {
        // Añadir el servicio al array
        newServices = [...currentServices, value];
      } else {
        // Quitar el servicio del array
        newServices = currentServices.filter(service => service !== value);
      }
      
      return { ...prev, [name]: newServices };
    });

    // Limpia el error de 'services' en cuanto el usuario interactúa
    if (errors.services) {
      setErrors((prev: Record<string, string>) => {
        const newErrors = { ...prev };
        delete newErrors.services;
        return newErrors;
      });
    }
  };

  // --- 9. NUEVO HANDLER para el Teléfono ---
  // (La nueva librería no pasa un 'evento', pasa el 'valor' directo)
  const handlePhoneChange = (value: string | undefined) => {
    setFormData((prev: FormData) => ({ ...prev, phone: value }));
    
    // Limpia el error al empezar a escribir
    if (errors.phone) {
      setErrors((prev: Record<string, string>) => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }
  };

  // --- CORRECCIÓN 3: Añadir tipos a 'prev' ---
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Si el usuario sale del campo de email,
    // y no hay un error de typo, limpia la sugerencia.
    if (name === 'email') {
      setEmailSuggestion(null);
    }
    const error = validateField(name, value); // Valida los de texto
    if (error) {
      setErrors((prev: Record<string, string>) => ({ ...prev, [name]: error }));
    }
  };

  // --- CORRECCIÓN 4: Añadir tipos a 'prev' ---
  const handlePhoneBlur = () => {
    // Valida 'phone' usando el valor del estado
    const error = validateField('phone', formData.phone); 
    if (error) {
      setErrors((prev: Record<string, string>) => ({ ...prev, phone: error }));
    }
  };

  // --- HANDLER ON-SUBMIT (sin cambios, ya era correcto) ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  setErrors({}); 
  setEmailSuggestion(null);

  console.log('--- [CLIENT] Inicia handleSubmit (Clásico v2) ---');

  // 1. Validar campos
  const newErrors: Record<string, string> = {};
  const fieldsToValidate: (keyof FormData)[] = ['name', 'email', 'message', 'phone', 'services', 'timeline'];
  for (const field of fieldsToValidate) {
    const error = validateField(field, formData[field]);
    if (error) newErrors[field] = error;
  }

  if (Object.keys(newErrors).length > 0) {
      // --- ¡LOG DE DEPURACIÓN MEJORADO! ---
      console.log('[CLIENT] Validación fallida. Errores encontrados:');
      console.error(newErrors); // Esto imprimirá el objeto de errores, ej: { name: 'Nombre inválido' }
      // --- FIN DE LA MEJORA ---

      setErrors(newErrors);
      setIsSubmitting(false);
      return; 
    }

  console.log('[CLIENT] Validación OK. Entrando a TRY...');

  try {
      console.log('[CLIENT] Obteniendo token de reCAPTCHA (Clásico v2)...');
      
      // --- CÓDIGO DE reCAPTCHA RESTAURADO ---
      if (!recaptchaRef.current) {
        throw new Error("Error de reCAPTCHA: La referencia es nula.");
      }
      const token = await recaptchaRef.current.executeAsync();
      // --- FIN DE LA RESTAURACIÓN ---
      
      if (!token) {
        throw new Error("Falló la verificación (token nulo). Revisa tu Site Key.");
      }

    console.log('[CLIENT] Token OK. Enviando a /api/contact...');
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, token }), 
    });

    console.log('[CLIENT] Respuesta de API recibida. Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error desconocido.");
    }

    console.log('[CLIENT] ¡ÉXITO! Mostrando mensaje de éxito.');
    router.push('/thank-you');

  } catch (error: any) {
    // (Tu 'catch' mejorado)
    console.error("--- [CLIENT] ERROR EN BLOQUE CATCH ---");
    console.error(error); 
    let errorMessage = "Ocurrió un error desconocido.";
    if (error instanceof Error) errorMessage = error.message;
    else if (error === null) errorMessage = "Falló la verificación Anti-Spam (error: null).";

    console.error("Mensaje de error extraído:", errorMessage);
    setErrors({ form: errorMessage });
  } finally {
    console.log('--- [CLIENT] Finaliza handleSubmit (FINALLY) ---');
    setIsSubmitting(false);
  }
};

  // --- RENDERIZADO DEL JSX (sin cambios) ---
  return (
    <main className="bg-white text-black">
      <div className="pt-48 pb-44 lg:pt-80 lg:pb-96">
        <Container>
          
          {/* Breadcrumbs (Correcto) */}
          <StaggeredEntryAnimation>
            <div className="mb-16 flex items-center text-base text-black/70">
              <Link href="/" className="hover:text-black">Home</Link>
              <ChevronRight size={16} className="mx-1" />
              <span className="text-black">Contact</span>
            </div>
          </StaggeredEntryAnimation>

          {/* Título (Correcto) */}
          <StaggeredEntryAnimation delay={0.1}>
            <div className="mb-24">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
                <span className="italic">¡Hola!</span> Cuéntanoslo todo 👋
              </h1>
            </div>
          </StaggeredEntryAnimation>

          {/* --- INICIO DE LA LÓGICA CORREGIDA --- */}

          {/* Si NO es éxito, muestra el filtro y el formulario */}
          
              {/* 1. El bloque de "filtro de calidad" (UNA SOLA VEZ) */}
              <StaggeredEntryAnimation delay={0.2}>
                <div className="mb-16 max-w-3xl">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">Un filtro de calidad</h2>
                  <p className="text-lg sm:text-lg md:text-xl text-black mb-4">
                    Para garantizar la inmersión total y los resultados excepcionales que definen nuestro trabajo, 
                    nuestro equipo de especialistas solo acepta un <span className="font-semibold">número limitado de proyectos</span> simultáneamente.
                  </p>
                  <p className="text-lg sm:text-lg md:text-xl text-black font-semibold">
                    Nuestras colaboraciones de branding inician desde S/. 2,500 y las de desarrollo web desde S/. 3,500.
                    Actualmente, estamos agendando los últimos espacios para el próximo trimestre.
                  </p>
                </div>
              </StaggeredEntryAnimation>
              
              {/* 2. El formulario (con el delay corregido a 0.3) */}
              <StaggeredEntryAnimation delay={0.3}> {/* Delay 0.3 para que aparezca después del filtro */}
                <form 
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-16"
                  noValidate 
                >
                  
                  {/* --- Tu JSX de formulario (que ya estaba correcto) --- */}
                  <div className="form_field">
                    <label className="mb-6 block text-2xl font-semibold">
                      Estamos interesados en...
                    </label>
                    <div className="form_group flex flex-wrap gap-4">
                      {services.map(service => (
                        <AnimatedCheckbox 
                          key={service} 
                          label={service} 
                          name="services"
                          value={service} 
                          onChange={handleCheckboxChange}
                        />
                      ))}
                    </div>
                    <ErrorMessage name="services" />
                  </div>
                  
                  <div>
                    <AnimatedInput 
                      name="name"
                      placeholder="Nombre Completo" 
                      type="text" 
                      required 
                      hasError={!!errors.name}
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="name" />
                  </div>

                  <div>
                    <PhoneInput 
                      name="phone"
                      hasError={!!errors.phone}
                      value={formData.phone}
                      onChange={handlePhoneChange} 
                      onBlur={handlePhoneBlur}     
                    />
                    <ErrorMessage name="phone" />
                  </div>

                  <div>
                    <AnimatedInput 
                      name="email"
                      placeholder="Correo Electrónico" 
                      type="email" 
                      required 
                      hasError={!!errors.email}
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="email" />
                  </div>

                  <div>
                    <AnimatedInput 
                      isTextArea 
                      name="message" 
                      placeholder="Cuéntanos sobre tu proyecto" 
                      required
                      hasError={!!errors.message}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="message" />
                  </div>

                  <div className="form_field">
                    <label className="mb-6 block text-2xl font-semibold">
                      ¿Cuándo planeas iniciar?
                    </label>
                    <div className="form_group flex flex-wrap gap-4">
                      {timelines.map(timeline => (
                        <AnimatedRadio 
                          key={timeline} 
                          label={timeline} 
                          name="timeline"
                          value={timeline} 
                          onChange={handleChange}
                          checked={formData.timeline === timeline} 
                        />
                      ))}
                    </div>
                    <ErrorMessage name="timeline" />
                  </div>

                  <div className="form_field">
                    <label className="mb-6 block text-2xl font-semibold">
                      Añadir archivo adjunto
                    </label>
                    <FilepondInput />
                  </div>
                  
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
                  {/* --- Fin de tu JSX de formulario --- */}

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