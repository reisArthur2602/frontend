import { axiosConfig } from "@/lib/axios";

export const getLeads = async () => {
  const { data } = await axiosConfig.get<Lead[] | []>("/lead");
  return data;
};
