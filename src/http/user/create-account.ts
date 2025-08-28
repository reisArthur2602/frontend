import { axiosConfig } from "@/lib/axios";

interface ICreateAccount {
  name: string;
  email: string;
  password: string;
}

export const createAccount = async ({
  name,
  email,
  password,
}: ICreateAccount) => {
  await axiosConfig.post("/user/create", { name, password, email });
};
