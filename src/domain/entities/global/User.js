import { Base } from '../base.js';

export class User extends Base {
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
    this.username = data.username;

    /**
     * @type {string}
     */
    this.discriminator = data.discriminator;

    /**
     * @type {string?}
     */
    this.avatarHash = data.avatar;

    /**
     * @type {boolean}
     */
    this.isBot = data.bot || false;

    /**
     * @type {boolean}
     */
    this.system = data.system;

    /**
     * @type {boolean}
     */
    this.MFAEnabled = data.mfa_enabled;

    /**
     * @type {string?}
     */
    this.bannerHash = data.banner;

    /**
     * @type {number?}
     */
    this.accentColor = data.accent_color;

    /**
     * @type {string}
     */
    this.locale = data.locale;

    /**
     * @type {number}
     */
    this.flags = data.flags;

    /**
     * @type {number}
     */
    this.premiumType = data.premium_type;

    /**
     * @type {number}
     */
    this.publicFlags = data.public_flags;
  }

  get tag() {
    return `${this.username}#${this.discriminator}`;
  }

  bannerURL(size = 2048) {
    return `https://cdn.discordapp.com/banners/${this.id}/${this.bannerHash}.png?size=${size}`;
  }

  avatarURL(size = 2048) {
    return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatarHash}.png?size=${size}`;
  }

  toMention() {
    return `<@${this.id}>`;
  }
}
