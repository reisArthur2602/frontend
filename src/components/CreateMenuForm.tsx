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
}

export const CreateMenuForm = ({ menu }: ICreateMenuForm) => {
  const isEditing = !!menu;

  const form = useForm<CreateMenuForm>({
    resolver: zodResolver(createMenuSchema),
    defaultValues: {
      keywords: menu?.keywords || [],
      message: menu?.message || "",
      name: menu?.name || "",
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: createMenuFn } = useMutation({
    mutationFn: createMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-menus"] });
      toast.success("📩 O Menu foi criado com sucesso!");
      form.reset();
    },
    onError: (error: ErrorResponse) => {
      error.map((err) => toast.error(err.message));
    },
  });

  const onSubmit = async (data: CreateMenuForm) => {
    await createMenuFn(data);
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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

        <Button size="sm" disabled={isLoading || isEditing}>
          Salvar Menu
        </Button>
      </form>
    </Form>
  );
};
