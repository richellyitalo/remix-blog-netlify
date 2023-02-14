import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import appStyles from "./styles/app.css";
import sharedStyles from "~/styles/shared.css";
import Error from "./components/admin/shared/Error";
import Code from "./components/admin/shared/Code";

export const meta = () => ({
  charset: "utf-8",
  title: "Blog with Remix",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => [
  {
    rel: "stylesheet",
    href: appStyles,
  },
  {
    rel: "stylesheet",
    href: sharedStyles,
  },
  {
    rel: "preconnect",
    crossOrigin: "true",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap",
  },
];

function Document({ children }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const catchData = useCatch();

  return (
    <Document>
      <Error title={catchData.statusText}>
        <Code>
          Catch from <b>"root.jsx"</b> file.
        </Code>
        <p>{catchData.data?.message || "Something went wrong"}</p>
      </Error>
    </Document>
  );
}

export function ErrorBoundary({error}) {
  return (
    <Document>
      <Error>
        <Code>
          ErrorBoundary on <b>"root.jsx"</b> file.
        </Code>
        <p>{error?.message || "Something went wrong"}</p>
      </Error>
    </Document>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
