import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/shared/logo";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/http/user/create-account";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const createAccountSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
  email: z
    .string()
    .email({ message: "Insira um email válido (exemplo@dominio.com)" }),

  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export const CreateAccountForm = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(createAccountSchema),
    defaultValues: { email: "", name: "", password: "" },
  });

  const { mutateAsync: createAccountFn } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      navigate("/sign");
    },
    onError: (error: ErrorResponse) => {
      error.map((err) => toast.error(err.message));
    },
  });

  const onSubmit = async (data: z.infer<typeof createAccountSchema>) => {
    await createAccountFn(data);
  };

  return (
    <Form {...form}>
      <form
        className="max-w-sm w-full flex flex-col gap-4 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="mx-auto w-fit">
          <Logo />
        </div>

        <div className="text-center">
          <h1>Crie sua conta</h1>
          <p>Preencha os campos abaixo para começar</p>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="seuemail@email.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting}>Criar conta</Button>
        <a href="/sign" className={buttonVariants({ variant: "link" })}>
          Já possui uma conta?
        </a>
      </form>
    </Form>
  );
};
