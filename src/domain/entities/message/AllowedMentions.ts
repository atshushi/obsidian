import type { IDiscordClient } from '@types';

export class AllowedMentions {
  parse: 'roles' | 'users' | 'everyone';
  roles: string[];
  users: string[];
  replied: boolean;

  constructor(_client: IDiscordClient, data?: any) {
    this.parse = data.parse;
    this.roles = data.roles;
    this.users = data.users;
    this.replied = data.replied_user;
  }
}
