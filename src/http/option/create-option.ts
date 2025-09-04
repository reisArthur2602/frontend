/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosConfig } from "@/lib/axios";

interface ICreateOption {
  trigger: string;
  label: string;
  payload: any;
  action: MenuOptionAction;
  menu_id: string;
}

export const createOption = async (data: ICreateOption) => {
  await axiosConfig.post("/menu/option/create", data);
};
