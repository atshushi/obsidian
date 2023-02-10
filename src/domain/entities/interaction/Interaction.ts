import type { IDiscordClient, IInteractionCommandData, IInteractionType } from '@types';

import { Channel, Guild, User, Member } from '../index';
import { Base } from '../base';

export class Interaction extends Base {
  id: string;
  applicationID: string;
  type: IInteractionType;
  command?: IInteractionCommandData;
  author?: Member | User;
  token: string;
  version: number;
  applicationPermissions?: string;
  locale?: string;

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.id = data.id;
    this.applicationID = data.application_id;
    this.type = data.type;
    this.command = data.data;
    // eslint-disable-next-line operator-linebreak
    this.author = data.member?.user ? new Member(this.client, this.guild, data.member) :
      new User(this.client, data.user);
    this.token = data.token;
    this.version = data.version;
    this.applicationPermissions = data.app_permissions;
    this.locale = data.locale;
  }

  get guild(): Guild {
    return this.client.guilds.get(this.data.guild_id);
  }

  get channel(): Channel {
    return this.guild.channels
      .find((channel) => channel.id === this.data.channel_id);
  }
}
