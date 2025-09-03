type ErrorResponse = { message: string }[] | [];

type Message = {
  text: string;
  from: "customer" | "menu" | "agent";
  created_at: string;
};

type Lead = {
  id: string;
  name: string | null;
  phone: string;
  state: $Enums.LeadState;
  lastMessage: {
    created_at: string;
    text: string;
  } | null;
  count: number;
};

type SendMessage = {
  phone: string;
  text: string;
};

type Status = "pending" | "active";

type Menu = {
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
};
