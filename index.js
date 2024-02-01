const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    console.log('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

let prev = 100;
let interval = 10;
setInterval(() => {
  let nextNum = prev + Math.floor(Math.random() * ( 2 * interval + 1 )) - interval;
  prev = nextNum;
  io.emit('chat message', nextNum);
}, 5000);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
