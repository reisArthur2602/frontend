/* eslint-disable react-refresh/only-export-components */
// src/context/SocketContext.tsx
import { socket } from "@/lib/socket";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import generateQrCode from "qrcode";


const sendMessage = ({phone,text}:SendMessage) =>
socket.emit('send_message', phone,text)


type SocketContextType = {
  status: Status | null;
  qr: string | null;
  queue: Lead[];
  sendMessage:({ phone, text }: SendMessage) => void
};

const SocketContext = createContext<SocketContextType>({
  status: null,
  qr: null,
  queue: [],
  sendMessage
});




export const SocketProvider = ({ children }: PropsWithChildren) => {
  const instanceId = "f476d3e4-2c28-4d4c-9479-9c480ba768cc";

  const [status, setStatus] = useState<Status | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [queue, setQueue] = useState<Lead[]>([]);


  useEffect(() => {
    socket.on(`qr:${instanceId}`, async (qrCode: string) => {
      const data = qrCode ? await generateQrCode.toDataURL(qrCode) : null;
      setQr(data);
    });

    socket.on(`status:${instanceId}`, (newStatus: "pending" | "active") => {
      setStatus(newStatus);
      if (newStatus === "active") setQr(null);
    });

    socket.on("newLead", (lead: Lead) => {
      console.log("newLead:", lead);
      setQueue((prev) => [...prev, lead]);
    });

    socket.on("queue", (queue: Lead[]) => {
      setQueue(queue);
      console.log("currentQueue", queue);
    });

     socket.on("receive_message", (phone:string, text:string) => {
      console.log(`Mensagem recebida pelo frontend ${phone}:${text}`)
    });

    return () => {
      socket.off(`qr:${instanceId}`);
      socket.off(`status:${instanceId}`);
      socket.off(`newLead`);
      socket.off(`queue`);
    };
  }, [instanceId]);

  console.log(queue);
  return (
    <SocketContext.Provider value={{ status, qr, queue, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
