import { serve } from "bun";
import { serveStatic } from "hono/bun";
import app from "../src/server";

const port = process.env.PORT || 3000;

app.use("/static/client.js", serveStatic({ root: "dist" }));
app.use("/static/*", serveStatic({ root: "public" }));

console.log(`Listening on http://localhost:${port}`);

serve({
    port,
    fetch: app.fetch
})
