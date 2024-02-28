import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        rollupOptions: {
          input: "./src/client.tsx",
          output: {
            entryFileNames: "static/client.js",
          },
        },
      },
    };
  }

  return {
    ssr: {
      external: ["react", "react-dom"],
      noExternal: true,
    },
    build: {
      outDir: "dist",
      emptyOutDir: false,
      minify: false,
      ssr: true,
      rollupOptions: {
        external: ["react", "react-dom"],
        input: "./src/server.tsx",
        output: {
          entryFileNames: "server.js",
        },
      },
    },
    plugins: [
      devServer({
        entry: "src/server.tsx",
      }),
    ],
  };
});
