import { Base } from '../base.js';

export class Role extends Base {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {Guild} guild
   * @arg {object} data
   */
  constructor(client, guild, data = {}) {
    super(client, data);

    /**
     * @type {string}
     */
    this.id = data.id;

    /**
     * @type {string}
     */
    this.name = data.name;

    /**
     * @type {number}
     */
    this.color = data.color;

    /**
     * @type {boolean}
     */
    this.isPinned = data.hoist;

    /**
     * @type {string?}
     */
    this.iconHash = data.icon;

    /**
     * @type {string?}
     */
    this.emoji = data.unicode_emoji;

    /**
     * @type {number}
     */
    this.position = data.position;

    /**
     * @type {string}
     */
    this.permissions = data.permissions;

    /**
     * @type {boolean}
     */
    this.managed = data.managed;

    /**
     * @type {boolean}
     */
    this.mentionable = data.mentionable;

    /**
     * @type {import('../../../../index').GuildRoleTags}
     */
    this.tags = {
      botID: data.tags.bot_id,
      integrationID: data.tags.integration_id,
      premiumSubscriber: data.tags.premium_subscriber,
      subscriptionListingID: data.tags.subscription_listing_id,
      availableForPurchase: data.available_for_purchase,
      guildConnections: data.guild_connections,
    };

    /**
     * @type {import('../index').Guild}
     */
    this.guild = guild;
  }

  iconURL(size = 2048) {
    return `https://cdn.discordapp.com/icons/${this.id}/${this.iconHash}.png?size=${size}`;
  }

  /**
   *
   * @param {number} position
   */
  modifyPosition(position) {
    this.client.rest.request('patch', `/guilds/${this.guild.id}/roles`, {
      id: this.id,
      position,
    });
  }

  /**
   *
   * @param {import('../../../../index').GuildRoleEditOptions} data
   */
  edit(data) {
    this.client.rest.request('patch', `/guilds/${this.guild.id}/roles/${this.id}`, {
      name: data.name,
      permissions: data.permissions,
      color: data.color,
      hoist: data.hoist,
      icon: data.icon,
      unicode_emoji: data.unicodeEmoji,
      mentionable: data.mentionable,
    });
  }

  delete() {
    this.client.rest.request('delete', `/guilds/${this.guild.id}/roles/${this.id}`);
  }
}
