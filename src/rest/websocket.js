import process from 'node:process';
import WebSocket from 'ws';

import { parseIntents } from '../utils/gateway-intents.js';
import { heartbeat } from './methods/heartbeat.js';
import { dispatch } from './methods/dispatch.js';

export class RestWS {
  constructor(client) {
    this.client = client;
  }

  connect() {
    const ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

    ws.on('open', () => this.#handleOpen(ws));
    ws.on('message', (message) => this.#handleMessage(ws, message));
    ws.on('error', (err) => this.client.emit('error', err));
  }

  #handleMessage(ws, message) {
    const payload = JSON.parse(message.toString());

    switch (payload.op) {
      case 10:
        heartbeat(ws, payload.d.heartbeat_interval);
        break;
      case 0:
        dispatch(this.client, payload);
        break;
    }
  }

  #handleOpen(ws) {
    const presence = this.client.options?.presence ? this.client.options.presence : {};
    const intents = parseIntents(this.client.options?.intents) ?? 0;

    ws.send(JSON.stringify({
      op: 2,
      d: {
        token: this.client.token,
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
