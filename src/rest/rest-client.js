import { fetch } from 'undici';

export class RestClient {
  constructor(client) {
    this.client = client;
  }

  async request(method, path, data = {}, reason = '') {
    const response = await fetch(`https://discord.com/api/v10${path}`, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-Audit-Log-Reason': reason,
        Authorization: `Bot ${this.client.token}`,
      },
    });

    if (!response.body) return null;
    return response.json();
  }
}
