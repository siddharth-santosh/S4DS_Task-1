import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D World ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback-container">
          <div className="error-fallback-card">
            <div className="error-icon-wrapper">
              <AlertTriangle size={48} className="error-icon" />
            </div>
            <h2>Unable to Initialize 3D Engine</h2>
            <p>
              An unexpected error occurred while loading the 3D environment or WebGL context.
            </p>
            {this.state.error?.message && (
              <div className="error-message-box">
                <code>{this.state.error.message}</code>
              </div>
            )}
            <button className="error-retry-btn" onClick={this.handleReload}>
              <RefreshCw size={18} />
              Reload Experience
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
