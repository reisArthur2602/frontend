import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone } from "lucide-react";

import { useSocket } from "@/providers/Socket";
import { Skeleton } from "@/components/ui/skeleton";

const WhatsAppPage = () => {
  const { qr, status } = useSocket();
  const isLoading = status === "connecting";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-base font-bold tracking-tight">Gerenciar Sessão</h1>
      </header>
      {isLoading ? (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[350px] rounded-xl" />
          <Skeleton className="h-[350px] rounded-xl" />
        </section>
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Conectar via QR Code</CardTitle>
            </CardHeader>
            <CardContent>
              {status === "pending" ? (
                <div className="space-y-4">
                  <div className="w-full h-64 bg-card border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                    {qr ? (
                      <img src={qr} className=" w-48 h-48 " />
                    ) : (
                      <div className="text-center space-y-3">
                        <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                          <div className="grid grid-cols-4 gap-1">
                            {Array.from({ length: 16 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-sm ${
                                  Math.random() > 0.5
                                    ? "bg-foreground"
                                    : "bg-background"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="font-medium">Escaneie o QR Code</h3>
                    <ol className="text-sm text-muted-foreground space-y-1 text-left">
                      <li>1. Abra o WhatsApp no seu celular</li>
                      <li>2. Vá em Menu → Dispositivos conectados</li>
                      <li>3. Toque em "Conectar um dispositivo"</li>
                      <li>4. Aponte o celular para esta tela</li>
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="w-full h-64 bg-accent/10 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Smartphone className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="font-medium text-foreground">
                        QR Code não disponível
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {status === "connected"
                          ? "WhatsApp já está conectado"
                          : 'Clique em "Conectar WhatsApp" para gerar o QR Code'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                Status da Sessão
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Estado:</span>
                  <Badge
                    variant={status === "connected" ? "default" : "secondary"}
                  >
                    {status === "connected"
                      ? "Conectado"
                      : "Aguardando conexão"}
                  </Badge>
                </div>

                <p>
                  {status === "connected"
                    ? "WhatsApp está conectado e funcionando"
                    : "Escaneie o QR Code com seu WhatsApp"}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
};

export default WhatsAppPage;
