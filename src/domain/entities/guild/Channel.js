import { MessagePayload, Member, Message, Invite, Webhook } from '../index.js';
import { Base } from '../base.js';

export class Channel extends Base {
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
     * @type {number}
     */
    this.type = data.type;

    /**
     * @type {number}
     */
    this.position = data.position;

    /**
     * @type {import('../../../../index').PermissionsOverwrite}
     */
    this.permissionOverwrites = data.permission_overwrites;

    /**
     * @type {string?}
     */
    this.name = data.name;

    /**
     * @type {string?}
     */
    this.topic = data.topic;

    /**
     * @type {boolean}
     */
    this.isNsfw = data.nsfw;

    /**
     * @type {string?}
     */
    this.lastMessageID = data.last_message_id;

    /**
     * @type {number}
     */
    this.bitrate = data.bitrate;

    /**
     * @type {number}
     */
    this.userLimit = data.user_limit;

    /**
     * @type {number}
     */
    this.rateLimit = data.rate_limit_per_user;

    /**
     * @type {string?}
     */
    this.icon = data.icon;

    /**
     * @type {string}
     */
    this.ownerID = data.owner_id;

    /**
     * @type {string}
     */
    this.applicationID = data.application_id;

    /**
     * @type {string?}
     */
    this.categoryID = data.parent_id;

    /**
     * @type {Date?}
     */
    this.lastPin = new Date(data.last_pin_timestamp);

    /**
     * @type {string?}
     */
    this.region = data.rtc_region;

    /**
     * @type {number}
     */
    this.videoQuality = data.video_quality_mode;

    /**
     * @type {number}
     */
    this.messageCount = data.message_count;

    /**
     * @type {number}
     */
    this.memberCount = data.member_count;

    /**
     * @type {import('../../../../index').ChannelThreadMetadata}
     */
    this.threadData = {
      archived: data.thread_metadata?.archived,
      autoArchiveDuration: data.thread_metadata?.auto_archive_duration,
      archiveTimestamp: data.thread_metadata?.archive_timestamp,
      locked: data.thread_metadata?.locked,
      invitable: data.thread_metadata?.invitable,
      createTimestamp: data.thread_metadata?.createTimestamp,
    };

    /**
     * @type {number}
     */
    this.autoArchiveDuration = data.default_auto_archive_duration;

    /**
     * @type {string}
     */
    this.permissions = data.permissions;

    /**
     * @type {number}
     */
    this.flags = data.flags;

    /**
     * @type {number}
     */
    this.totalMessageCount = data.total_message_sent;

    /**
     * @type {import('../../../../index').ChannelAvaliableTags}
     */
    this.avaliableTags = data.available_tags?.map((tag) => ({
      id: tag.id,
      name: tag.name,
      moderated: tag.moderated,
      emojiID: tag.emoji_id,
      emojiName: tag.emoji_name,
    }));

    /**
     * @type {string[]}
     */
    this.appliedsID = data.applied_tags;

    /**
     * @type {import('../../../../index').ChannelDefaultReact}
     */
    this.defaultReact = {
      emojiID: data.default_reaction_emoji?.emoji_id,
      emojiName: data.default_reaction_emoji?.emoji_name,
    };

    /**
     * @type {number}
     */
    this.threadRateLimit = data.default_thread_rate_limit_per_user;

    /**
     * @type {number?}
     */
    this.sortOrder = data.default_sort_order;

