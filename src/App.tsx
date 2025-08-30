import { BrowserRouter, Route, Routes } from "react-router-dom";

import { TanstackReactQuery } from "./lib/tanstack-react-query";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { SignLayout } from "./components/layout/SignLayout";

import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import WhatsAppPage from "./pages/WhatsApp";
import { Toaster } from "sonner";

export const App = () => {
  return (
    <TanstackReactQuery>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>

        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="whatsapp" element={<WhatsAppPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster expand/>
    </TanstackReactQuery>
  );
};
