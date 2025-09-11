import { axiosConfig } from "@/lib/axios";
import { tokenUtils } from "@/utils/token";

interface IGetDetailsResponse {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export const getDetails = async ({
  access_token,
}: {
  access_token: string;
}) => {
  try {
    if (!access_token) return null;

    axiosConfig.defaults.headers["Authorization"] = `Bearer ${access_token}`;

    const { data } = await axiosConfig.get<IGetDetailsResponse>("/user/me");

    return data;
  } catch (error) {
    tokenUtils.destroy();
    return null;
  }
};
