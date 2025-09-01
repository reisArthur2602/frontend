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

type Status = 'pending' | 'active'

type SocketContextType = {
  status: Status | null;
  qr: string | null;
};

const SocketContext = createContext<SocketContextType>({
  status: null,
  qr: null,
});



export const SocketProvider = ({ children }: PropsWithChildren) => {
  const instanceId = "095700fe-bf4c-4376-b1ce-f3736ce88558";

  const [status, setStatus] = useState<Status | null> (null);
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    socket.on(`qr:${instanceId}`, async (qrCode: string) =>
      setQr(await generateQrCode.toDataURL(qrCode))
    );

    socket.on(`status:${instanceId}`, (newStatus: "pending" | "active") => {
      setStatus(newStatus);
      if (newStatus === "active") setQr(null);
    });

    return () => {
      socket.off(`qr:${instanceId}`);
      socket.off(`status:${instanceId}`);
    };
  }, [instanceId]);

  return (
    <SocketContext.Provider value={{ status, qr }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
