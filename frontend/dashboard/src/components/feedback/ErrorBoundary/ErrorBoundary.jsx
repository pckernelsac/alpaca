import { Component } from 'react';
import Button from '@components/common/Button/Button';
import styles from './ErrorBoundary.module.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h2 className={styles.title}>Algo salió mal</h2>
          <p className={styles.description}>
            Ha ocurrido un error inesperado. Intenta recargar la página.
          </p>
          <div className={styles.actions}>
            <Button onClick={this.handleReset}>Reintentar</Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Recargar página
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}