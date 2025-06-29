import { WebSocketServer, WebSocket } from "ws";


const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room : string;
}
let allSockets:User[] =[];

wss.on("connection", (socket)=>{

    socket.on("message", (message)=>{
        const parsedMessage = JSON.parse(message as unknown as string);
        if(parsedMessage.type === 'join'){
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type=="chat"){
           // Inside chat block
const senderSocket = socket;
const user = allSockets.find(u => u.socket === senderSocket);
if (!user) return;

const currentUserRoom = user.room;

for (const u of allSockets) {
  if (u.room === currentUserRoom) {
    u.socket.send(JSON.stringify(parsedMessage.payload));
  }
}

        }
    })
    socket.on("close", () => {
  allSockets = allSockets.filter(u => u.socket !== socket);
});

})