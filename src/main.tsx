import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";

document.documentElement.classList.add("dark");
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <AppRoutes />
    </StrictMode>
  </BrowserRouter>
);
