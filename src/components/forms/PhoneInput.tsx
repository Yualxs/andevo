'use client';

import React, { useEffect, useRef } from 'react'; // <-- Quitamos 'useState'
// 1. Importa el CSS de la librería
import 'intl-tel-input/build/css/intlTelInput.min.css';
// 2. Importa el JS de la librería
import intlTelInput from 'intl-tel-input'; 
import clsx from 'clsx';
import './PhoneInput.css'; // Mantenemos el CSS personalizado

// --- 1. AÑADE ESTA PROP A LA INTERFAZ ---
interface PhoneInputProps {
  onInstanceReady: (instance: any) => void;
}

export const PhoneInput = ({ onInstanceReady }: PhoneInputProps) => { // <-- 2. RECIBE LA PROP
  const inputRef = useRef<HTMLInputElement>(null);
  // Ya no necesitamos el 'useState'

  // 3. COMBINAMOS LOS DOS HOOKS EN UNO
  useEffect(() => {
    if (!inputRef.current) {
      return; // Salir si el input no está listo
    }

    const inputElement = inputRef.current;
    let iti: any = null; // Variable para guardar la instancia

    // 4. PRIMERO: Buscamos la IP
    fetch('https://ip-api.com/json/?fields=countryCode')
      .then(res => res.json())
      .then(data => {
        // Si la API trae un countryCode, lo usamos. Si no, usamos 'pe'.
        const countryCode = data.countryCode ? data.countryCode.toLowerCase() : 'pe';
        
        // 5. SEGUNDO: Inicializamos la librería DENTRO del .then()
        const options = {
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          preferredCountries: ["pe", "us", "es", "mx"],
          initialCountry: countryCode, // <-- Usamos el código de país que encontramos
          dropdownContainer: document.body,
        };
        iti = intlTelInput(inputElement, options as any);

        onInstanceReady(iti); // <-- AÑADE ESTA LÍNEA

      })
      .catch(err => {
        // 6. FALLBACK: Si el fetch falla (ej. Adblocker), inicializa con 'pe'
        console.error("Error fetching IP info, defaulting to 'pe':", err);
        const options = {
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          preferredCountries: ["pe", "us", "es", "mx"],
          initialCountry: 'pe', 
          dropdownContainer: document.body,
        };
        iti = intlTelInput(inputElement, options as any);

        onInstanceReady(iti); // <-- AÑADE ESTA LÍNEA TAMBIÉN
      });

    // 7. Limpieza
    return () => {
      // Usamos 'iti' (que se definió arriba) para destruir la instancia
      if (iti) {
        iti.destroy();
      }
    };
  }, [onInstanceReady]); // <-- AÑADE 'onInstanceReady' A LAS DEPENDENCIAS

  return (
    // 'group' y 'overflow-hidden' son claves
    <div className="form_field group relative overflow-hidden"> 
      
      {/* Este es un input HTML simple */}
      <input
        ref={inputRef}
        type="tel"
        name="Phone"
        id="Phone"
        className="form_input text-size-medium w-input block w-full border-0 bg-transparent py-4 text-3xl text-black outline-none placeholder:text-black/30 focus:ring-0"
        placeholder="WhatsApp"
        autoComplete="tel"
        required
      />
      
      {/* La línea animada */}
      <div 
        className={clsx(
          "form_line pointer-events-none absolute bottom-0 left-0 right-0 z-1 h-[60px] w-[300%] bg-contain bg-bottom bg-no-repeat opacity-10",
          "transition-transform,opacity duration-500 ease-[cubic-bezier(0,0.25,0.5,1)]",
          "translate-x-[-66.66%]",
          "group-focus-within:translate-x-0 group-focus-within:opacity-100"
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 60' preserveAspectRatio='none'%3E%3Cpath fill='none' stroke='%23000' d='M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5C893.995,56.5,1200,56.5,1200,56.5'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};