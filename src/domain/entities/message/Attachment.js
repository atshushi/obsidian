import { Base } from '../base.js';

export class Attachment extends Base {
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
    this.filename = data.filename;

    /**
     * @type {string}
     */
    this.description = data.description;

    /**
     * @type {string}
     */
    this.contentType = data.content_type;

    /**
     * @type {number}
     */
    this.size = data.size;

    /**
     * @type {string}
     */
    this.url = data.url;

    /**
     * @type {string}
     */
    this.proxyURL = data.proxy_url;

    /**
     * @type {number?}
     */
    this.height = data.height;

    /**
     * @type {number?}
     */
    this.width = data.width;

    /**
     * @type {boolean}
     */
    this.ephemeral = data.ephemeral;
  }
}
