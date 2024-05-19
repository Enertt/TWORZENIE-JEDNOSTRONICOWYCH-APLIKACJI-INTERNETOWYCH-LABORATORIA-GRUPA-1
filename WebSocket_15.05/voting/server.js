const WebSocket = require("ws");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server: server, path: "/voting" });
const clients = new Set();

let results = {
  pizza: 0,
  pasta: 0,
};

app.use(express.static("client"));
server.listen(3000);

wsServer.on("connection", (socket) => {
  console.log("Client connected!");
  clients.add(socket);
  socket.send(JSON.stringify(results));
  console.log("Sent initial results to client:", JSON.stringify(results));
  socket.on("message", (message) => {

    if (message == "Pizza") {
      results.pizza++;
    } else if (message == "Pasta") {
      results.pasta++;
    }

    const updatedResults = JSON.stringify(results);
    wsServer.clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(updatedResults);
      }
    });

    console.log("Received vote:", message);
    console.log("Updated results:", updatedResults);
  });

  socket.on("close", () => {
    clients.delete(socket);
    console.log(
      "Client disconnected, total number of clients is: ",
      clients.size
    );
  });

  socket.on("error", (error) => {
    console.log("Error:" + error);
  });

  console.log("Sending to a newly connected client.");
});