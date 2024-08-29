"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Html } from '@react-three/drei';
import "../../sass/heartModel.scss";

function HeartModel({ setSelectedOrgan }) {
  const { scene } = useGLTF('/assets/models/heart.glb');
  
  return (
    <group>
      <primitive 
        object={scene} 
        scale={4.0}
        onClick={() => setSelectedOrgan('heart')}
      />
      <Html position={[1, 1, 0]}>
        <div className="tooltip">Left Ventricle</div>
      </Html>
      <Html position={[-1, 1, 0]}>
        <div className="tooltip">Right Ventricle</div>
      </Html>
      {/* Add more tooltips as needed */}
    </group>
  );
}

export default function HeartModelComponent({ setSelectedOrgan }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <HeartModel setSelectedOrgan={setSelectedOrgan} />
        <OrbitControls enablePan={false} />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}