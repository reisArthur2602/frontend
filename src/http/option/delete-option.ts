import { axiosConfig } from "@/lib/axios";

interface IDeleteOption {
  option_id: string;
}

export const deleteOption = async ({ option_id }: IDeleteOption) => {
  await axiosConfig.delete(`/menu/option/${option_id}`);
};
