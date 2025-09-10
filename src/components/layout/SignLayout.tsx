import { tokenUtils } from "@/utils/token";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const SignLayout = () => {
  const access_token = tokenUtils.get();
  const navigate = useNavigate();

  useEffect(() => {
    if (access_token) navigate("/dashboard");
  }, [access_token, navigate]);

  return (
    <main className="min-h-dvh grid grid-cols-1 ">
      <div className="flex items-center justify-center p-6">
        <Outlet />
      </div>
    </main>
  );
};
