type ErrorResponse = { message: string }[] | [];

type Message = {
  id: string;
  created_at: Date;
  text: string;
  from: "customer" | "menu" | "agent";
  leadId: string;
};

type Lead = {
  id: string;
  name: string | null;
  state: "idle" | "await_option" | "in_queue" | "in_service";
  phone: string;
  messages: Message[];
  menu_id: string | null;
  created_at: Date;
  updated_at: Date;
};

type Status = "pending" | "active";
