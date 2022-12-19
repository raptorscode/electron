const { fork } = require("child_process");
const test = document.querySelector("#test");

// Start the TCP server in a separate process
const serverProcess = fork("./server.js");

// Send a message to the server process to start listening for connections
serverProcess.send({ type: "start" });

// Listen for messages from the server process
serverProcess.on("message", (message) => {
  console.log(message);
  // Handle messages from the server process, such as incoming data from a TCP connection
  const string = Buffer.from(message.data).toString();
  let div = document.createElement("p");
  div.innerHTML = string;
  test.appendChild(div);
  console.log(string);
  // if (message.type === "data") {
  //   // Send the data to the main process
  //   process.send(message.data);
  // }
});
