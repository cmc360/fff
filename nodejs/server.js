const http = require('http');
const server = http.createServer((req, res) => {
  const now = new Date();	
  res.end(`<h1>Hello from backend!</h1><h2> ${now}</h2>`);
});
server.listen(3000);