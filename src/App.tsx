import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DashboardLayout } from "./components/layout/DashboardLayout";
import { SignLayout } from "./components/layout/SignLayout";

import { Toaster } from "sonner";
import { SocketProvider } from "./providers/Socket.tsx";
import { TanstackQueryProvider } from "./providers/TanstackQuery.tsx";

import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import WhatsAppPage from "./pages/WhatsApp";

import MenuPage from "./pages/Menu.tsx";
import LeadsPage from "./pages/Leads.tsx";

export const App = () => {
  return (
    <SocketProvider>
      <TanstackQueryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignLayout />}>
              <Route index element={<LoginPage />} />
              <Route
                path="register"
                caseSensitive={false}
                element={<RegisterPage />}
              />
            </Route>
            <Route path="*" element={<LoginPage />} />
          </Routes>

          <Routes>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route
                path="whatsapp"
                caseSensitive={false}
                element={<WhatsAppPage />}
              />
              <Route path="menu" caseSensitive={false} element={<MenuPage />} />
              <Route
                path="leads"
                caseSensitive={false}
                element={<LeadsPage />}
              />

              <Route path="*" element={<MenuPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster expand richColors theme="dark" />
      </TanstackQueryProvider>
    </SocketProvider>
  );
};
