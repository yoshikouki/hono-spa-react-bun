import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { renderToString } from 'react-dom/server';

const app = new Hono()

app.use("/static/*", serveStatic({ root: "public" }));

app.get('/api/clock', (c) => {
  return c.json({
    time: new Date().toLocaleTimeString()
  })
})

app.get('/', (c) => {
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            rel="stylesheet"
            href="https://cdn.simplecss.org/simple.min.css"
          />
          <script type="module" src="/static/client.js"></script>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  );
})

export default app;
