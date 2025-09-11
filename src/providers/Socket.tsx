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
  status: Status | null;
  qr: string | null;
};

const SocketContext = createContext<SocketContextType>({
  status: null,
  qr: null,
});

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const instance = "marketing";

  const [status, setStatus] = useState<Status | null>(null);
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    socket.on(`connection.status`, async ({ status, qr }) => {
      console.log(status, qr);
      const data = qr ? await generateQrCode.toDataURL(qr) : null;
      setQr(data);
      setStatus(status as Status);
    });

    return () => {
      socket.off(`connection.status`);
    };
  }, [instance]);

  return (
    <SocketContext.Provider value={{ status, qr }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
