import type { IDiscordClient, IEditWebhook, IMessagePayload } from '@types';

import { User } from '../index';
import { Base } from '../base';

export class Webhook extends Base {
  id: string;
  type: number;
  author: User;
  name: string | null;
  avatar: string | null;
  token?: string;
  applicationID: string | null;
  url?: string;

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.id = data.id;
    this.type = data.type;
    this.author = new User(this.client, data.user);
    this.name = data.name;
    this.avatar = data.avatar;
    this.token = data.token;
    this.applicationID = data.application_id;
    this.url = data.url;
  }

  get guild() {
    return this.client.guilds
      .get(this.data.guild_id);
  }

  get channel() {
    return this.guild.channels
      .find((channel) => channel.id === this.data.channelID);
  }

  edit(data: IEditWebhook) {
    this.client.rest
      .request('patch', `/webhooks/${this.id}`, {
        name: data.name ? data.name : this.name,
        avatar: data.avatar ? data.avatar : this.avatar,
        channel_id: this.channel.id,
      });
  }

  delete() {
    return this.client.rest.request('delete', `/webhooks/${this.id}`);
  }

  sendMessage(data: IMessagePayload) {
    return this.client.rest.request('post', `/webhooks/${this.id}/${this.token}`, data);
  }

  editMessage(id: string, data: IMessagePayload) {
    return this.client.rest.request('patch', `/webhooks/${this.id}/${this.token}/messages/${id}`, data);
  }

  deleteMessage(id: string) {
    return this.client.rest.request('delete', `/webhooks/${this.id}/${this.token}/messages/${id}`);
  }
}
