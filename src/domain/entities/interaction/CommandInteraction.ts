import type { IDiscordClient, IMessagePayload } from '@types';
import { Interaction } from './Interaction';

export class CommandInteraction extends Interaction {
  constructor(client: IDiscordClient, data?: any) {
    super(client, data);
  }

  getOption(name: string) {
    return this.data.data.options
      .find((option) => option.name === name)
      .value;
  }

  respond(data: IMessagePayload) {
    this.client.rest.request('post', `/interactions/${this.id}/${this.token}/callback`, {
      type: 4,
      data,
    });
  }
}
