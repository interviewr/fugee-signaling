const io = require('socket.io')(3334);

const users = {};

io.on('connection', (socket) => {
  socket.on('room', (message) => {
    const data = JSON.parse(message);
    users[data.id] = socket;

    if (socket.room) {
      socket.leave(socket.room);
    }

    socket.room = data.room;
    socket.join(socket.room);
    socket.user_id = data.id;

    socket.broadcast.to(socket.room).emit('new', data.id);
  });

  socket.on('webrtc', (message) => {
    const data = JSON.parse(message);

    if (data.to && users[data.to]) {
      users[data.to].emit('webrtc', message);
    } else {
      socket.broadcast.to(socket.room).emit('webrtc', message);
    }
  });

  socket.on('disconnect', () => {
    socket.broadcast.to(socket.room).emit('leave', socket.user_id);
    delete users[socket.user_id];
  });
});
