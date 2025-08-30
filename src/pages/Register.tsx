import z from "zod";

import { useForm } from "react-hook-form";
import { Logo } from "@/components/logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccount } from "@/http/user/create-account";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const registerSchema = z.object({
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

const RegisterPage = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerSchema),
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

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    await createAccountFn(data);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="max-w-sm w-full flex flex-col gap-6 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Logo />

          <h1>Crie sua conta</h1>

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

          <div className="text-muted-foreground text-xs w-full text-center">
            Já possui uma conta? {""}
            <a href="/">Acesse sua conta?</a>
          </div>
        </form>
      </Form>
    </>
  );
};

export default RegisterPage;
