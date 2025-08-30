import { getDetails } from "@/http/user/get-details";
import { UserStore } from "@/stores/user";
import { tokenUtils } from "@/utils/token";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DashboardLayout = () => {
  const { updateUser } = UserStore();
  const navigate = useNavigate();

  const handleLoadSessionUser = async () => {
    const access_token = tokenUtils.get();
    if (!access_token) return navigate("/");

    const response = await getDetails({ access_token });
    if (!response?.user) return navigate("/");

    updateUser(response.user);
  };

  useEffect(() => {
    handleLoadSessionUser();
  }, []);

  return (
    <div className="min-h-screen grid-cols-[240px_1fr]">
      <aside>...</aside> <main>main</main>
    </div>
  );
};
