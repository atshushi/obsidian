import {
  Attachment,
  Channel,
  Component,
  Interaction,
  Role,
  Sticker,
  User,
  Member,
  Application,
  MessagePayload,
} from '../index.js';
import { Base } from '../base.js';

export class Message extends Base {
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
     * @type {Member | User}
     */
    // eslint-disable-next-line operator-linebreak
    this.author = data.interaction.member?.user ? new Member(this.client, this.guild, data.member) :
      new User(this.client, data.interaction.user);

    /**
     * @type {string}
     */
    this.content = data.content;

    /**
     * @type {Date}
     */
    this.sentedAt = new Date(data.timestamp);

    /**
     * @type {Date}
     */
    this.editedAt = new Date(data.edited_timestamp);

    /**
     * @type {boolean}
     */
    this.isTTS = data.tts;

    /**
     * @type {boolean}
     */
    this.hasEveryoneMention = data.mention_everyone;

    /**
     * @type {User[]}
     */
    this.mentions = data.mentions
      .map((user) => new User(this.client, user));

    /**
     * @type {string[]}
     */
    this.roleMentions = data.mention_roles.map((role) => new Role(this.client, this.guild, role));

    /**
     * @type {import('../../../../index').MessageChannelMentions}
     */
    this.channelMentions = {
      id: data.data.mention_channels.id,
      guildID: data.mention_channels.guild_id,
      type: data.mention_channels.type,
      name: data.mention_channels.name,
    };

    /**
     * @type {Attachment[]}
     */
    this.attachments = data.attachments
      .map((attachment) => new Attachment(this.client, attachment));

    /**
     * @type {Embed[]}
     */
    this.embeds = data.embeds;

    /**
     * @type {import('../../../../index').MessageReaction}
     */
    this.reaction = data.reactions;

    /**
     * @type {number | string}
     */
    this.nonce = data.nonce;

    /**
     * @type {boolean}
     */
    this.isPinned = data.pinned;

    /**
     * @type {string}
     */
    this.webhookID = data.webhook_id;

    /**
     * @type {number}
     */
    this.type = data.type;

    /**
     * @type {import('../../../../index').MessageActivity}
     */
    this.activity = {
      type: data.activity.type,
      partyID: data.activity.party_id,
    };

    /**
     * @type {Application}
     */
    this.application = new Application(this.client, data.application);

    /**
     * @type {import('../../../../index').MessageReference}
     */
    this.messageReference = data.message_reference ?? {
      guildID: this.guild?.id ?? null,
      channelID: this.channel?.id ?? data.channel_id,
      messageID: this.id,
      faiIfNotExists: data.message_reference.fail_if_not_exists,
    };

    /**
     * @type {number}
     */
    this.flags = data.flags;

    /**
     * @type {Message?}
     */
    this.referencedMessage = data.referencedMessage ?? new Message(data.referenced_message);

    /**
     * @type {Interaction?}
     */
    this.interaction = data.interaction ?? new Interaction(this.client, data.interaction);

    /**
     * @type {Channel?}
     */
    this.thread = data.thread ?? new Channel(this.client, data.thread);

    /**
     * @type {Component[]}
     */
    this.components = data.components.map((component) => new Component(this.client, component));

    /**
     * @type {import('../../../../index').MessageStickerItems}
     */
    this.stickerItems = {
      id: data.sticker_items.id,
      name: data.sticker_items.name,
      formatType: data.sticker_items.format_type,
    };

    /**
     * @type {Sticker?}
     */
    this.stickers = data.stickers ?? data.stickers.map((sticker) => new Sticker(this.client, sticker));

    /**
     * @type {number}
     */
    this.position = data.position;

    /**
     * @type {import('../../../../index').BoostRoleData}
     */
    this.boostRoleData = {
      roleSubscriptionListingID: data.role_subscription_data.role_subscription_listing_id,
      tierName: data.role_subscription_data.tier_name,
      totalMonthsSubscribed: data.role_subscription_data.total_months_subscribed,
      isRenewal: data.role_subscription_data.is_renewal,
    };
  }

  /**
   * @type {Guild}
   */
  get guild() {
    // eslint-disable-next-line operator-linebreak
    return this.client.guilds.get(this.messageReference?.guild_id) ??
      this.client.guilds.find((guild) => guild.channels.find((channel) => channel.id === this.data.channel_id));
  }

  /**
   * @type {Channel}
   */
  get channel() {
    return this.guild.channels.find((channel) => channel.id === this.data.channel_id);
  }

  crossPost() {
    this.client.rest.request('post', `/channels/${this.channel.id}/messages/${this.id}/crosspost`);
  }

  /**
   *
   * @param {string} emoji
   */
  react(emoji) {
    this.client.rest.request('put', `/channels/${this.channel.id}/messages/${this.id}/reactions/${emoji}/@me`);
  }

  /**
   *
   * @param {string} emoji
   * @param {string} [id]
   */
  removeReaction(emoji, id) {
    if (id)
      this.client.rest.request('delete', `/channels/${this.channel.id}/messages/${this.id}/reactions/${emoji}/${id}`);

    this.client.rest.request('delete', `/channels/${this.channel.id}/messages/${this.id}/reactions/${emoji}/@me`);
  }

  /**
   *
   * @param {string} emoji
   * @returns {User[]}
   */
  async getReactions(emoji) {
    const response = await this.client.rest
      .request('get', `/channels/${this.channel.id}/messages/${this.id}/reactions/${emoji}`);

    return response.map((user) => new User(this.client, user));
  }

  /**
   *
   * @param {MessagePayload} data
   */
  edit(data) {
    this.client.rest.request(
      'patch',
      `/channels/${this.channel.id}/messages/${this.id}`,
      new MessagePayload(this.client, data).resolve(),
    );
  }

  /**
   *
   * @param {MessagePayload} data
   */
  reply(data) {
    this.client.rest.request(
      'post',
      `/channels/${this.channel.id}/messages`,
      new MessagePayload(this.client, data).resolve(),
    );
  }

  delete() {
    this.client.rest.request('delete', `/channels/${this.channel.id}/messages/${this.id}`);
  }

  pin() {
    this.client.rest.request('put', `/channels/${this.channel.id}/pins/${this.id}`);
  }

  unpin() {
    this.client.rest.request('delete', `/channels/${this.channel.id}/pins/${this.id}`);
  }

  /**
   *
   * @param {string} name
   */
  startThread(name) {
    this.client.rest.request('post', `/channels/${this.channel.id}/messages/${this.id}/threads`, { name });
  }
}
