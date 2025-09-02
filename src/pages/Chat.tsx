import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Send } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSocket } from "@/providers/Socket";
import { useSearchParams } from "react-router-dom";

const ChatPage = () => {
  const { queue } = useSocket();

  const [searchParams, setSearchParams] = useSearchParams();
  const leadParam = searchParams.get("lead");
  const selectedLead = queue.find((l) => l.id === leadParam) ?? null;

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const quickResponses = [
    "Obrigado!",
    "Aguarde um momento",
    "Posso ajudar?",
    "Ajudo em algo mais?",
  ];

  return (
    <div className="h-full min-h-0 grid grid-cols-1 md:[grid-template-columns:1fr_3fr] gap-4">
      <Card className="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Conversas</CardTitle>
        </CardHeader>

        <CardContent className="p-0 min-h-0 flex-1">
          <ScrollArea className="px-2 min-h-0 h-full">
            <div className="space-y-1">
              {queue.map((lead) => (
                <div
                  key={lead.id}
                  className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedLead?.id === lead.id &&
                    "bg-primary-light border-r-2 border-r-primary"
                  }`}
                  onClick={() => setSearchParams({ lead: lead.id })}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      {/* <AvatarImage src={contact.avatar} alt={contact.name} /> */}
                      <AvatarFallback>
                        {lead
                          .name!.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 ">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{lead.name}</h4>
                        <span className="text-xs text-muted-foreground">
                          {"10:30"}
                        </span>
                      </div>
                      <p className="truncate line-clamp-1">
                        {lead.messages[0].text}
                      </p>
                    </div>
                  </div>{" "}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>{selectedLead?.name || ""}</CardTitle>
        </CardHeader>

        <Separator />

        {!selectedLead && (
          <CardContent className="flex-1">
            <div>Selecione um contato</div>
          </CardContent>
        )}

        <CardContent className="flex-1 p-0 min-h-0">
          <ScrollArea className="px-4 min-h-0 h-full">
            <div className="p-2">
              {selectedLead?.messages.map((message) => (
                <div
                  key={`${message.id}-${message.created_at}`}
                  className={`flex mb-4 last:mb-0 ${
                    message.from === "customer"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[70%] min-w-[10%] rounded-lg p-3 ${
                      message.from === "customer"
                        ? " bg-muted "
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        message.from === "customer"
                          ? "text-muted-foreground"
                          : "text-primary-foreground"
                      }`}
                    >
                      {message.text}
                    </p>
                    <div
                      className={`flex items-center justify-end gap-1 mt-2 text-xs ${
                        message.from === "customer"
                          ? " text-muted-foreground"
                          : "text-primary-foreground/70"
                      }`}
                    >
                      <span>{"11:30"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col gap-2">
          <div className="flex items-center gap-2 w-full">
            <Input
              placeholder="Mensagem"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send />
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full flex-wrap">
            <span className="text-xs text-muted-foreground">
              Respostas rápidas?
            </span>
            {quickResponses.map((response) => (
              <Button
                key={response}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setNewMessage(response)}
              >
                {response}
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatPage;
