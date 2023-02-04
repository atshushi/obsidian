import type { IDiscordClient } from '@types';
import WebSocket from 'ws';

import { OPCodes } from '../utils/opcodes';
import { parseIntents } from '../utils/gateway-intents';

import { dispatch } from './methods/dispatch';
import { heartbeat } from './methods/heartbeat';

export class RestWS {
  #client: IDiscordClient;

  constructor(client: IDiscordClient) {
    this.#client = client;
  }

  connect(): void {
    const ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

    ws.on('open', () => this.#handleOpen(ws));
    ws.on('message', (message) => this.#handleMessage(ws, message));
    ws.on('error', (err) => this.#client.emit('error', err));
  }

  #handleMessage(ws: WebSocket, message: WebSocket.RawData): void {
    const payload = JSON.parse(message.toString());

    switch (payload.op) {
      case OPCodes.HELLO:
        heartbeat(ws, payload.d.heartbeat_interval);
        break;

      case OPCodes.DISPATCH:
        dispatch(this.#client, payload);
        break;
    }
  }

  #handleOpen(ws: WebSocket) {
    const presence = this.#client.options?.presence ? this.#client.options.presence : {};
    const intents = parseIntents(this.#client.options?.intents) ?? 0;

    ws.send(JSON.stringify({
      op: OPCodes.IDENTIFY,
      d: {
        token: this.#client.token,
        intents,
        presence,
        properties: {
          os: process.platform,
          browser: 'obsidian',
          device: 'obsidian',
        },
      },
    }));
  }
}
