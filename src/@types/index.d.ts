/* eslint-disable @typescript-eslint/no-explicit-any */
type ErrorResponse = { message: string }[] | [];

type Status = "pending" | "connected" | "connecting";

type MenuOptionAction = "auto_reply" | "forward_to_number" | "redirect_queue";

type MenuOption = {
  id: string;
  label: string;
  trigger: string;
  menu_id: string;
  payload: any;
  action: MenuOptionAction;
  created_at: Date;
  updated_at: Date;
};

type Menu = {
  id: string;
  name: string;
  message: string;
  keywords: string[];
  active: boolean;
  options: MenuOption[] | [];
  created_at: string;
  updated_at: string;
};

type Lead = {
  id: string;
  name: string | null;
  phone: string;
  created_at: Date;
  updated_at: Date;
  matches: {
    id: string;
    message: string;
    created_at: Date;
    updated_at: Date;
    menu_id: string;
    lead_phone: string;
  }[];
};
