import { axiosConfig } from "@/lib/axios";

interface IGetDetailsResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const getDetails = async ({
  access_token,
}: {
  access_token: string;
}) => {
  if (!access_token) return null;

  axiosConfig.defaults.headers["Authorization"] = `Bearer ${access_token}`;

  const { data } = await axiosConfig.get<IGetDetailsResponse>("/user/me");

  return data;
};
