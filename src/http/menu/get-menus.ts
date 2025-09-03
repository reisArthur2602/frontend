import { axiosConfig } from "@/lib/axios";

export type MenuConfigDays =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface IGetMenus {
  menus: Menu[];
}

export const getMenus = async () => {
  const { data } = await axiosConfig.get<IGetMenus>("/menu");
  return data;
};
