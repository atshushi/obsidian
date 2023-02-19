import { User } from '../index.js';
import { Base } from '../base.js';

export class GuildScheduled extends Base {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {object} data
   */
  constructor(client, data = {}) {
    super(client, data);

    /**
     * @type {string}
     */
    this.id = data.id;

    /**
     * @type {User}
     */
    this.creator = data.creator ?? new User(client, data.creator);

    /**
     * @type {string}
     */
    this.name = data.name;

    /**
     * @type {string?}
     */
    this.description = data.description;

    /**
     * @type {Date}
     */
    this.scheduledStartTime = new Date(data.scheduled_start_time);

    /**
     * @type {Date?}
     */
    this.scheduledEndTime = new Date(data.scheduled_end_time);

    /**
     * @type {number}
     */
    this.privacyLevel = data.privacy_level;

    /**
     * @type {1 | 2 | 3 | 4}
     */
    this.status = data.status;

    /**
     * @type {1 | 2 | 3}
     */
    this.entityType = data.entity_type;

    /**
     * @type {string?}
     */
    this.entityID = data.entity_id;

    /**
     * @type {{ location?: string }?}
     */
    this.entityMetadata = data.entity_metadata;

    /**
     * @type {number}
     */
    this.userCount = data.user_count;

    /**
     * @type {string?}
     */
    this.image = data.image;
  }

  /**
   * @type {import('../index').Guild}
   */
  get guild() {
    return this.client.guilds.get(this.data.guild_id);
  }

  /**
   * @type {import('../index').Channel}
   */
  get channel() {
    return this.guild.channels
      .find((channel) => channel.id === this.data.channel_id);
  }
}
