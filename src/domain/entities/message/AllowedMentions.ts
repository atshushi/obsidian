import type { IDiscordClient } from '@types';
import { Base } from '../base';

export class AllowedMentions extends Base {
  parse: 'roles' | 'users' | 'everyone';
  roles: string[];
  users: string[];
  replied: boolean;

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.parse = data.parse;
    this.roles = data.roles;
    this.users = data.users;
    this.replied = data.replied_user;
  }
}
