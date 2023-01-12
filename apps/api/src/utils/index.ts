/**
 * Normalize a port into a number, string, or false.
 */

export function normalizePort(val: any) {
  var port = parseInt(val, 10);
  // named pipe
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}
