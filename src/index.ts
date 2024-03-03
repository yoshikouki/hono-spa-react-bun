import { serve } from "bun";
import configureHotReload from "bun-hot-reload";
import app from "./server";

const port = process.env.PORT || 3000;

console.log(`Listening on http://localhost:${port}`);

serve(
  configureHotReload(
    {
      port,
      fetch: app.fetch,
    },
    {
      buildConfig: {
        entrypoints: ["src/client.tsx"],
        outdir: "dist",
      },
    }
  )
);

