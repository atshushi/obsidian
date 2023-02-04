import type { IDiscordClient } from '@types';
import { fetch, Dispatcher } from 'undici';

export class RestClient {
  #client: IDiscordClient;

  constructor(client: IDiscordClient) {
    this.#client = client;
  }

  async request(method: Dispatcher.HttpMethod, path: string, data?: unknown, reason?: string) {
    const response = await fetch(`https://discord.com/api/v10${path}`, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-Audit-Log-Reason': reason ?? '',
        Authorization: `Bot ${this.#client.token}`,
      },
    });

    return response.json() ?? null;
  }
}
