import React, { useState } from 'react';
import { 
  Compass, 
  RotateCcw, 
  Zap, 
  Info, 
  X, 
  Building2, 
  MousePointer, 
  Layers
} from 'lucide-react';

export function HUD({
  autoRotate,
  setAutoRotate,
  isHighQuality,
  setIsHighQuality,
  onResetCamera,
  selectedObject,
  setSelectedObject,
  hoveredObject
}) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="hud-overlay">
      {/* Header Banner */}
      <header className="hud-header">
        <div className="title-card glass-panel hud-interactive">
          <div className="title-badge">
            <Building2 size={14} />
            <span>S4DS 3D Digital Twin</span>
          </div>
          <h1 className="hud-title">Manhattan, NYC</h1>
          <p className="hud-subtitle">
            Interactive 3D urban environment powered by Three.js & WebGL
          </p>
        </div>

        <div className="header-actions hud-interactive">
          <button 
            className={`hud-btn ${autoRotate ? 'active' : ''}`}
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle Cinematic Orbit"
          >
            <Compass size={16} />
            <span>{autoRotate ? 'Stop Orbit' : 'Cinematic'}</span>
          </button>

          <button 
            className={`hud-btn ${!isHighQuality ? 'active' : ''}`}
            onClick={() => setIsHighQuality(!isHighQuality)}
            title="Toggle Quality/Performance"
          >
            <Zap size={16} />
            <span>{isHighQuality ? 'High Quality' : 'Performance'}</span>
          </button>

          <button 
            className="hud-btn"
            onClick={onResetCamera}
            title="Reset Camera View"
          >
            <RotateCcw size={16} />
            <span>Reset View</span>
          </button>

          <button 
            className="hud-btn"
            onClick={() => setShowInfo(!showInfo)}
            title="Project Info"
          >
            <Info size={16} />
          </button>
        </div>
      </header>

      {/* Info Modal Popup */}
      {showInfo && (
        <div className="glass-panel inspector-card hud-interactive" style={{ position: 'absolute', top: '5rem', right: '1.5rem', maxWidth: '340px' }}>
          <div className="inspector-header">
            <div className="title-badge">
              <Layers size={14} />
              <span>Project Details</span>
            </div>
            <button className="close-btn" onClick={() => setShowInfo(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="inspector-body">
            <p style={{ marginBottom: '0.5rem' }}>
              Optimized web application for S4DS Recruitment Task 2.
            </p>
            <div className="stat-row">
              <span className="stat-label">Original Asset Size</span>
              <span>507 MB</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Web Production Asset</span>
              <span style={{ color: '#38bdf8' }}>16.15 MB (-96.7%)</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Engine</span>
              <span>React Three Fiber</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar: Controls Help & Selected Object Inspector */}
      <footer className="hud-bottom">
        <div className="controls-help glass-panel hud-interactive">
          <div className="help-item">
            <span className="help-key">LMB</span>
            <span>Orbit</span>
          </div>
          <div className="help-item">
            <span className="help-key">RMB</span>
            <span>Pan</span>
          </div>
          <div className="help-item">
            <span className="help-key">Scroll</span>
            <span>Zoom</span>
          </div>
          {hoveredObject && (
            <div className="help-item" style={{ color: '#38bdf8', marginLeft: '0.5rem' }}>
              <MousePointer size={14} />
              <span>{hoveredObject}</span>
            </div>
          )}
        </div>

        {selectedObject && (
          <div className="inspector-card glass-panel hud-interactive">
            <div className="inspector-header">
              <span className="inspector-title">Object Inspector</span>
              <button className="close-btn" onClick={() => setSelectedObject(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="inspector-body">
              <div style={{ fontWeight: '600', color: '#f8fafc', marginBottom: '0.4rem' }}>
                {selectedObject.name}
              </div>
              <div className="stat-row">
                <span className="stat-label">Mesh Type</span>
                <span>{selectedObject.type}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Triangles</span>
                <span>{selectedObject.triangleCount.toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Vertices</span>
                <span>{selectedObject.vertexCount.toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Position (X,Y,Z)</span>
                <span>{selectedObject.position.join(', ')}</span>
              </div>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}
