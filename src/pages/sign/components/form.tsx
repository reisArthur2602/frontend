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
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSession } from "@/http/user/create-session";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserStore } from "@/stores/user";
import { token } from "@/utils/token";

const signSchema = z.object({
  email: z
    .string()
    .email({ message: "Insira um email válido (exemplo@dominio.com)" }),

  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export const SignForm = () => {
  const form = useForm({
    resolver: zodResolver(signSchema),
    defaultValues: { email: "", password: "" },
  });
  const navigate = useNavigate();

  const { updateUser } = UserStore();

  const { mutateAsync: createSessionFn } = useMutation({
    mutationFn: createSession,
    onSuccess: ({ accessToken, user }) => {
      updateUser(user);
      token.save(accessToken);
      toast.success(`Olá ${user.name}, seja bem vindo!`);
      navigate("/dashboard");
    },

    onError: (error: ErrorResponse) => {
      error.map((err) => toast.error(err.message));
    },
  });

  const onSubmit = async (data: z.infer<typeof signSchema>) => {
    await createSessionFn(data);
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
          <h1>Bem-vindo de volta</h1>
          <p>Acesse sua conta, ou crie gratuitamente</p>
        </div>

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
        <Button disabled={form.formState.isSubmitting}>Acesse sua conta</Button>
        <a
          href="/sign/create-account"
          className={buttonVariants({ variant: "link" })}
        >
          Ainda não possui uma conta?
        </a>
      </form>
    </Form>
  );
};
