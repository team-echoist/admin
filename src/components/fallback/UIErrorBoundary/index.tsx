import { Component, ErrorInfo, ReactNode } from "react";

import ErrorFallback from "../ErrorFallback";

interface UIErrorBoundaryProps {
  children: ReactNode;
}

interface UIErrorBoundaryState {
  hasError: boolean;
}

class UIErrorBoundary extends Component<
  UIErrorBoundaryProps,
  UIErrorBoundaryState
> {
  constructor(props: UIErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): UIErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("에러 발생:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

export default UIErrorBoundary;
