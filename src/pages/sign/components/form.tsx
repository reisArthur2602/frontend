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

export const SignForm = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="max-w-sm w-full flex flex-col gap-4 ">
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
          render={() => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="seuemail@email.com" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={() => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" />
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
