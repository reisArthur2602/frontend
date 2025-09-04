import { axiosConfig } from "@/lib/axios";

interface IDeleteMenu {
  menu_id: string;
}

export const deleteMenu = async ({ menu_id }: IDeleteMenu) => {
  await axiosConfig.delete(`/menu/${menu_id}`);
};
