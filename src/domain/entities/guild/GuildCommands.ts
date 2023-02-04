import type { IDiscordClient, IInteractionCommandDataOption } from '@types';
import { Base } from '../base';

export class GuildCommands extends Base {
  guildID: string;

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.guildID = data.id;
  }

  create(command: IInteractionCommandDataOption) {
    this.client.rest.request('post', `/applications/${this.client.user.id}/guilds/${this.guildID}/commands`, command);
  }

  deleteCommand(id: string, data: IInteractionCommandDataOption) {
    this.client.rest.request(
      'delete',
      `/applications/${this.client.user.id}/guilds/${this.data.id}/commands/${id}`,
      data,
    );
  }

  editCommand(id: string, data: IInteractionCommandDataOption) {
    this.client.rest.request(
      'patch',
      `/applications/${this.client.user.id}/guilds/${this.data.id}/commands/${id}`,
      data,
    );
  }
}
