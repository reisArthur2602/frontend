import { ConfigMenuDialog } from "@/components/ConfigMenuDialog";
import { CreateMenuDialog } from "@/components/CreateMenuDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getMenus } from "@/http/menu/get-menus";
import { useQuery } from "@tanstack/react-query";

import { Eye, MessageSquare, Plus, Settings, Trash2 } from "lucide-react";

const ResponsesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-menus"],
    queryFn: getMenus,
    refetchInterval: 20000,
  });

  return (
    <div>
      <header className="mb-12 flex items-center justify-between">
        <h1 className="text-base font-bold tracking-tight">
          Respostas Automáticas
        </h1>
        <CreateMenuDialog>
          <Button>
            <Plus />
            Novo Menu
          </Button>
        </CreateMenuDialog>
      </header>

      {isLoading && (
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className="h-[300px] rounded-lg" key={index} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.menus.map((menu) => (
          <Card key={menu.id} className="transition-smooth hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold mb-2">
                    {menu.name}
                  </CardTitle>
                  {menu.keywords && (
                    <div className="flex items-center gap-2">
                      {menu.keywords.map((keyword) => (
                        <Badge key={keyword} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex space-x-1">
                  <ConfigMenuDialog menu={menu}>
                    <Button variant="ghost">
                      <Settings />
                    </Button>
                  </ConfigMenuDialog>

                  <Button variant="ghost">
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col gap-4 justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Resposta automática :
                  </span>
                </div>

                <div className="bg-accent/20 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {menu.message}
                  </p>
                </div>
              </div>

              <Button variant="outline" className="w-fit">
                <Eye className="h-3 w-3" />
                Ver Completo
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResponsesPage;
