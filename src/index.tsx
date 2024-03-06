import { reactRenderer } from "@hono/react-renderer";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { App, Layout } from "./app";

const app = new Hono();

app.use(logger());
app.get("/src/client.tsx", async (c) => {
  const url = new URL(c.req.url);
  const file = await Bun.build({
    entrypoints: [`${process.cwd()}${url.pathname}`],
  });
  return new Response(file.outputs[0], {
    headers: {
      "content-type": "application/javascript",
    },
  });
});
app.use("/static/*", serveStatic({ root: "public" }));
app.get("/api/clock", (c) => {
  return c.json({
    time: new Date().toLocaleTimeString(),
  });
});

app.get(
  "*",
  reactRenderer(Layout, {
    stream: true,
  })
);

app.get("/", (c) => {
  return c.render(<App />);
});

const port = process.env.PORT || 3000;
console.log(`Listening on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
