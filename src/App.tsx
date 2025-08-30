import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/Register";

import { TanstackReactQuery } from "./lib/tanstack-react-query";
import { LoginPage } from "./pages/Login";
import { SignLayout } from "./components/layout/SignLayout";

export const App = () => {
  return (
    <BrowserRouter>
      <TanstackReactQuery>
        <Routes>
          <Route path="/" element={<SignLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </TanstackReactQuery>
    </BrowserRouter>
  );
};
