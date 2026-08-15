import React, { useState, useCallback } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingScreen } from './components/LoadingScreen';
import { Scene } from './components/Scene';
import { HUD } from './components/HUD';
import './App.css';

function App() {
  const [autoRotate, setAutoRotate] = useState(false);
  const [isHighQuality, setIsHighQuality] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [selectedObject, setSelectedObject] = useState(null);
  const [hoveredObject, setHoveredObject] = useState(null);

  const handleResetCamera = useCallback(() => {
    setResetTrigger((prev) => prev + 1);
    setSelectedObject(null);
  }, []);

  return (
    <ErrorBoundary>
      <div className="app-container">
        {/* Real Loading Screen driven by R3F progress */}
        <LoadingScreen />

        {/* 3D Scene */}
        <Scene
          autoRotate={autoRotate}
          isHighQuality={isHighQuality}
          resetTrigger={resetTrigger}
          onSelectObject={setSelectedObject}
          hoveredObject={hoveredObject}
          setHoveredObject={setHoveredObject}
        />

        {/* Glassmorphism HUD Controls & Inspector */}
        <HUD
          autoRotate={autoRotate}
          setAutoRotate={setAutoRotate}
          isHighQuality={isHighQuality}
          setIsHighQuality={setIsHighQuality}
          onResetCamera={handleResetCamera}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
          hoveredObject={hoveredObject}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
