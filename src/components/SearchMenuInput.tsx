import { Search } from "lucide-react";

import { Input } from "./ui/input";

export const SearchMenuInput = () => {
  return (
    <div className="relative max-w-sm ">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Buscar menus..." className="pl-10" />
    </div>
  );
};
