import { axiosConfig } from "@/lib/axios";

interface ICreateSession {
  email: string;
  password: string;
}

interface ICreateSessionResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  accessToken: string;
}

export const createSession = async ({ email, password }: ICreateSession) => {
  const { data } = await axiosConfig.post<ICreateSessionResponse>(
    "/user/session",
    {
      password,
      email,
    }
  );

  return data;
};
