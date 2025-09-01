import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"; // import do scroll-area

const contacts = [
  {
    id: 1,
    name: "Maria Silva",
    avatar: "/placeholder-avatar.jpg",
    lastMessage: "Obrigada pelo atendimento!",
    time: "14:30",
  },
  {
    id: 2,
    name: "João Santos",
    avatar: "/placeholder-avatar.jpg",
    lastMessage: "Preciso de ajuda com meu pedido",
    time: "14:15",
  },
  {
    id: 3,
    name: "Ana Costa",
    avatar: "/placeholder-avatar.jpg",
    lastMessage: "Qual o horário de funcionamento?",
    time: "13:45",
  },
  {
    id: 4,
    name: "Pedro Lima",
    avatar: "/placeholder-avatar.jpg",
    lastMessage: "Produto chegou com defeito",
    time: "12:20",
  },
];

const messages = [
  {
    id: 1,
    sender: "contact",
    content: "Olá! Gostaria de saber sobre o status do meu pedido #12345",
    time: "14:10",
  },
  {
    id: 2,
    sender: "agent",
    content: "Olá João! Vou verificar o status do seu pedido para você.",
    time: "14:11",
  },
  {
    id: 2,
    sender: "agent",
    content: "Olá João! Vou verificar o status do seu pedido para você.",
    time: "14:11",
  },
  {
    id: 2,
    sender: "agent",
    content: "Olá João! Vou verificar o status do seu pedido para você.",
    time: "14:11",
  },
  {
    id: 2,
    sender: "agent",
    content: "Olá João! Vou verificar o status do seu pedido para você.",
    time: "14:11",
  },

  {
    id: 3,
    sender: "agent",
    content:
      "Seu pedido já foi enviado e está a caminho! O código de rastreamento é BR123456789. Você pode acompanhar pelo site dos Correios.",
    time: "14:12",
  },
  {
    id: 4,
    sender: "contact",
    content: "Perfeito! Obrigado pela rapidez no atendimento.",
    time: "14:14",
  },
  {
    id: 5,
    sender: "contact",
    content: "Mais uma dúvida: vocês fazem entrega no fim de semana?",
    time: "14:15",
  },
];

const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[1]);
  const [newMessage, setNewMessage] = useState("");

const isLast = messages.length -1

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const quickResponses = ["Obrigado!", "Aguarde um momento", "Posso ajudar?"];




  return (
    <div className="h-full grid grid-cols-[1fr_3fr] gap-4">
      {/* Lista de contatos */}
      <Card>
        <CardHeader>
          <CardTitle>Conversas</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="px-2 h-[800px]">
            <div className="space-y-1">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedContact.id === contact.id
                      ? "bg-primary-light border-r-2 border-r-primary"
                      : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 ">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{contact.name}</h4>
                        <span className="text-xs text-muted-foreground">
                          {contact.time}
                        </span>
                      </div>
                      <p className="truncate">{contact.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Área de chat */}
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>{selectedContact.name}</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="flex-1 p-0">
          <ScrollArea className=" h-[650px] px-4">
            <>{messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 last:mb-0 ${
                  message.sender === "agent" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "agent"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      message.sender === "agent"
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.content}
                  </p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-2 text-xs ${
                      message.sender === "agent"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span>{message.time}</span>
                  </div>
                </div>
              </div>
            ))}

      
            </>
            

            
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
              Respostas rápidas:
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
