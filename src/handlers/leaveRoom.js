export default (ws, data, rooms) => {
  if (rooms[data.roomID] && rooms[data.roomID][data.userID]) {
    const connection = rooms[data.roomID][data.userID];
    connection.terminate();
    delete rooms[data.roomID][data.userID];
  }
};
