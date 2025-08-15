"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Link from "next/link";
import { FaExclamationTriangle, FaHome, FaSync } from "react-icons/fa";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  section?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6">
              <FaExclamationTriangle className="text-6xl text-red-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">
                Something went wrong
              </h2>
              <p className="text-text-secondary">
                {this.props.section 
                  ? `There was an error loading the ${this.props.section} section.` 
                  : "An unexpected error occurred."
                }
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 bg-secondary-default hover:bg-secondary-default/80 text-black font-medium px-6 py-3 rounded-lg transition-colors"
              >
                <FaSync className="text-sm" />
                Try Again
              </button>
              
              <div className="text-sm text-text-secondary">
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 text-secondary-default hover:text-secondary-default/80 transition-colors"
                >
                  <FaHome className="text-sm" />
                  Return to Home
                </Link>
              </div>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-text-secondary cursor-pointer hover:text-white">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 p-4 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-300 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;