import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card m-3 p-4 text-center">
          <h1>An error has occured.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
