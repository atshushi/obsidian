import type { IDiscordClient } from '@types';

import { Application, Channel, Guild, Member, User } from '../index';
import { Base } from '../base';

export class Invite extends Base {
  code: string;
  guild: Guild;
  channel: Channel;
  inviter: User;
  targetType: number;
  targetUser: User;
  targetApplication: Application;
  presenceCount: number;
  memberCount: number;
  expiresAt: Date;
  stageInstance: {
    members: Member[];
    participant_count: number;
    speaker_count: number;
    topic: string;
  };
  guildScheduledEvent: {
    id: string;
    guild_id: string;
    channel_id: string | null;
    creator_id?: string | null;
    name: string;
    description?: string | null;
    scheduled_start_time: Date;
    scheduled_end_time: Date;
    privacy_level: number;
    status: number;
    entity_type: number;
    entity_id: string | null;
    entity_metadata: { location?: string } | null;
    creator?: User;
    user_count?: number;
    image?: string | null;
  };

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.code = data.code;
    this.guild = new Guild(data.guild);
    this.channel = new Channel(data.channel);
    this.inviter = new User(data.inviter);
    this.targetType = data.target_type;
    this.targetUser = new User(data.target_user);
    this.targetApplication = new Application(data.target_application);
    this.presenceCount = data.approximate_presence_count;
    this.memberCount = data.approximate_member_count;
    this.expiresAt = new Date(data.expires_at);
    this.stageInstance = data.stage_instance
      .map((members) => members.map((member) => new Member(this.client, this.guild, member)));
    this.guildScheduledEvent = data.guild_scheduled_event;
  }
}
