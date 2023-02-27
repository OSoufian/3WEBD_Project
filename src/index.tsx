import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";

import App from "./App";
import Root from "./Root";
import * as rootModule from "./Root";
import ArtworkDetails from "./artworks/components/ArtworkDetails";

console.log(rootModule);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/artworks/:objectID",
        element: <ArtworkDetails />,
      },
      {
        path: "/about",
        element: (
          <div>
            <h1>About</h1>
            <div>
              La meilleure classe de l'école SUPINFO Campus Paris mais on se
              fait def H24
            </div>
          </div>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
