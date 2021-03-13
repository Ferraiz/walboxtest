import { Server } from "ws";

const port = Number(process.env.WS_PORT || 3100);

const wss = new Server({ port });

console.log("--- Starting websocket server");
wss.on("connection", function connection(ws, req) {
  console.log(`--- Get connection from ${req.url}`);
  ws.on("message", function incomming(message) {
    console.log("NNN message: ", message);
  });
});
