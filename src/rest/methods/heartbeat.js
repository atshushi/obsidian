import { OPCodes } from '../../utils/opcodes.js';

export const heartbeat = (websocket, interval) => {
  setInterval(() => {
    websocket.send(JSON.stringify({
      op: OPCodes.HEARTBEAT,
      d: null,
    }));
  }, interval);
};
