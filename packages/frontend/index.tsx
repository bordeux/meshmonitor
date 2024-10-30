import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "nprogress/nprogress.css";
import App from "./App.tsx";
import { SidebarProvider } from "./contexts/SidebarContext";
import * as serviceWorker from "./serviceWorker";
import "./sentry";
import "./i18n";

(async () => {
  const Router = location.protocol.startsWith("http")
    ? BrowserRouter
    : HashRouter;
  const container = document.getElementById("root");
  const root = createRoot(container as any);
  root.render(
    <HelmetProvider>
      <SidebarProvider>
        <Router>
          <App />
        </Router>
      </SidebarProvider>
    </HelmetProvider>,
  );

  serviceWorker.unregister();
})();
