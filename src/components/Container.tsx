// EN: src/components/Container.tsx
import clsx from 'clsx';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string; // Esto nos permite pasar clases extra (como 'flex', 'text-center', etc.)
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={clsx(
      // Estas son las clases base de nuestro "container-large"
      "w-full max-w-6xl mx-auto px-6 md:px-8", 
      
      // Aquí se fusionan las clases extra que pasemos
      className 
    )}>
      {children}
    </div>
  );
};