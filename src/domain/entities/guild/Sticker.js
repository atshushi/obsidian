import { User } from '../index.js';
import { Base } from '../base.js';

export class Sticker extends Base {
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
    this.packID = data.pack_id;

    /**
     * @type {string}
     */
    this.name = data.name;

    /**
     * @type {string?}
     */
    this.description = data.description;

    /**
     * @type {string}
     */
    this.tags = data.tags;

    /**
     * @type {string}
     */
    this.asset = data.asset;

    /**
     * @type {number}
     */
    this.type = data.type;

    /**
     * @type {number}
     */
    this.formatType = data.format_type;

    /**
     * @type {boolean}
     */
    this.available = data.available;

    /**
     * @type {User}
     */
    this.user = new User(this.client, data.user);

    /**
     * @type {number}
     */
    this.sortValue = data.sort_value;
  }

  /**
   * @type {import('../index').Guild}
   */
  get guild() {
    return this.client.guilds.get(this.data.guild_id);
  }

  /**
   *
   * @param {import('../../../../index').GuildCreateStickerOptions} data
   */
  edit(data) {
    this.client.rest.request('patch', `/guilds/${this.guild.id}/stickers/${this.id}`, data);
  }

  delete() {
    this.client.rest.request('delete', `/guilds/${this.guild.id}/stickers/${this.id}`);
  }
}
