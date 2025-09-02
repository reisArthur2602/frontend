type ErrorResponse = { message: string }[] | [];

type Message = {
  id: string;
  
  text: string;
  from: "customer" | "menu" | "agent";
  leadId: string;
  created_at: string;
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

type SendMessage = {
  phone: string;
  text: string;
};

type Status = "pending" | "active";
