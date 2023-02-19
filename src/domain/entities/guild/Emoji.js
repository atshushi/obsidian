import { Base } from '../base.js';

export class Emoji extends Base {
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
     * @type {string?}
     */
    this.name = data.name;

    /**
     * @type {string[]}
     */
    this.roles = data.roles;

    /**
     * @type {boolean}
     */
    this.requireColons = data.require_colons;

    /**
     * @type {boolean}
     */
    this.managed = data.managed;

    /**
     * @type {boolean}
     */
    this.animated = data.animated;

    /**
     * @type {boolean}
     */
    this.available = data.available;
  }
}
