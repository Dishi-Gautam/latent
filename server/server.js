const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
app.use(cors()); 

process.env.SERVER_URI

const io = new Server(server, {
  cors: {
    // origin: '*', 
    origin: 'https://latent-ashen.vercel.app',
    // origin: process.env.SERVER_URI,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on('rejected', ({ adminId }) => {
    io.emit('rejected', { adminId });
  });
  socket.on('unreject', ({ adminId }) => {
    io.emit('unreject', { adminId }); 
  });
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
