import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="d-flex vh-100 align-items-center justify-content-center">
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-danger mb-4">
              {this.state.error.message || 'Something went wrong!'}
            </h3>
            <a href={window.location} className="btn btn-primary btn-block">Reload Page</a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
