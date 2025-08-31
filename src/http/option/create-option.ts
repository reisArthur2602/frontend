import { axiosConfig } from "@/lib/axios";

interface ICreateOptions {
  options: {
    trigger: string;
    label: string;
    reply_text?: string;
    action: "auto_reply" | "redirect_queue" | "end_session";
    menu_id: string;
  }[];
}

export const createOption = async ({ options }: ICreateOptions) => {
  await axiosConfig.post("/menu/option/create", { options });
};
