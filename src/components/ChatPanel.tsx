import { formatHours } from "@/utils/format-hours";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/providers/Socket";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMessagesByPhone } from "@/http/message/get-messages-by-lead";
import { Skeleton } from "./ui/skeleton";
import { socket } from "@/lib/socket";

export const ChatPanel = () => {
  const { sendMessage } = useSocket();
  const [searchParams] = useSearchParams();

  const selectedLeadName = searchParams.get("name");
  const selectedLeadPhone = searchParams.get("phone");

  const [currentChat, setCurrentChat] = useState<Message[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["get-messages-by-phone", selectedLeadPhone],
    queryFn: () => getMessagesByPhone({ phone: selectedLeadPhone as string }),
    enabled: !!selectedLeadPhone,
  });

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = ({ phone, text }: SendMessage) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    sendMessage({ phone, text: trimmed });

    setCurrentChat((prev) => [
      ...prev,
      {
        text: trimmed,
        from: "agent",
        created_at: new Date().toISOString(),
      },
    ]);
    setNewMessage("");
  };

  const quickResponses = [
    "Aguarde um momento",
    "Posso ajudar?",
    "Ajudo em algo mais?",
  ];

  const lastmessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastmessageRef.current) {
      lastmessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [data, currentChat]);

  const canInteract = !!selectedLeadPhone && !isLoading;

  useEffect(() => {
    socket.on(`receive_message`, (_, text: string) => {
      setCurrentChat((prev) => [
        ...prev,
        {
          text,
          from: "customer",
          created_at: new Date().toISOString(),
        },
      ]);
    });

    return () => {
      socket.off(`receive_message`);
    };
  }, []);

  return (
    <Card className="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>{selectedLeadName ?? "Sem contato selecionado"}</CardTitle>
      </CardHeader>

      <Separator />

      {!selectedLeadPhone && (
        <CardContent className="flex-1">
          <div>Selecione um contato</div>
        </CardContent>
      )}

      <CardContent className="flex-1 p-0 min-h-0">
        <ScrollArea className="px-4 min-h-0 h-full">
          {isLoading && (
            <div className="p-2 space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className={`flex mb-4 last:mb-0 ${
                    i % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[70%] min-w-[15%] rounded-lg p-3 ${
                      i % 2 === 0 ? "bg-muted" : "bg-primary/10"
                    }`}
                  >
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-40 rounded" />
                      <div className="flex justify-end items-center gap-2">
                        <Skeleton className="h-3 w-10 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-2">
            {data?.messages.map((message, index) => (
              <div
                key={`${index}-${message.created_at}`}
                className={`flex mb-4 last:mb-0 ${
                  message.from === "customer" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[70%] min-w-[15%] rounded-lg p-3 ${
                    message.from === "customer"
                      ? "bg-muted"
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
                    <span>{formatHours(message.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* MENSAGENS LOCAIS (enviadas agora) */}
            {currentChat?.map((current, index) => (
              <div
                key={`local-${index}-${current.created_at}`}
                className={`flex mb-4 last:mb-0 ${
                  current.from === "customer" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[70%] min-w-[15%] rounded-lg p-3 ${
                    current.from === "customer"
                      ? "bg-muted"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      current.from === "customer"
                        ? "text-muted-foreground"
                        : "text-primary-foreground"
                    }`}
                  >
                    {current.text}
                  </p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-2 text-xs ${
                      current.from === "customer"
                        ? " text-muted-foreground"
                        : "text-primary-foreground/70"
                    }`}
                  >
                    <span>{formatHours(current.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}

            <div ref={lastmessageRef} />
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
            onKeyDown={(e) =>
              e.key === "Enter" &&
              handleSendMessage({
                phone: selectedLeadPhone as string,
                text: newMessage,
              })
            }
            disabled={!canInteract}
            aria-busy={isLoading}
          />
          <Button
            onClick={() =>
              handleSendMessage({
                phone: selectedLeadPhone as string,
                text: newMessage,
              })
            }
            disabled={!canInteract || newMessage.trim() === ""}
            aria-disabled={!canInteract || newMessage.trim() === ""}
            title={!canInteract ? "Carregando..." : undefined}
          >
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
              disabled={!canInteract}
            >
              {response}
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
