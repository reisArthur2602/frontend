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
    <main className="min-h-dvh grid grid-cols-1 lg:grid-cols-2">
      <aside className="flex items-center justify-center p-6">
        <Outlet />
      </aside>
      <aside className="p-8 hidden lg:block">
        <div className="relative size-full rounded-2xl overflow-hidden bg-background">
          <div className="absolute inset-0 bg-auth-gradient" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/30 to-transparent" />
        </div>
      </aside>
    </main>
  );
};
