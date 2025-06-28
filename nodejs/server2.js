const http = require('http');
const os = require('os'); // Import the 'os' module

// Function to get the host's IP address
function getHostIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const iface = interfaces[interfaceName];
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'Unable to determine host IP'; // Fallback if no suitable IP is found
}

const server = http.createServer((req, res) => {
  const now = new Date();

  // Get individual date and time components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Assemble the date and time string in the desired format
  const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  // Get the host IP address
  const hostIp = getHostIpAddress();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // Include both date/time and host IP in the response
    res.end(`<h1>Hello from backend!</h1><h2> ${dateTimeString}</h2><h2>Host IP: ${hostIp}</h2>`);

});

const PORT = 3000;

server.listen(PORT, () => {
  const hostIp = getHostIpAddress(); // Get IP here too for console log
  console.log(`Server running on port ${PORT}`);
  console.log(`Access it at http://localhost:${PORT}/ or http://${hostIp}:${PORT}/`);
  console.log(`Host IP Address: ${hostIp}`);
});