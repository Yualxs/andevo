// EN: src/components/MascotScene.tsx
'use client';

import { useGLTF } from '@react-three/drei';
import React from 'react';

// Asegúrate de que esta ruta sea correcta
useGLTF.preload('/models/mascota.glb'); 

export const MascotScene = () => {
  // Carga el modelo .glb
  const { scene } = useGLTF('/models/mascota.glb');

  // Clonamos y devolvemos la escena
  // (Esta es la forma más robusta de cargar)
  return <primitive object={scene.clone()} />;
};