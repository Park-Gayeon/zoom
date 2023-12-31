import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// 하나의 서버에서 http, webSocket 서버를 둘다 돌릴 수 있게 함. 
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = [];

wss.on("connection", (socket) =>{
    sockets.push(socket);
    console.log("Connected to Browser");
    socket.on("close", () => {
        console.log("Disconnected from the Browser");
    });
    socket.on("message", (message) => {
        sockets.forEach((aSocket) => aSocket.send(message.toString('utf-8')));
    });
});

server.listen(3000, handleListen);
