import { useFieldArray, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TabsContent } from "./ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOption } from "@/http/option/create-option";

import { toast } from "sonner";

const optionsSchema = z.object({
  options: z
    .array(
      z.object({
        menu_id: z.string().min(1, "A tecla é obrigatória"),
        trigger: z.string().min(1, "A tecla é obrigatória"),
        label: z.string().min(1, "O rótulo é obrigatório"),
        reply_text: z.string().optional(),
        action: z.enum(["auto_reply", "redirect_queue"]),
      })
    )
    .min(1, "Adicione pelo menos uma opção"),
});

interface IOptionsMenuTab {
  menu_id: string;
  options: {
    id: string;
    trigger: number;
    label: string;
    replyText?: string;
    action: "auto_reply" | "redirect_queue" | "end_session";
    menu_id: string;
    created_at: string;
    updated_at: string;
  }[];
}

export const OptionsMenuTab = ({ menu_id, options }: IOptionsMenuTab) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof optionsSchema>>({
    resolver: zodResolver(optionsSchema),
    defaultValues: {
      options: options.map((opt) => ({
        menu_id,
        trigger: String(opt.trigger),
        label: opt.label,
        reply_text: opt.replyText ,
        action: opt.action === "end_session" ? "redirect_queue" : opt.action,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const { mutateAsync: createOptionFn } = useMutation({
    mutationFn: createOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-menus"] });
      form.reset();
    },
    onError: (error: ErrorResponse) => {
      error.map((err) => toast.error(err.message));
    },
  });

  const onSubmit = async (data: z.infer<typeof optionsSchema>) => {
    console.log(data);
    await createOptionFn({ options: data.options });
  };

  return (
    <TabsContent value="options" className="space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          id="options-form"
        >
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Opções</CardTitle>

              <Button
                type="button"
                size="sm"
                onClick={() =>
                  append({
                    menu_id,
                    trigger: "",
                    label: "",
                    reply_text: "",
                    action: "redirect_queue",
                  })
                }
              >
                <Plus />
                Adicionar
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              {fields.map((field, index) => {
                const currentField = form.watch(`options.${index}`);

                return (
                  <Card key={field.id} className="p-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => remove(index)}
                      className="w-fit"
                    >
                      <Trash2 />
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <FormField
                        control={form.control}
                        name={`options.${index}.trigger`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tecla</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: 1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`options.${index}.label`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rótulo</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Atendimento" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`options.${index}.action`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ação</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="auto_reply">
                                    Resposta Automática
                                  </SelectItem>
                                  <SelectItem value="redirect_queue">
                                    Adicionar à Fila
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {currentField?.action === "auto_reply" && (
                      <FormField
                        control={form.control}
                        name={`options.${index}.reply_text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mensagem de Resposta</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ex: Estamos em atendimento"
                                rows={6}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </Card>
                );
              })}
            </CardContent>
          </Card>

          <Button type="submit" form="options-form">
            Salvar Opções
          </Button>
        </form>
      </Form>
    </TabsContent>
  );
};
