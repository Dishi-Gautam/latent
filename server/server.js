const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Allow cross-origin requests from your frontend (Vite default port: 5173)
app.use(cors());  

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle rejection event
  socket.on('rejected', ({ adminId }) => {
    io.emit('rejected', { adminId }); // Broadcast to all connected clients
  });

  // Handle unrejection event
  socket.on('unreject', ({ adminId }) => {
    io.emit('unreject', { adminId }); // Broadcast to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server on port 3001
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
