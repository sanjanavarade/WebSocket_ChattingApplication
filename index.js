"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === 'join') {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type == "chat") {
            // Inside chat block
            const senderSocket = socket;
            const user = allSockets.find(u => u.socket === senderSocket);
            if (!user)
                return;
            const currentUserRoom = user.room;
            for (const u of allSockets) {
                if (u.room === currentUserRoom) {
                    u.socket.send(JSON.stringify(parsedMessage.payload));
                }
            }
        }
    });
    socket.on("close", () => {
        allSockets = allSockets.filter(u => u.socket !== socket);
    });
});
