import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  public componentDidMount() {
    // Check if there is an error during the initial render
    const { children } = this.props;
    if (React.Children.count(children) === 1) {
      this.setState({ hasError: true });
    }
  }

  public componentDidUpdate(prevProps: Props) {
    // Check if the children prop has changed
    if (prevProps.children !== this.props.children) {
      // Reset the error state
      this.setState({ hasError: false });
    }
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
