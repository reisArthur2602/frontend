/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

const actionTypes = [
  {
    value: "auto_reply",
    label: "Resposta Automática",
  },

  {
    value: "forward_to_number",
    label: "Encaminhar",
  },
  {
    value: "redirect_queue",
    label: "Adicionar para fila",
  },
];

export const SelectOptionActionField = () => {
  const form = useFormContext();

  const action = form.watch("action") || "";
  const payload = form.watch("payload") || {};

  const updatePayload = (key: string, value: any) => {
    form.setValue(
      "payload",
      {
        ...payload,
        [key]: value,
      },
      { shouldValidate: true, shouldDirty: true }
    );
  };

  const renderPayloadFields = () => {
    switch (action) {
      case "auto_reply":
        return (
          <FormItem>
            <FormLabel htmlFor="reply_text">Texto da Resposta *</FormLabel>
            <FormControl>
              <Textarea
                id="reply_text"
                value={payload.reply_text || ""}
                onChange={(e) => updatePayload("reply_text", e.target.value)}
                placeholder="Olá {{lead.name}}, obrigado pelo contato!"
                rows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      case "redirect_queue":
        return (
          <FormItem>
            <FormLabel htmlFor="wait_message">Mensagem de Espera*</FormLabel>
            <FormControl>
              <Textarea
                id="wait_message"
                value={payload.reply_text || ""}
                onChange={(e) => updatePayload("reply_text", e.target.value)}
                placeholder="🙋 Você foi adicionado à fila de atendimento. Aguarde um atendente."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );

      case "forward_to_number":
        return (
          <div className="space-y-4">
            <FormItem>
              <FormLabel htmlFor="forward_to_number">
                Encaminhar para *
              </FormLabel>
              <FormControl>
                <Input
                  id="forward_to_number"
                  value={payload.forward_to_number || ""}
                  onChange={(e) =>
                    updatePayload("forward_to_number", e.target.value)
                  }
                  placeholder="5511999999999"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="forward_text">Texto Encaminhado</FormLabel>
              <FormControl>
                <Textarea
                  id="forward_text"
                  value={payload.forward_text || ""}
                  onChange={(e) =>
                    updatePayload("forward_text", e.target.value)
                  }
                  placeholder="Mensagem encaminhada:"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="finish_text">Texto de Finalização</FormLabel>
              <FormControl>
                <Textarea
                  id="finish_text"
                  value={payload.finish_text || ""}
                  onChange={(e) => updatePayload("finish_text", e.target.value)}
                  placeholder="Sua mensagem foi encaminhada!"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <FormField
        control={form.control}
        name="action"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="action">Tipo de Ação *</FormLabel>
            <FormControl>
              <Select
                value={field.value || ""}
                onValueChange={(value) => {
                  field.onChange(value);

                  form.setValue(
                    "payload",
                    {},
                    { shouldValidate: true, shouldDirty: true }
                  );

                  form.clearErrors("action");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o tipo de ação" />
                </SelectTrigger>

                <SelectContent className="w-full">
                  {actionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {action && (
        <Card className="mt-4 p-2">
          <CardContent className="p-2">{renderPayloadFields()}</CardContent>
        </Card>
      )}
    </div>
  );
};

export default SelectOptionActionField;
