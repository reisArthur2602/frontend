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

type SocketContextType = {
  status: "pending" | "active";
  qr: string | null;
};

const SocketContext = createContext<SocketContextType>({
  status: "pending",
  qr: null,
});

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const instanceId = "c07e4bbd-b4d9-47af-9dfd-6885408445b5";

  const [status, setStatus] = useState<"pending" | "active">("pending");
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
