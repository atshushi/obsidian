import { Application, Channel, Guild, GuildScheduled, Member, User } from '../index.js';

export class Invite {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {object} data
   */
  constructor(_client, data = {}) {
    /**
     * @type {string}
     */
    this.code = data.code;

    /**
     * @type {Guild}
     */
    this.guild = new Guild(data.guild);

    /**
     * @type {Channel}
     */
    this.channel = new Channel(data.channel);

    /**
     * @type {User}
     */
    this.inviter = new User(data.inviter);

    /**
     * @type {number}
     */
    this.targetType = data.target_type;

    /**
     * @type {User}
     */
    this.targetUser = new User(data.target_user);

    /**
     * @type {Application}
     */
    this.targetApplication = new Application(data.target_application);

    /**
     * @type {number}
     */
    this.presenceCount = data.approximate_presence_count;

    /**
     * @type {number}
     */
    this.memberCount = data.approximate_member_count;

    /**
     * @type {Date}
     */
    this.expiresAt = new Date(data.expires_at);

    /**
     * @type {import('../../../../index').StageInstance}
     */
    this.stageInstance = {
      participantCount: data.stageInstance.participant_count,
      speakerCount: data.stageInstance.speaker_count,
      topic: data.stageInstance.topic,
      members: data.stageInstance.members
        .map((member) => new Member(this.client, this.guild, member)),
    };

    /**
     * @type {GuildScheduled}
     */
    this.guildScheduledEvent = new GuildScheduled(this.client, data.guild_scheduled_event);
  }
}
