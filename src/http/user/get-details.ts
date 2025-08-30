import { axiosConfig } from "@/lib/axios";

import { token } from "@/utils/token";

interface IGetDetailsResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const getDetails = async () => {
  const access_token = token.get();
  if (!access_token) return null;

  axiosConfig.defaults.headers["Authorization"] = `Bearer ${access_token}`;

  const { data } = await axiosConfig.get<IGetDetailsResponse>("/user/me");

  return data;
};
