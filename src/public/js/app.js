const socket = new WebSocket(`ws://${window.location.host}`);

// socket이 connection을 open 하면 발생하는 log
socket.addEventListener("open", () => {
    console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ");
});

// 10초 뒤에 작동
setTimeout(() => {
    socket.send("hello from the browser!");
}, 10000);
