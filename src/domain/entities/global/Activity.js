import { Emoji } from '../index.js';

export class Activity {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {object} data
   */
  constructor(client, data = {}) {
    /**
     * @type {string}
     */
    this.name = data.name;

    /**
     * @type {number}
     */
    this.type = data.type;

    /**
     * @type {string?}
     */
    this.url = data.url;

    /**
     * @type {number}
     */
    this.createdAt = data.created_at;

    /**
     * @type {import('../../../../index').ActivityTimestamps}
     */
    this.timestamps = data.timestamps;

    /**
     * @type {string}
     */
    this.applicationID = data.application_id;

    /**
     * @type {string?}
     */
    this.details = data.details;

    /**
     * @type {string?}
     */
    this.state = data.state;

    /**
     * @type {Emoji}
     */
    this.emoji = new Emoji(client, data.emoji);

    /**
     * @type {import('../../../../index').ActivityParty}
     */
    this.party = data.party;

    /**
     * @type {import('../../../../index').ActivityAssets}
     */
    this.assets = data.assets?.map((asset) => ({
      largeImage: asset.large_image,
      largeText: asset.large_text,
      smallImage: asset.small_image,
      smallText: asset.small_text,
    }));

    /**
     * @type {import('../../../../index').ActivitySecrets}
     */
    this.secrets = data.secrets;

    /**
     * @type {boolean}
     */
    this.instance = data.instance;

    /**
     * @type {number}
     */
    this.flags = data.flags;

    /**
     * @type {import('../../../../index').ActivityButton}
     */
    this.buttons = data.buttons;
  }
}
