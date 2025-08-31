import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/Logo";
import { createSession } from "@/http/user/create-session";

import { tokenUtils } from "@/utils/token";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";
import { UserStore } from "@/stores/user";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Insira um email válido (exemplo@dominio.com)" }),

  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

const LoginPage = () => {
  const { updateUser } = UserStore();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutateAsync: createSessionFn } = useMutation({
    mutationFn: createSession,
    onSuccess: ({ accessToken, user }) => {
      updateUser(user);
      tokenUtils.save(accessToken);
      toast.success(`Olá ${user.name}, seja bem vindo!`);
      navigate("/dashboard");
    },

    onError: (error: ErrorResponse) => {
      error.map((err) => toast.error(err.message));
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await createSessionFn(data);
  };

  return (
    <>
      {" "}
      <Form {...form}>
        <form
          className="max-w-sm w-full flex flex-col gap-6 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Logo />

          <h1>Bem-vindo de volta</h1>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="seuemail@email.com" {...field} />
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
          <Button disabled={form.formState.isSubmitting}>
            Acesse sua conta
          </Button>
          <div className="text-muted-foreground text-xs w-full text-center ">
            Ainda não possui uma conta? {""}
            <a href="/register">Ainda não possui uma conta?</a>
          </div>
        </form>
      </Form>
    </>
  );
};
export default LoginPage;
