import type { ICreateRolesParams, IDiscordClient } from '@types';

import { Guild } from '../index';
import { Base } from '../base';

export class Role extends Base {
  id: string;
  name: string;
  color: number;
  isPinned: boolean;
  iconHash?: string | null;
  emoji?: string | null;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags: {
    bot_id?: string;
    integration_id?: string;
    premium_subscriber?: null;
    subscription_listing_id?: string;
    available_for_purchase?: null;
    guild_connections?: null;
  };
  guild: Guild;

  constructor(client: IDiscordClient, guild: Guild, data?: any) {
    super(client, data);

    this.id = data.id;
    this.name = data.name;
    this.color = data.color;
    this.isPinned = data.hoist;
    this.iconHash = data.icon;
    this.emoji = data.unicode_emoji;
    this.position = data.position;
    this.permissions = data.permissions;
    this.managed = data.managed;
    this.mentionable = data.mentionable;
    this.tags = data.tags;
    this.guild = guild;
  }

  iconURL(size = 2048) {
    return `https://cdn.discordapp.com/icons/${this.id}/${this.iconHash}.png?size=${size}`;
  }

  modifyPosition(position: number) {
    this.client.rest.request('patch', `/guilds/${this.guild.id}/roles`, {
      id: this.id,
      position,
    });
  }

  edit(data?: ICreateRolesParams) {
    this.client.rest.request('patch', `/guilds/${this.guild.id}/roles/${this.id}`, data);
  }

  delete() {
    this.client.rest.request('delete', `/guilds/${this.guild.id}/roles/${this.id}`);
  }
}
