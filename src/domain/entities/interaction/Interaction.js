import { User, Member } from '../index.js';
import { Base } from '../base.js';

export class Interaction extends Base {
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
     * @type {string}
     */
    this.applicationID = data.application_id;

    /**
     * @type {1 | 2 | 3 | 4 | 5}
     */
    this.type = data.type;

    /**
     * @type {import('../../../../index.js').GuildCommandDataOptions}
     */
    this.command = data.data;

    /*
     * @type {Member | User}
     */
    // eslint-disable-next-line operator-linebreak
    this.author = data.member?.user ? new Member(this.client, this.guild, data.member) :
      new User(this.client, data.user);

    /**
     * @type {string}
     */
    this.token = data.token;

    /**
     * @type {number}
     */
    this.version = data.version;

    /**
     * @type {string}
     */
    this.applicationPermissions = data.app_permissions;

    /**
     * @type {string}
     */
    this.locale = data.locale;
  }

  /**
   * @type {import('../index.js').Guild}
   */
  get guild() {
    return this.client.guilds.get(this.data.guild_id);
  }

  /**
   * @type {import('../index.js').Channel}
   */
  get channel() {
    return this.guild.channels
      .find((channel) => channel.id === this.data.channel_id);
  }
}
