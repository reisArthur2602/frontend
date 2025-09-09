import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const SearchLeadInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("q") || "";

  const [input, setInput] = useState(searchParam);


  useEffect(() => {
    setInput(searchParam);
  }, [searchParam]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);

      if (input.trim()) {
        newParams.set("q", input);
      } else {
        newParams.delete("q");
      }

      setSearchParams(newParams);
    }, 500);

    return () => clearTimeout(handler);
  }, [input, setSearchParams]);

  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar contatos"
        className="pl-10"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
    </div>
  );
};
