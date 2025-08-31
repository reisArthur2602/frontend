import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import type { MenuConfigDays } from "@/http/menu/get-menus";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { OptionsMenuTab } from "./OptionsMenuTab";

interface IConfigMenuDialog {
  menu: {
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
  children: ReactNode;
}

export const ConfigMenuDialog = ({ children, menu }: IConfigMenuDialog) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=" !max-w-4xl">
        <DialogHeader>
          <DialogTitle>Configurar Menu de Atendimento</DialogTitle>
          <DialogDescription>
            Configure as opções do menu, horários de atendimento e outras
            configurações avançadas.
          </DialogDescription>
        </DialogHeader>
        <Tabs>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="basic">Configurações Básicas</TabsTrigger>
            <TabsTrigger value="options">Opções do Menu</TabsTrigger>
            <TabsTrigger value="schedule">Horários</TabsTrigger>
          </TabsList>

          <OptionsMenuTab menu_id={menu.id} options={menu.options} />

          <TabsContent value="schedule" className="space-y-4">
            Funcionamento
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
