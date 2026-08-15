import React from 'react';
import { useProgress } from '@react-three/drei';

export function LoadingScreen() {
  const { progress, active, item } = useProgress();

  if (!active && progress === 100) return null;

  const displayProgress = Math.min(Math.round(progress), 100);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-spinner" />
        <h2 className="loading-title">Loading Manhattan Digital Twin</h2>
        <p className="loading-subtitle">
          Streaming optimized 3D geometry & shaders...
        </p>
        
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${displayProgress}%` }} 
          />
        </div>
        
        <div className="progress-text">
          {displayProgress}% {item ? `(${item.split('/').pop()})` : ''}
        </div>
      </div>
    </div>
  );
}
