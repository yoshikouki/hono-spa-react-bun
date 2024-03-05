import { Suspense, useState } from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="stylesheet"
          href="https://cdn.simplecss.org/simple.min.css"
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export function App() {
  return (
    <>
      <h1>Hello, Hono with React on Bun!!1</h1>
      <h2>Example of useState()</h2>
      <Counter />
      <h2>Example of API fetch()</h2>
      <ClockButton />
      <h2>Example of Suspense Component</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <SlowComponent />
      </Suspense>
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)} type="button">
      You clicked me {count} times
    </button>
  );
}

const ClockButton = () => {
  const [response, setResponse] = useState<string | null>(null);

  const handleClick = async () => {
    const response = await fetch("/api/clock");
    const data = await response.json();
    const headers = Array.from(response.headers.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );
    const fullResponse = {
      url: response.url,
      status: response.status,
      headers,
      body: data,
    };
    setResponse(JSON.stringify(fullResponse, null, 2));
  };

  return (
    <div>
      <button onClick={handleClick} type="button">
        Get Server Time
      </button>
      {response && <pre>{response}</pre>}
    </div>
  );
};

let result = false;
const SlowComponent = () => {
  if (result === false) {
    throw new Promise<void>((resolve) => {
      setTimeout(() => {
        result = true;
        resolve();
      }, 3000);
    });
  }
  return <p>Loaded!</p>;
};
