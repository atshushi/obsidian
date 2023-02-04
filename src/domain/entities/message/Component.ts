import type { IDiscordClient } from '@types';
import { Base } from '../base';

export class Component extends Base {
  type: number;
  components: {
    type: number;
    label: string;
    style: number;
    custom_id: string;
  }[];

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.type = data.type;
    this.components = data.components;
  }
}
