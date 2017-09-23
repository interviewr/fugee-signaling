import { broadcast } from '../utils';

export default (ws, data, rooms) => {
  if (rooms[data.roomID]) {
    broadcast(ws, data, rooms[data.roomID]);
  }
};
