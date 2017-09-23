import WebSocket from 'ws';

export const broadcast = (ws, data, room) => {
  Object
    .values(room)
    .forEach((peer) => {
      if (ws !== peer && peer.readyState === WebSocket.OPEN) {
        peer.send(JSON.stringify(data));
      }
    });
};
