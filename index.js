const express = require('express');
const http = require("http");
const socketIo = require("socket.io");
require('dotenv').config();

const PORT = process.env.PORT || 4001;
const routes = require("./routes/index");

const app = express();
app.use(routes);

const server = http.createServer(app);
const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getStatusAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
  socket.on('feed', () => {
      console.log('feed that bitch');
  })
});

const getStatusAndEmit = socket => {
  const status = 'all good';
  const foodLevel = 'low';
  // Emitting a new message. Will be consumed by the client
  socket.emit("status", status);
  socket.emit("foodLevel", foodLevel);
};

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

