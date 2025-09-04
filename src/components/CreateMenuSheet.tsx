import type { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { CreateMenuForm } from "./CreateMenuForm";
import { ScrollArea } from "./ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";
import { CreateOptionDialog } from "./CreateOptionDialog";
import { Badge } from "./ui/badge";

interface ICreateMenuSheet {
  children: ReactNode;
  menu?: Menu;
}

export const CreateMenuSheet = ({ children, menu }: ICreateMenuSheet) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="!max-w-2xl ">
        <SheetHeader className="p-4">
          <SheetTitle>Novo Menu</SheetTitle>
          <SheetDescription>
            Configure as opções e comportamento do menu de atendimento
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="min-h-0 p-6 pt-0 ">
          <CreateMenuForm menu={menu} />
          {menu && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Opções do Menu</CardTitle>
                    <CardDescription>
                      Configure as opções disponíveis para os usuários
                    </CardDescription>
                  </div>
                  <CreateOptionDialog menu_id={menu.id}>
                    <Button size="sm" type="button">
                      <Plus />
                      Adicionar Opção
                    </Button>
                  </CreateOptionDialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {menu.options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center  p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{option.trigger}</Badge>
                          <span className="font-medium">{option.label}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ação: {option.action.replace("_", " ")}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
