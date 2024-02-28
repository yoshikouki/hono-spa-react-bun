# Hono SPA Application

[Hono](https://hono.dev/) SPA application with [React](https://react.dev/) on [Bun.sh](https://bun.sh/)

## Composition

- [Hono](https://hono.dev/)
- [React](https://react.dev/)
- [Bun.sh](https://bun.sh/)
- [Vite](https://ja.vitejs.dev/)

## Setup

```bash
git clone https://github.com/yoshikouki/hono-spa-react-bun.git
cd hono-spa-react-bun
bun install
```

## Dev

```bash
bun run dev
```

## For production

```bash
bun run build
rm -rf node_module && bun install --production
bun run serve
```

## WIP

- [ ] Run production server builds in Vite
