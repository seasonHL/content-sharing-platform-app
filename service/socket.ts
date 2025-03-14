import { useToken } from "@/store";
import io from "socket.io-client";
import { BASE_URL } from ".";

export const socket = io(BASE_URL, {
    async auth(cb) {
        cb({
            token: useToken.getState().access_token
        })
    },
})

socket.on('connect', () => {
    console.log('connected')
})
socket.on('disconnect', () => {
    console.log('disconnected')
})