import { axiosConfig } from "@/lib/axios";

interface ICreateMenu {
  name: string;
  message: string;
  keywords: string[];
}

export const createMenu = async ({ name, message, keywords }: ICreateMenu) => {
  await axiosConfig.post("/menu/create", { name, message, keywords });
};
