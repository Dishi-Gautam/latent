const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static('public'));
io.on('connection', (socket) => {
  console.log('A user connected');t
  socket.on('buzz', () => {
  //  console.log('Buzz triggered');
    io.emit('buzz');  
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
