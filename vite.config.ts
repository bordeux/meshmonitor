import { defineConfig, ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";

const ConfigServer = () => ({
  name: "config-server",
  configureServer(server: ViteDevServer) {
    server.middlewares.use("/config.js", (_, res) => {
      const appEnv: Record<string, string | undefined> = {};
      for (const [envName, envValue] of Object.entries(process.env)) {
        if (!envName.startsWith("REACT_")) {
          continue;
        }
        appEnv[envName] = envValue;
      }
      res.setHeader("Content-Type", "application/javascript");
      res.end(`const APP_ENV = ${JSON.stringify(appEnv)}`);
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist/frontend",
  },
  plugins: [react(), ConfigServer()],
});
