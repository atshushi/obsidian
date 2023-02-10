import type { IDiscordClient, IInteractionCommandDataOption } from '@types';

export class GuildCommands {
  client: IDiscordClient;
  data?: any;

  constructor(client: IDiscordClient, data?: any) {
    this.client = client;
    this.data = data;
  }

  create(command: IInteractionCommandDataOption) {
    this.client.rest.request('post', `/applications/${this.client.user.id}/guilds/${this.data.id}/commands`, command);
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
