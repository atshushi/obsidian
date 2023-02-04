import { IDiscordClient } from '@types';

export abstract class Base {
  client: IDiscordClient;
  data: any;

  constructor(client: IDiscordClient, data: any) {
    this.client = client;
    this.data = data;
  }

  get createdAt() {
    // eslint-disable-next-line no-mixed-operators
    return new Date(~~(this.data.id / 4194304 + 1420070400000));
  }

  equalsTo(data: any) {
    return this.data.id === data.id;
  }
}
