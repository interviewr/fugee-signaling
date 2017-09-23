import { Server } from 'ws';
import debug from 'debug';
import actions from './constants';
import {
  joinHandler,
  leaveHandler,
  candidateHandler,
  offerHandler,
  answerHandler,
} from './handlers';

const logger = debug('fugee');
const port = process.env.PORT || 3334;
const wss = new Server({ port });

// const users = {};
const rooms = {};

wss.on('connection', (ws) => {
  logger('New connection');

  ws.on('message', (message) => {
    let data;

    try {
      data = JSON.parse(message);
    } catch (error) {
      data = {};
      logger('Error while parsing json');
    }

    switch (data.type) {
      case actions.JOIN_ROOM:
        logger(`Peer ${data.userID} connected to room ${data.roomID}`);
        joinHandler(ws, data, rooms);
        break;
      case actions.LEAVE_ROOM:
        logger(`Peer ${data.userID} left the room ${data.roomID}`);
        leaveHandler(ws, data, rooms);
        break;
      case actions.CANDIDATE:
        logger(`Sending candidate to all peers in room ${data.roomID}`);
        candidateHandler(ws, data, rooms);
        break;
      case actions.OFFER:
      logger(`Sending offer to all peers in room ${data.roomID}`);
        offerHandler(ws, data, rooms);
        break;
      case actions.ANSWER:
      logger(`Sending answer to all peers in room ${data.roomID}`);
        answerHandler(ws, data, rooms);
        break;
      default:
        ws.send(message);
        break;
    }
  });

  ws.on('close', () => {
    logger('Disconnected');
  });
});

wss.on('listening', () => {
  logger(`Signalling server is listening on ${port} port`);
});
