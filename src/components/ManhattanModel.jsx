import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function ManhattanModel({ onSelectObject, setHoveredObject }) {
  const { scene } = useGLTF('/models/manhattan_optimized.glb');

  // Apply material optimizations
  const processedScene = useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = 0.6;
          child.material.metalness = 0.2;
        }
      }
    });
    return scene;
  }, [scene]);

  const handlePointerOver = (e) => {
    e.stopPropagation();
    if (e.object && e.object.isMesh) {
      setHoveredObject(e.object.name || 'Building Mesh');
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHoveredObject(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (e.object && e.object.isMesh) {
      const mesh = e.object;
      const vertexCount = mesh.geometry?.attributes?.position?.count || 0;
      const triangleCount = mesh.geometry?.index ? mesh.geometry.index.count / 3 : vertexCount / 3;
      
      onSelectObject({
        name: mesh.name || 'Building Mesh',
        type: mesh.type,
        vertexCount: Math.round(vertexCount),
        triangleCount: Math.round(triangleCount),
        material: mesh.material?.name || 'Standard Material',
        position: [
          mesh.position.x.toFixed(2),
          mesh.position.y.toFixed(2),
          mesh.position.z.toFixed(2),
        ]
      });
    }
  };

  return (
    <primitive
      object={processedScene}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  );
}

useGLTF.preload('/models/manhattan_optimized.glb');
