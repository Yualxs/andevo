// EN: src/components/MascotScene.tsx
'use client';

import { useGLTF } from '@react-three/drei';
import React from 'react';

// 1. Apunta al nuevo archivo optimizado
useGLTF.preload('/models/mascota-opt.glb'); 

export const MascotScene = () => {
  // 2. Carga el nuevo archivo optimizado
  const { scene } = useGLTF('/models/mascota-opt.glb');

  return <primitive object={scene.clone()} />;
};