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
