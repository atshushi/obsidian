import type { IComponent, IDiscordClient } from '@types';

export class Component {
  type: number;
  components: IComponent[];

  constructor(_client: IDiscordClient, data?: any) {
    this.type = data.type;
    this.components = data.components;
  }
}
