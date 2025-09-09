import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState, type ReactNode } from "react";
import { Input } from "./ui/input";
import SelectOptionActionField from "./SelectOptionActionField";
import { Button } from "./ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOption } from "@/http/option/create-option";
import { toast } from "sonner";

const createOptionSchema = z.object({
  trigger: z.string().min(1, "O gatilho deve ser um número válido."),
  label: z.string().min(1, "O rótulo é obrigatório"),
  payload: z.any(),
  action: z.string<MenuOptionAction>(),
});

type CreateOptionForm = z.infer<typeof createOptionSchema>;

interface ICreateOptionDialog {
  children: ReactNode;
  menu_id: string;
}
export const CreateOptionDialog = ({
  children,
  menu_id,
}: ICreateOptionDialog) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<CreateOptionForm>({
    resolver: zodResolver(createOptionSchema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync: createOptionFn } = useMutation({
    mutationFn: createOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-options"] });
      toast.success("🎯 A Opção foi adicionada com sucesso!");
      form.reset();
      setOpen(false);
    },
    onError: (error: ErrorResponse) => {
      error.map((err) => toast.error(err.message));
    },
  });

  const onSubmit = async (data: CreateOptionForm) => {
    console.log(data);
    await createOptionFn({ ...data, menu_id });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Opção</DialogTitle>
          <DialogDescription>
            Configure o comportamento desta opção do menu
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="trigger"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gatilho *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rótulo *</FormLabel>
                    <FormControl>
                      <Input placeholder="Rótulo" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SelectOptionActionField />
            <Button className="w-full">Salvar Opção</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
