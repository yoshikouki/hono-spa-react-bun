import { build, serve } from "bun";
import { watch } from "fs";
import app from "./server";

const port = process.env.PORT || 3000;

console.log(`Listening on http://localhost:${port}`);

const buildClient = () => {
  build({
    entrypoints: ["src/client.tsx"],
    outdir: "public/static",
    minify: true,
    sourcemap: "external",
  })
  console.log("Builded!");
};

if (process.env.NODE_ENV !== "production") {
  await buildClient();
  watch("src/client.tsx", {}, buildClient);
}

serve({
  port,
  fetch: app.fetch,
});

