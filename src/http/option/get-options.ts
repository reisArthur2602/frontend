import { axiosConfig } from "@/lib/axios";

export const getOptions = async ({ menu_id }: { menu_id: string }) => {
  const { data } = await axiosConfig.get<MenuOption[] | []>(
    `/menu/option/${menu_id}`
  );

  return data;
};
