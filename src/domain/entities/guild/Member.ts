import type { IDiscordClient, IEditMemberParams } from '@types';

import { Guild, User } from '../index';
import { Base } from '../base';

export class Member extends Base {
  user?: User;
  nickname?: string | null;
  avatarHash?: string | null;
  roles: string[];
  joinedAt: Date;
  premiumSince: Date;
  isDeaf: boolean;
  isMuted: boolean;
  flags: number;
  isPending?: boolean;
  permissions?: string;
  muteTimeout?: Date | null;
  guild: Guild;

  constructor(client: IDiscordClient, guild: Guild, data?: any) {
    super(client, data);

    this.user = new User(this.client, data.user);
    this.nickname = data.nick;
    this.avatarHash = data.avatar;
    this.roles = data.roles;
    this.joinedAt = new Date(data.joined_at);
    this.premiumSince = new Date(data.premium_since);
    this.isDeaf = data.deaf;
    this.isMuted = data.mute;
    this.flags = data.flags;
    this.isPending = data.pending;
    this.permissions = data.permissions;
    this.muteTimeout = new Date(data.communication_disabled_until);
    this.guild = guild;
  }

  avatarURL(size = 2048) {
    return `https://cdn.discordapp.com/avatars/${this.user.id}/${this.avatarHash}.png?size=${size}`;
  }

  edit(data?: IEditMemberParams) {
    this.client.rest.request('patch', `/guilds/${this.guild.id}/members/${this.user.id}`, data);
  }

  addRole(id: string) {
    this.client.rest.request('put', `/guilds/${this.guild.id}/members/${this.user.id}/roles/${id}`);
  }

  removeRole(id: string) {
    this.client.rest.request('delete', `/guilds/${this.guild.id}/members/${this.user.id}/roles/${id}`);
  }

  kick(reason?: string) {
    this.client.rest.request('delete', `/guilds/${this.guild.id}/members/${this.user.id}`, null, reason);
  }

  ban(reason?: string) {
    this.client.rest.request('put', `/guilds/${this.guild.id}/bans/${this.user.id}`, null, reason);
  }

  unban() {
    this.client.rest.request('delete', `/guilds/${this.guild.id}/bans/${this.user.id}`);
  }

  timeout(time: string, reason?: string) {
    this.client.rest.request('patch', `/guilds/${this.guild.id}/members/${this.user.id}`, {
      communication_disabled_until: time,
    }, reason);
  }
}
