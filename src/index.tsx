import { reactRenderer } from "@hono/react-renderer";
import configureHotReload from "bun-hot-reload";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { App } from "./client";

const app = new Hono();

app.use("/static/*", serveStatic({ root: "public" }));

app.get("/api/clock", (c) => {
  return c.json({
    time: new Date().toLocaleTimeString(),
  });
});

app.get(
  "*",
  reactRenderer(({ children }) => {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            rel="stylesheet"
            href="https://cdn.simplecss.org/simple.min.css"
          />
          <script type="module" src="/static/client.js" />
        </head>
        <body>
          <main>{children}</main>
        </body>
      </html>
    );
  })
);

app.get("/", (c) => {
  return c.render(<App />);
});

const port = process.env.PORT || 3000;
console.log(`Listening on http://localhost:${port}`);

export default configureHotReload(
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
);
