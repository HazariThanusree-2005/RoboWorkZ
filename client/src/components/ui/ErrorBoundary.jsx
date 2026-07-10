import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center">
          <p className="text-sm text-zinc-400 mb-2">3D scene could not be loaded</p>
          <span className="text-xs text-zinc-500">(Your browser may have WebGL disabled or unsupported)</span>
        </div>
      );
    }

    return this.props.children;
  }
}
