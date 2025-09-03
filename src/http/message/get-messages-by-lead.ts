import { axiosConfig } from "@/lib/axios";

export const getMessagesByPhone = async ({ phone }: { phone: string }) => {
  const { data } = await axiosConfig.get<Message[] | []>(`/message/${phone}`);

  return { messages: data };
};
