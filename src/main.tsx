import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { TanstackReactQuery } from "./lib/tanstack-react-query";

import { Toaster } from "sonner";
import "./index.css";

document.documentElement.classList.add("dark");
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <TanstackReactQuery>
      <StrictMode>
        <Toaster />
        <AppRoutes />
      </StrictMode>
    </TanstackReactQuery>
  </BrowserRouter>
);
