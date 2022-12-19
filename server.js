const net = require("net");

// Set up the TCP server
const server = net.createServer((socket) => {
  // Handle incoming data from the client
  socket.on("data", (data) => {
    // Send the data back to the main process
    if (process.send) {
      process.send(data);
    }
  });
});

// Listen for messages from the main process
process.on("message", (message) => {
  if (message.type === "start") {
    // Start listening for connections
    server.listen(3005);
  }
});
