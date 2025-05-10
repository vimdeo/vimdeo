
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', socket => {
    socket.on('set username', username => {
      socket.username = username;
    });
  
    socket.on('new user', username => {
      socket.broadcast.emit('chat message', {
        username: 'System',
        msg: `${username} has joined the chat`,
        avatar: 'system.jpeg' // You can create a simple icon for system messages
      });
    });
  
    socket.on('chat message', data => {
      io.emit('chat message', data);
    });
  
    socket.on('typing', username => {
      socket.broadcast.emit('typing', username);
    });
  
    socket.on('stop typing', () => {
      socket.broadcast.emit('stop typing');
    });
  });
  


http.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});