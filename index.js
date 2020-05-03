const express = require('express');
const bodyParser = require('body-parser');
const ws = require("nodejs-websocket");
const socketPORT = 6000;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// app.use(routes);           

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});

const server = ws.createServer(function (conn) {
  console.log("New connection");

  // If we get text from the client, and echo it  
  conn.on("text", function (str) {
    // print it out 
    console.log("Received: "+ str)
    // Send it back (but more excited)
    conn.sendText("Message Received!")
  });

  // When the client closes the connection, notify us
  conn.on("close", function (code, reason) {
      console.log("Connection closed")
  });
}).listen(socketPORT, function() {
    console.log('Socket listening on PORT', socketPORT);
});


