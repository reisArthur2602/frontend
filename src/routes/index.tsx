import { CreateAccountPage } from "@/pages/create-account";
import { SignPage } from "@/pages/sign";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/sign">
        <Route index element={<SignPage />} />
        <Route path="create-account" element={<CreateAccountPage />} />
      </Route>
    </Routes>
  );
};
