import type { IDiscordClient, IInteractionCommandData, IInteractionType } from '@types';

import { Channel, Guild, Member } from '../index';
import { Base } from '../base';

export class Interaction extends Base {
  id: string;
  applicationID: string;
  type: IInteractionType;
  commandData?: IInteractionCommandData;
  member?: Member;
  token: string;
  version: number;
  applicationPermissions?: string;
  locale?: string;

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.id = data.id;
    this.applicationID = data.application_id;
    this.type = data.type;
    this.commandData = data.data;
    this.member = new Member(this.client, this.guild, data.member);
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
