import z from "zod";
import KeywordsField from "./KeywordsField";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMenu } from "@/http/menu/create-menu";

import { toast } from "sonner";
import { updateMenu } from "@/http/menu/update-menu";

const createMenuSchema = z.object({
  keywords: z.array(
    z
      .string({ message: "A palavra-chave é obrigatória." })
      .trim()
      .min(2, { message: "A palavra-chave deve ter pelo menos 2 caracteres." })
  ),
  name: z
    .string({ message: "O nome é obrigatório." })
    .trim()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  message: z
    .string({ message: "A mensagem é obrigatória." })
    .trim()
    .min(2, { message: "A mensagem deve ter pelo menos 2 caracteres." }),
});

export type CreateMenuForm = z.infer<typeof createMenuSchema>;

interface ICreateMenuForm {
  menu?: Menu;
  handleClose: () => void;
}

export const CreateMenuForm = ({ menu, handleClose }: ICreateMenuForm) => {
  const form = useForm<CreateMenuForm>({
    resolver: zodResolver(createMenuSchema),
    defaultValues: {
      keywords: menu?.keywords || [],
      message: menu?.message || "",
      name: menu?.name || "",
    },
  });


  const queryClient = useQueryClient();

  const { mutateAsync: upsertMenuFn } = useMutation({
    mutationFn: async (data: CreateMenuForm) => {
      if (menu) {
        await updateMenu({ id: menu.id, ...data });
      } else {
        await createMenu(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-menus"] });

      toast.success(
        menu
          ? "✏️ O menu foi atualizado com sucesso!"
          : "📩 O menu foi criado com sucesso!"
      );

      form.reset();
      handleClose();
    },
    onError: (error: ErrorResponse) => {
      error.map((err) => toast.error(err.message));
    },
  });

  const onSubmit = async (data: CreateMenuForm) => {
    await upsertMenuFn(data);
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Menu *</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Ex: Menu Principal"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem do Menu *</FormLabel>
              <FormControl>
                <Textarea
                  className="whitespace-break-spaces"
                  disabled={isLoading}
                  placeholder="Olá! Como posso ajudá-lo hoje?"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <KeywordsField />

        <div className="flex justify-end">
          <Button disabled={isLoading}>
            {menu ? "Atualizar Menu" : "Salvar Menu"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
