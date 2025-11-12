// EN: src/components/forms/PhoneInput.tsx
'use client';

// --- 1. IMPORTAR 'forwardRef' y 'Ref' DE REACT ---
import React, { forwardRef, Ref } from 'react';
import 'react-phone-number-input/style.css'; 
import clsx from 'clsx';

// Importamos la librería como 'BasePhoneInput'
import BasePhoneInput, { 
  isValidPhoneNumber 
} from 'react-phone-number-input';

// Importa nuestro CSS personalizado
import './PhoneInput.css';

// --- 2. DEFINIR UN COMPONENTE DE INPUT ESTABLE ---
// Usamos forwardRef para que la librería pueda conectarse a nuestro <input>
const CustomInput = forwardRef(
  (props: React.InputHTMLAttributes<HTMLInputElement>, ref: Ref<HTMLInputElement>) => (
    <input 
      {...props} 
      ref={ref}
      autoFocus={false} // Mantenemos tu lógica de no auto-focus
    />
  )
);
// Asignar un nombre para depuración
CustomInput.displayName = 'CustomInput';

// --- La Interfaz (sin cambios) ---
interface CustomPhoneInputProps {
  value: string | undefined; 
  onChange: (value: string | undefined) => void; 
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  name: string;
}

// Exporta el validador (sin cambios)
export { isValidPhoneNumber };

// Exporta NUESTRO componente 'PhoneInput' (sin cambios)
export const PhoneInput = ({ 
  value, 
  onChange, 
  onBlur, 
  hasError, 
  name 
}: CustomPhoneInputProps) => {

  return (
    <div 
      className={clsx(
        "form_field phone-input-wrapper", 
        hasError && "has-error" 
      )}
    >
      <BasePhoneInput
        name={name}
        id={name}
        className="form_input"
        placeholder="WhatsApp"
        autoComplete="tel"
        defaultCountry="PE" 
        international
        withCountryCallingCode
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        
        // --- 3. PASAR EL COMPONENTE ESTABLE ---
        // Ya no es una función anónima.
        inputComponent={CustomInput}
      />
    </div>
  );
};