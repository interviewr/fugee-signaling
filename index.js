const io = require('socket.io')();
const debug = require('debug')('fugee');

const port = process.env.PORT || 3334;
const users = {};

io.on('connection', (socket) => {
  debug(`Received a new connection`);

  socket.on('init', (data, fn) => {
    users[data.userID] = socket;

    if (socket.room) {
      socket.leave(socket.room);
    }

    socket.room = data.room;
    socket.join(socket.room);
    socket.userID = data.userID;

    fn(socket.room, socket.userID);

    socket.broadcast.to(socket.room).emit('peer.connected', { id: data.userID });

    debug(`Peer connected to room ${data.room} with id: ${data.userID}`);
  });

  socket.on('msg', (data) => {
    if (data.to && users[data.to]) {
      debug(`Redirecting message to: ${data.to} by: ${data.by}`);

      users[data.to].emit('msg', data);
    } else {
      debug('Invalid user');
    }
  });

  socket.on('disconnect', (reason) => {
    debug(`Peer disconnected: ${reason}`);

    socket.broadcast.to(socket.room).emit('peed.disconnected', { id: socket.userID });
    delete users[socket.userID];
  });
});

io.listen(port);
