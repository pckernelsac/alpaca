import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error, info);
    }
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div style={{ padding: 24, textAlign: 'center' }}>
          <h3>Algo salió mal</h3>
          <p style={{ color: '#888' }}>{this.state.error?.message || 'Error inesperado'}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>Reintentar</button>
        </div>
      );
    }
    return this.props.children;
  }
}