    /**
     * @type {number}
     */
    this.fourmLayout = data.default_forum_layout;
  }

  /**
   * @type {import('../index').Guild}
   */
  get guild() {
    return this.client.guilds.get(this.data.guild_id);
  }

  /**
   *
   * @param {import('../../../../index').ChannelEditOptions} data
   */
  edit(data) {
    this.client.rest.request('patch', `/channels/${this.id}`, {
      name: data.name,
      icon: data.icon,
      type: data.type,
      position: data.position,
      topic: data.topic,
      nsfw: data.nsfw,
      rate_limit_per_user: data.rateLimitPerUser,
      bitrate: data.bitrate,
      user_limit: data.userLimit,
      permission_overwrites: data.permissionOverwrites,
      parent_id: data.parentID,
      rtc_region: data.rtcRegion,
      video_quality_mode: data.videoQualityMode,
      default_auto_archive_duration: data.defaultAutoArchiveDuration,
      flags: data.flags,
      available_tags: data.availableTags,
      default_reaction_emoji: data.defaultReactionEmoji,
      default_thread_rate_limit_per_user: data.defaultThreadRateLimitPerUser,
      default_sort_order: data.defaultSortOrder,
      default_forum_layout: data.defaultForumLayout,
    });
  }

  delete() {
    this.client.rest.request('patch', `/channels/${this.id}`);
  }

  /**
   *
   * @param {string} [id]
   * @returns {Message | Message[]}
   */
  async getMessages(id) {
    // eslint-disable-next-line max-len, operator-linebreak
    const response = id ? new Message(this.client, await this.client.rest.request('get', `/channels/${this.id}/messages/${id}`)) :
      await this.client.rest.request('get', `/channels/${this.id}/messages`)
        .map((message) => new Message(this.client, message));

    return response;
  }

  /**
   *
   * @param {MessagePayload} data
   */
  createMessage(data) {
    this.client.rest.request('post', `/channels/${this.id}/messages`, new MessagePayload(this.client, data));
  }

  /**
   *
   * @param {import('../../../../index').ChannelCreateWebhookOptions} data
   * @returns {Promise<Webhook>}
   */
  async createWebhook(data) {
    const webhook = await this.client.rest.request('post', `/channels/${this.id}/webhooks`, data);

    return new Webhook(this.client, webhook);
  }

  /**
   *
   * @param {string[]} messagesID
   */
  bulkDelete(messagesID) {
    this.client.rest.request('post', `/channels/${this.id}/messages/bulk-delete`, { messages: messagesID });
  }

  /**
   *
   * @param {string} id
   * @param {import('../../../../index').PermissionsOverwrite} data
   */
  editPermissions(id, data) {
    this.client.rest.request('put', `/channels/${this.id}/permissions/${id}`, data);
  }

  /**
   *
   * @returns {Promise<Invite[]>}
   */
  async getInvites() {
    const response = await this.client.rest.request('get', `/channels/${this.id}/invites`);

    return response.map((invite) => new Invite(this.client, invite));
  }

  /**
   *
   * @param {import('../../../../index').ChannelCreateInviteOptions} data
   */
  createInvite(data) {
    this.client.rest.request('post', `/channels/${this.id}/invites`, {
      max_age: data.maxAge,
      max_uses: data.maxUses,
      temporary: data.temporary,
      unique: data.unique,
      target_type: data.targetType,
      target_user_id: data.targetUserID,
      target_application_id: data.targetApplicationID,
    });
  }

  /**
   *
   * @param {string} id
   */
  removePermission(id) {
    this.client.rest.request('delete', `/channels/${this.id}/permissions/${id}`);
  }

  /**
   *
   * @param {string} channelID
   */
  followAnnouncementChannel(channelID) {
    this.client.rest.request('post', `/channels/${this.id}/followers`, { webhook_channel_id: channelID });
  }

  /**
   *
   * @returns {Promise<Message[]>}
   */
  async getPinnedMessages() {
    const response = await this.client.rest.request('post', `/channels/${this.id}/typing`);

    return response.map((invite) => new Message(this.client, invite));
  }

  /**
   *
   * @param {string} userID
   */
  removeUserToDM(userID) {
    if (this.type === 3)
      this.client.rest.request('delete', `/channels/${this.id}/recipients/${userID}`);
  }

  /**
   *
   * @param {import('../../../../index').ChannelStartThreadOptions} data
   */
  startThread(data) {
    this.client.rest.request('post', `/channels/${this.id}/threads`, data);
  }

  /**
   *
   * @param {string} memberID
   */
  addThreadMember(memberID) {
    this.client.rest.request('post', `/channels/${this.id}/thread-members/${memberID}`);
  }

  /**
   *
   * @param {string} memberID
   */
  removeThreadMember(memberID) {
    this.client.rest.request('delete', `/channels/${this.id}/thread-members/${memberID}`);
  }

  /**
   *
   * @returns {Promise<import('../../../../index').ChannelArchivedThreads>}
   */
  async getPublicArchivedThreads() {
    const response = await this.client.rest.request('get', `/channels/${this.id}/threads/archived/public`);

    return {
      threads: response.threads.map((thread) => new Channel(this.client, thread)),
      members: response.members.map((member) => new Member(this.client, this.guild, member)),
      hasMore: response.has_more,
    };
  }

  /**
   *
   * @returns {Promise<import('../../../../index').ChannelArchivedThreads>}
   */
  async getPrivateArchivedThreads() {
    const response = await this.client.rest.request('get', `/channels/${this.id}/threads/archived/private`);

    return {
      threads: response.threads.map((thread) => new Channel(this.client, thread)),
      members: response.members.map((member) => new Member(this.client, this.guild, member)),
      hasMore: response.has_more,
    };
  }

  /**
   *
   * @param {string} [id]
   * @returns {Webhook | Webhook[]}
   */
  async getWebhooks(id) {
    // eslint-disable-next-line operator-linebreak
    const response = id ? new Webhook(await this.client.rest.request('get', `/channels/${this.id}/webhooks`)) :
      await this.client.rest.request('get', `/channels/${this.id}/webhooks/${id}`)
        .map((webhook) => new Webhook(this.client, webhook));

    return response;
  }
}
