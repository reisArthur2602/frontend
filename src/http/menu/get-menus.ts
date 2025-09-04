import { axiosConfig } from "@/lib/axios";

export const getMenus = async () => {
  const { data } = await axiosConfig.get<Menu[] | []>("/menu");
  return data;
};
