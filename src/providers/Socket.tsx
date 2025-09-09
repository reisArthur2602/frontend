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

const sendMessage = ({ phone, text }: SendMessage) =>
  socket.emit("send_message", phone, text);

type SocketContextType = {
  status: Status | null;
  qr: string | null;
  queue: Lead[] | [];
  sendMessage: ({ phone, text }: SendMessage) => void;
};

const SocketContext = createContext<SocketContextType>({
  status: null,
  qr: null,
  queue: [],
  sendMessage,
});

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const instance = "marketing";

  const [status, setStatus] = useState<Status | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [queue, setQueue] = useState<Lead[] | []>([]);

  useEffect(() => {
    socket.on(`connection.status`, async ({ status, qr }) => {
      console.log(status, qr);
      const data = qr ? await generateQrCode.toDataURL(qr) : null;
      setQr(data);
      setStatus(status as Status);
    });

    socket.on(`status:${instance}`, (newStatus: Status) => {
      setStatus(newStatus);
      if (newStatus === "connected") setQr(null);
    });

    socket.on("newLead", (lead: Lead) => {
      console.log("newLead:", lead);
      setQueue((prev) => [...prev, lead]);
    });

    socket.on("queue", (queue: Lead[]) => {
      console.log("queue:", queue);
      setQueue(queue);
    });

    return () => {
      socket.off(`qr:${instance}`);
      socket.off(`status:${instance}`);
      socket.off(`newLead`);
      socket.off(`queue`);
      socket.off(`connection.status`);
    };
  }, [instance]);

  return (
    <SocketContext.Provider value={{ status, qr, queue, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
