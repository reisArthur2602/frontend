import { createMenu } from "@/http/menu/create-menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type PropsWithChildren } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";

import z from "zod";

const createMenuSchema = z.object({
  keywords: z.string().trim().min(2, { message: "O nome é obrigatório" }),
  name: z.string().trim().min(2, { message: "O nome é obrigatório" }),
  message: z.string().trim().min(2, { message: "A mensagem é obrigatória" }),
});

export const CreateMenuDialog = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(createMenuSchema),
    defaultValues: {
      keywords: "",
      message: "",
      name: "",
    },
  });

  const { mutateAsync: createMenuFn } = useMutation({
    mutationFn: createMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-menus"] });
      setOpen(false);
      form.reset();
    },
    onError: (error: ErrorResponse) => {
      error.map((err) => toast.error(err.message));
    },
  });

  const onSubmit = async (data: z.infer<typeof createMenuSchema>) => {
    const formatted = {
      ...data,
      keywords: data.keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0),
    };

    await createMenuFn(formatted);
  };

  const isLoading = form.formState.isSubmitting;
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Menu</DialogTitle>
          <DialogDescription>
            Crie um menu de atendimento rapidamente.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            id="create-menu-form"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Menu</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Atendimento Principal" {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Palavras-chave </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: vendas, suporte, financeiro"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Separe por vírgula.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem Principal</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Bem-vindo! Para melhor atendê-lo, escolha uma das opções..."
                      className="resize-none min-h-[160px]"
                      {...field}
                    />
                  </FormControl>
                 
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button form="create-menu-form" disabled={isLoading} type="submit">
              {!isLoading ? (
                "Criar menu"
              ) : (
                <>
                  <Loader2 className="animate-spin" />
                  ...Carregando
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
