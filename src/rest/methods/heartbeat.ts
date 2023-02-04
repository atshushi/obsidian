import WebSocket from 'ws';
import { OPCodes } from '../../utils/opcodes';

export const heartbeat = (websocket: WebSocket, interval: number) => {
  setInterval(() => {
    websocket.send(JSON.stringify({
      op: OPCodes.HEARTBEAT,
      d: null,
    }));
  }, interval);
};
