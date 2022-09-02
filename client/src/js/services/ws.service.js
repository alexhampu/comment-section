import {io} from "socket.io-client";

export const webSocket = io(import.meta.env.VITE_WS_URL);