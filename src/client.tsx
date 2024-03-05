import { hydrateRoot } from "react-dom/client";
import { App, Layout } from "./app";

hydrateRoot(
  document,
  <Layout>
    <App />
  </Layout>
);
console.log("Hydrated!");
