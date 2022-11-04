/**
 * Module dependencies.
 */

import app from "./app";
var debug = require("debug")("api:server");
import http from "http";
import { AddressInfo } from "net";
import config from "./config";
import connectMongoDB from "./config/mongodb";
import { normalizePort } from "./utils";

/**
 * Connect to MongoDB
 */
connectMongoDB();
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(config.port);
app.set("port", port);

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address() as AddressInfo;
  console.log(`[env] : ${config.env}`);
  console.log(
    `⚡️[server]: Server is running at http://${addr.address}${port}`
  );

  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("Listening on " + bind);
}
