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
  menus:
    | {
        id: string;
        name: string;
        message: string;
        keywords: string[];
        active: boolean;
        config: {
          id: string;
          start_time: string;
          end_time: string;
          days: MenuConfigDays[];
          default_message_out_of_time: string | null;
          default_message_out_of_date: string | null;
          created_at: string;
          updated_at: string;
        };
        options: {
          id: string;
          trigger: number;
          label: string;
          replyText?: string;
          action: "auto_reply" | "redirect_queue" | "end_session";
          menu_id: string;
          created_at: string;
          updated_at: string;
        }[];
        created_at: string;
        updated_at: string;
      }[]
    | [];
}

export const getMenus = async () => {
  const { data } = await axiosConfig.get<IGetMenus>("/menu");
  return data;
};
