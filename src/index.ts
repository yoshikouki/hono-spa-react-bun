import { build, serve } from "bun";
import app from "./server";

const port = process.env.PORT || 3000;

console.log(`Listening on http://localhost:${port}`);

if (process.env.NODE_ENV !== "production") {
  build({
    entrypoints: ["src/client.tsx"],
    outdir: "public/static",
    minify: true,
    sourcemap: "external",
  });
  console.log("Builded!");
}

serve({
  port,
  fetch: app.fetch,
});

