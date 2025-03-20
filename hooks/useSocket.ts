import { BASE_URL } from "@/service";
import { useToken } from "@/store";
import { MessageType } from "@/types/message";
import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";

interface SocketAction {
    connect?: () => void;
    disconnect?: () => void;
    onMessage?: (msg: MessageType) => void;
}
export function useSocket(options?: SocketAction) {
    const tokenStore = useToken();
    const socket = useMemo(() => {
        const token = tokenStore.access_token;
        return io(BASE_URL, {
            auth: {
                token,
            },
        });
    }, [tokenStore.access_token]);
    useEffect(() => {
        socket.connect();
        socket.on("message", (msg) => {
            options?.onMessage?.(msg);
        });
        return () => {
            socket.disconnect();
        };
    }, [socket, options]);
    return socket;
}