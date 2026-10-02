import { spaceQueryClient } from "@hatch/space-sdk/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Component, StrictMode, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./theme.css";

function readableError(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return "An unknown rendering error occurred.";
}

class AppErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean; message: string }> {
  override state = { failed: false, message: "" };

  static getDerivedStateFromError(error: unknown) {
    return { failed: true, message: readableError(error) };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Chat interface could not render", error, info.componentStack);
  }

  override render() {
    if (this.state.failed) {
      return <main className="center-state startup-error" role="alert">
        <h1>Let’s get you back on air</h1>
        <p>The chat interface hit a problem. Reload the page, then share the detail below if it happens again.</p>
        <code>{this.state.message}</code>
        <button className="primary-button" onClick={() => window.location.reload()}>Try again</button>
      </main>;
    }
    return this.props.children;
  }
}

class StartupReady extends Component {
  override componentDidMount() {
    window.__chatStartupReady?.();
  }

  override render() {
    return null;
  }
}

let rootEl = document.querySelector<HTMLElement>("[data-generated-space-root]");
if (!rootEl) {
  rootEl = document.createElement("div");
  rootEl.dataset.generatedSpaceRoot = "";
  document.body.appendChild(rootEl);
}

try {
  // Keep QueryClientProvider around the app, and keep both root hooks on the
  // outer div so the host can apply safe-area and viewport rules.
  createRoot(rootEl).render(
    <StrictMode>
      <QueryClientProvider client={spaceQueryClient}>
        <div className="hatch-space-root" data-hatch-space-root>
          <AppErrorBoundary>
            <StartupReady />
            <App />
          </AppErrorBoundary>
        </div>
      </QueryClientProvider>
    </StrictMode>,
  );
} catch (error) {
  console.error("Chat interface could not start", error);
  window.__chatStartupFail?.(error);
}
