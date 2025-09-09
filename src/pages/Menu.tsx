import { CreateMenuSheet } from "@/components/CreateMenuSheet";
import { DeleteMenuAlert } from "@/components/DeleteMenuAlert";
import { SearchMenuInput } from "@/components/SearchMenuInput";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMenus } from "@/http/menu/get-menus";
import { useQuery } from "@tanstack/react-query";

import { Edit, MoreHorizontal, Plus, Power, Trash2 } from "lucide-react";

const MenuPage = () => {
  const { data: menus, isLoading } = useQuery({
    queryKey: ["get-menus"],
    queryFn: getMenus,
    refetchInterval: 20000,
  });

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-base font-bold tracking-tight">Menu</h1>
        <CreateMenuSheet>
          <Button>
            <Plus />
            Novo Menu
          </Button>
        </CreateMenuSheet>
      </header>

      {isLoading && (
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className="h-[300px] rounded-lg" key={index} />
          ))}
        </div>
      )}

      <SearchMenuInput />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Gatilhos</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menus?.map((menu) => (
            <TableRow key={menu.id}>
              <TableCell className="font-medium">{menu.name}</TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="flex flex-wrap gap-1">
                  {menu.keywords.slice(0, 2).map((keyword) => (
                    <Badge key={keyword} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                  {menu.keywords.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{menu.keywords.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={menu.active ? "secondary" : "outline"}>
                  {menu.active ? "Ativo" : "Inativo"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <CreateMenuSheet menu={menu}>
                      <Button className="w-full justify-start" variant="ghost">
                        <Edit />
                        Editar
                      </Button>
                    </CreateMenuSheet>

                    <DeleteMenuAlert menu_id={menu.id}>
                      <Button className="w-full justify-start" variant="ghost">
                        <Trash2 />
                        Excluir
                      </Button>
                    </DeleteMenuAlert>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MenuPage;
