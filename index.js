const express = require('express');
const http = require("http");
const socketIo = require("socket.io");
const Tessel = require("tessel-io");
const five = require("johnny-five");

require('dotenv').config();

const PORT = process.env.PORT || 4001;
const routes = require("./routes/index");

const app = express();
app.use(routes);

const server = http.createServer(app);
const socketIO = socketIo(server);

const board = new five.Board({
  io: new Tessel()
});

let interval;

board.on("ready", () => {
  const led = new five.Led("a5");

  socketIO.on("connection", (socket) => {
    console.log("New client connected");
    socket.emit("status", 'Ready');

    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => getFoodLevelAndEmit(socket), 1000);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });

    socket.on('feed', (msg) => {
      console.log('feed that bitch')
      console.log('portion size: ', msg)
      socket.emit("status", 'Feeding...');

      
      let timer;

      if (msg === 'extra') {
        timer = 5000;
      } else if (msg === 'snack') {
        timer = 1000;
      } else {
        timer = 3000;
      }

      led.on();

      setTimeout(() => {
        led.off()
        socket.emit("status", 'Ready');
      }, timer)

    })
  });
});

const getFoodLevelAndEmit = socket => {
  let foodLevel = 10; 
  let foodStatusMsg = 'Good';
  if (foodLevel > 5) {
    foodStatusMsg = 'Low'
  }
  // Emitting a new message. Will be consumed by the client
  socket.emit("foodLevel", foodStatusMsg);
};

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

