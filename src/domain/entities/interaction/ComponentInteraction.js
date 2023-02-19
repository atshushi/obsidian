import { Member, Message } from '../index.js';
import { Base } from '../base.js';

export class ComponentInteraction extends Base {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {object} data
   */
  constructor(client, data = {}) {
    super(client, data);

    this.version = data.version;
    this.type = data.type;
    this.token = data.token;
    this.message = new Message(this.client, data.message);
    this.member = new Member(this.client, this.guild, data.member);
    this.id = data.id;
    this.componentData = data.data;
    this.applicationID = data.application_id;
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
