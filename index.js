const io = require('socket.io')();
const uuid = require('node-uuid');
const debug = require('debug')('fugee');

const port = process.env.PORT || 3334;
const rooms = {};
const userIds = {};

io.on('connection', (socket) => {
  debug(`Received a new connection`);

  let currentRoom;
  let id;

  socket.on('init', (data, fn) => {
    currentRoom = (data || {}).room || uuid.v4();
    const room = rooms[currentRoom];

    if (!data) {
      rooms[currentRoom] = [socket];
      id = userIds[currentRoom] = 0;
      fn(currentRoom, id);

      debug(`Room created with id: ${currentRoom}`);
    } else {
      if (!room) return;

      userIds[currentRoom] += 1;
      id = userIds[currentRoom];
      fn(currentRoom, id);

      room.forEach((s) => {
        s.emit('peer.connected', { id });
      });

      room[id] = socket;
      debug(`Peer connected to room ${currentRoom} with id: ${id}`);
    }
  });

  socket.on('msg', (data) => {
    const to = Number.parseInt(data.to, 10);

    if (rooms[currentRoom] && rooms[currentRoom][to]) {
      debug(`Redirecting message to: ${to} by: ${data.by}`);
      rooms[currentRoom][to].emit('msg', data);
    } else {
      debug('Invalid user');
    }
  });

  socket.on('disconnect', () => {
    if (!currentRoom && !rooms[currentRoom]) return;

    delete rooms[currentRoom][rooms[currentRoom].indexOf(socket)];
    rooms[currentRoom].forEach((socket) => {
      socket.emit('peed.disconnected', { id });
    });
  });
});

io.listen(port);
