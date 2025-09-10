import type { CreateMenuForm } from "@/components/CreateMenuForm";
import { axiosConfig } from "@/lib/axios";



export async function updateMenu(data: { id: string } & CreateMenuForm) {
  const response = await axiosConfig.put(`/menu/${data.id}`, data);
  return response.data;
}
