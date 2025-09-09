import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "./ui/form";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type { CreateMenuForm } from "./CreateMenuForm";

export const KeywordsField = () => {
  const form = useFormContext<CreateMenuForm>();

  const isLoading = form.formState.isSubmitting;

  const keywords = form.watch("keywords") || [];

  const [keywordInput, setKeywordInput] = useState("");

  const addKeyword = () => {
    const val = keywordInput.trim();
    if (!val) return;

    if (keywords.includes(val)) {
      setKeywordInput("");
      return;
    }

    form.setValue("keywords", [...keywords, val], {
      shouldValidate: true,
      shouldDirty: true,
    });

    setKeywordInput("");
  };

  const removeKeyword = (keyword: string) => {
    form.setValue(
      "keywords",
      keywords.filter((k) => k !== keyword),
      { shouldValidate: true, shouldDirty: true }
    );
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="keywords"
        render={() => (
          <FormItem>
            <FormLabel>Palavras-chave *</FormLabel>

            <FormControl>
              <div className="flex gap-2">
                <Input
                  disabled={isLoading}
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Digite uma palavra-chave"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addKeyword();
                    }
                  }}
                />

                <Button
                  onClick={addKeyword}
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                >
                  Adicionar
                </Button>
              </div>
            </FormControl>

            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeKeyword(keyword)}
                >
                  {keyword} ×
                </Badge>
              ))}
            </div>

            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default KeywordsField;
