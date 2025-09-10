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
