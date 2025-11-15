// EN: src/components/DynamicMascotViewer.tsx
'use client'; 

import dynamic from 'next/dynamic';

const MascotViewer = dynamic(() => 
  import('@/components/MascotViewer').then(mod => mod.MascotViewer),
  { 
    ssr: false, 
    // Asegúrate de que el placeholder tenga altura
    loading: () => <div className="w-full h-64 md:h-96" /> 
  } 
);

export const DynamicMascotViewer = () => {
  return <MascotViewer />;
};