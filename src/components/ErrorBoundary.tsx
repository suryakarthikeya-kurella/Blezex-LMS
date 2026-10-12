import { Component, ReactNode } from "react";
export default class ErrorBoundary extends Component<{ children: ReactNode }, { err?: Error }> {
  state: { err?: Error } = {};
  static getDerivedStateFromError(err: Error) { return { err }; }
  render() {
    if (!this.state.err) return this.props.children;
    return <div className="p-8 max-w-md mx-auto"><h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-sm my-2">{this.state.err.message}</p><button className="btn" onClick={() => location.reload()}>Reload</button></div>;
  }
}
