import { useSocket } from "@/providers/Socket";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { formatHours } from "@/utils/format-hours";
import { useSearchParams } from "react-router-dom";

export const QueueList = () => {
  const { queue } = useSocket();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedLeadPhone = searchParams.get("phone") ?? null;
const isCustomerInQueue = queue && queue.length > 0 || false
  return (
    <Card className="flex flex-col min-h-0 col-span-1">
      <CardHeader>
        <CardTitle>Fila ({queue.length || 0})</CardTitle>
      </CardHeader>

      <CardContent className="p-0 min-h-0 flex-1">
        <ScrollArea className="px-2 min-h-0 h-full">
          <div className="space-y-2">
            {isCustomerInQueue && queue.map((lead) => (
              <div
                key={lead.id}
                className={`w-full p-4 pl-2 cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedLeadPhone === lead.phone &&
                  "bg-primary-light border-r-2 border-r-primary"
                }`}
                onClick={() =>
                  setSearchParams({
                    name: lead.name!,
                    phone: lead.phone,
                  })
                }
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback>
                      {lead
                        .name!.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium truncate">{lead.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatHours(lead.lastMessage!.created_at)}
                      </span>
                    </div>
                    <p className=" line-clamp-1">{lead.lastMessage?.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
