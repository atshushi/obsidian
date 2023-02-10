import type { IDiscordClient, IGuildScheduledEvent, IStageInstance } from '@types';
import { Application, Channel, Guild, Member, User } from '../index';

export class Invite {
  client: IDiscordClient;
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
  stageInstance: IStageInstance;
  guildScheduledEvent: IGuildScheduledEvent;

  constructor(client: IDiscordClient, data?: any) {
    this.client = client;

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
