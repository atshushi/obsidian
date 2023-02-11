import type { IDiscordClient, IEntityMetadata } from '@types';
import { User } from '../index';

export class GuildScheduled {
  client: IDiscordClient;
  data?: any;
  id: string;
  creator?: User;
  name: string;
  description?: string | null;
  scheduledStartTime: Date;
  scheduledEndTime: Date | null;
  privacyLevel: 2;
  status: 1 | 2 | 3 | 4;
  entityType: 1 | 2 | 3;
  entityID: string | null;
  entityMetadata: IEntityMetadata | null;
  userCount?: number;
  image?: string | null;

  constructor(client: IDiscordClient, data?: any) {
    this.client = client;
    this.data = data;

    this.id = data.id;
    this.creator = data.creator ?? new User(client, data.creator);
    this.name = data.name;
    this.description = data.description;
    this.scheduledStartTime = new Date(data.scheduled_start_time);
    this.scheduledEndTime = new Date(data.scheduled_end_time);
    this.privacyLevel = data.privacy_level;
    this.status = data.status;
    this.entityType = data.entity_type;
    this.entityID = data.entity_id;
    this.entityMetadata = data.entity_metadata;
    this.userCount = data.user_count;
    this.image = data.image;
  }

  get guild() {
    return this.client.guilds.get(this.data.guild_id);
  }

  get channel() {
    return this.guild.channels.find((channel) => channel.id === this.data.channel_id);
  }
}
