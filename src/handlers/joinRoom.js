import { broadcast } from '../utils';

export default (ws, data, rooms) => {
  if (!rooms[data.roomID]) {
    rooms[data.roomID] = {};
  }
  rooms[data.roomID][data.userID] = ws;
  broadcast(ws, data, rooms[data.roomID]);
};
