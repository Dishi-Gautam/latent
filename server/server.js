const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let rejectedAdmins = [];

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.emit('updateRejections', rejectedAdmins);

  socket.on('reject', (adminId) => {
    if (!rejectedAdmins.includes(adminId)) {
      rejectedAdmins.push(adminId);
    }
    io.emit('updateRejections', rejectedAdmins);
  });

  socket.on('reset', () => {
    rejectedAdmins = [];
    io.emit('updateRejections', rejectedAdmins);
  });
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
