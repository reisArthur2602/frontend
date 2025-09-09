import { useState, type ReactNode } from "react";
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
import { deleteOption } from "@/http/option/delete-option";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getOptions } from "@/http/option/get-options";

interface ICreateMenuSheet {
  children: ReactNode;
  menu?: Menu;
}

export const CreateMenuSheet = ({ children, menu }: ICreateMenuSheet) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);

  const isEditing = !!menu;

  const queryClient = useQueryClient();

  const { data: options } = useQuery({
    queryKey: ["get-options", menu?.id],
    enabled: !!menu?.id && open,
    queryFn: () => getOptions({ menu_id: menu!.id }),
    refetchInterval: 20000,
  });

  const { mutateAsync: deleteOptionFn } = useMutation({
    mutationFn: ({ option_id }: { option_id: string }) =>
      deleteOption({ option_id }),
    onSuccess: (_data, variables) => {
      const { option_id } = variables;
      const previousMenus = queryClient.getQueryData<Menu[]>(["get-menus"]);

      if (previousMenus) {
        const updatedMenus = previousMenus.map((m) => ({
          ...m,
          options: (m.options || []).filter(
            (option) => option.id !== option_id
          ),
        }));

        queryClient.setQueryData(["get-menus"], updatedMenus);
      }

      queryClient.invalidateQueries({ queryKey: ["get-options", menu?.id] });

      toast.success("📩 A opção foi deletada com sucesso!");
    },

    onError: (error: ErrorResponse) => {
      if (Array.isArray(error)) {
        error.forEach((err) => toast.error(err.message));
      } else {
        toast.error("Erro ao deletar a opção.");
      }
    },
  });

  const onDeleteOption = async (option_id: string) =>
    await deleteOptionFn({ option_id });

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="!max-w-4xl ">
        <SheetHeader className="p-8 ">
          <SheetTitle>{isEditing ? "Editar Menu" : "Novo Menu"}</SheetTitle>
          <SheetDescription>
            Configure as opções e comportamento do menu de atendimento
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="min-h-0 px-8">
          <CreateMenuForm menu={menu} handleClose={handleClose} />

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

              {options && options.length > 0 && (
                <CardContent>
                  <div className="space-y-3">
                    {options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{option.trigger}</Badge>
                            <span className="font-medium">{option.label}</span>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          type="button"
                          className="hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => onDeleteOption(option.id)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
