import {
  Role,
  Emoji,
  Sticker,
  Channel,
  Webhook,
  Member,
  User,
  Invite,
  Integration,
  GuildCommands,
} from '../index.js';
import { Base } from '../base.js';

export class Guild extends Base {
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
    this.name = data.name;

    /**
     * @type {string?}
     */
    this.iconHash = data.icon;

    /**
     * @type {string?}
     */
    this.splashHash = data.splash;

    /**
     * @type {string?}
     */
    this.discoverySplashHash = data.discovery_splash;

    /**
     * @type {string}
     */
    this.ownerID = data.owner_id;

    /**
     * @deprecated Use {@link Guild.locale} instead
     * @type {string?}
     */
    this.region = data.region;

    /**
     * @type {string?}
     */
    this.afkChannelID = data.afk_channel_id;

    /**
     * @type {number}
     */
    this.afkChannelTimeout = data.afk_timeout;

    /**
     * @type {boolean?}
     */
    this.isWidgetEnabled = data.widget_enabled;

    /**
     * @type {string?}
     */
    this.widgetChannelID = data.widget_channel_id;

    /**
     * @type {number}
     */
    this.verificationLevel = data.verification_level;

    /**
     * @type {number}
     */
    this.messageNotifications = data.default_message_notifications;

    /**
     * @type {number}
     */
    this.nsfwFilter = data.explicit_content_filter;

    /**
     * @type {Role[]}
     */
    this.roles = data.roles
      .map((role) => new Role(this.client, this, role));

    /**
     * @type {Emoji[]}
     */
    this.emojis = data.emojis
      .map((emoji) => new Emoji(this.client, emoji));

    /**
     * @type {string[]}
     */
    this.features = data.features;

    /**
     * @type {number}
     */
    this.MFALevel = data.mfa_level;

    /**
     * @type {string?}
     */
    this.applicationID = data.application_id;

    /**
     * @type {string?}
     */
    this.systemChannelID = data.system_channel_id;

    /**
     * @type {number}
     */
    this.systemChannelFlags = data.system_channel_flags;

    /**
     * @type {string?}
     */
    this.ruleChannelID = data.rules_channel_id;

    /**
     * @type {string?}
     */
    this.maxPresences = data.max_presences;

    /**
     * @type {number}
     */
    this.maxMembers = data.max_members;

    /**
     * @type {string?}
     */
    this.vanityCode = data.vanity_url_code;

    /**
     * @type {string?}
     */
    this.description = data.description;

    /**
     * @type {string?}
     */
    this.bannerHash = data.banner;

    /**
     * @type {number}
     */
    this.boostTier = data.premium_tier;

    /**
     * @type {number}
     */
    this.boostCount = data.premium_subscription_count;

    /**
     * @type {string}
     */
    this.locale = data.preferred_locale;

    /**
     * @type {string?}
     */
    this.moderationChannelID = data.public_updates_channel_id;

    /**
     * @type {number}
     */
    this.maxiumUsersInVideoChannel = data.max_video_channel_users;

    /**
     * @type {number}
     */
    this.maxiumUsersInStageVideoChannel = data.max_stage_video_channel_users;

    /**
     * @type {number}
     */
    this.membersCount = data.approximate_member_count;

    /**
     * @type {number}
     */
    this.onlineMembersCount = data.approximate_presence_count;

    /**
     * @type {import('../../../../index').GuildWelcomeScreen?}
     */
    this.welcomeScreen = {
      description: data.welcome_screen?.description,
      welcomeChannels: data.welcome_screen?.welcome_channels.map((channel) => ({
        channelID: channel.channel_id,
        description: channel.description,
        emojiID: channel.emoji_id,
        emojiName: channel.emoji_name,
      })),
    };

    /**
     * @type {number}
     */
    this.nsfwLevel = data.nsfw_level;

    /**
     * @type {Sticker[]}
     */
    this.stickers = data.stickers
      .map((sticker) => new Sticker(this.client, sticker));

    /**
     * @type {boolean}
     */
    this.hasProgessBar = data.premium_progress_bar_enabled;

    /**
     * @type {Member[]}
     */
    this.members = data.members
      .map((member) => new Member(client, this, member));

    /**
     * @type {Date}
     */
    this.appJoinedAt = new Date(data.joined_at);

    /**
     * @type {boolean}
     */
    this.lazy = data.lazy;

    /**
     * @type {boolean}
     */
    this.large = data.large;

    /**
     * @type {VoiceState[]}
     */
    this.voiceStates = data.voice_states;

    /**
     * @type {GuildScheduled[]}
     */
    this.scheduledEvents = data.guild_scheduled_events;

    /**
     * @type {Channel[]}
     */
    this.channels = data.channels
      .map((channel) => new Channel(this.client, channel));

    /**
     * @type {Channel[]}
     */
    this.threads = data.channels
      .map((thread) => new Channel(this.client, thread));

    /**
     * @type {{ [key: string]: number }?}
     */
    this.appCommandsCount = data.application_command_counts;

    /**
     * @type {boolean}
     */
    this.isUnavaliable = data.unavailable;

    /**
     * @type {GuildCommands}
     */
    this.commands = new GuildCommands(this.client, this);
  }

  bannerURL(size = 2048) {
    return `https://cdn.discordapp.com/banners/${this.id}/${this.bannerHash}.png?size=${size}`;
  }

  iconURL(size = 2048) {
    return `https://cdn.discordapp.com/icons/${this.id}/${this.iconHash}.png?size=${size}`;
  }

  splashURL(size = 2048) {
    return `https://cdn.discordapp.com/splashes/${this.id}/${this.splashHash}.png?size=${size}`;
  }

  discoverySplashURL(size = 2048) {
    return `https://cdn.discordapp.com/discovery-splashes/${this.id}/${this.discoverySplashHash}.png?size=${size}`;
  }

  /**
   *
   * @param {import('../../../../index').GuildEditOptions} data
   */
  edit(data) {
    this.client.rest.request('patch', `/guilds/${data.id}`, {
      name: data.name,
      region: data.region,
      verification_level: data.verificationLevel,
      default_message_notifications: data.defaultMessageNotifications,
      explicit_content_filter: data.explicitContentFilter,
      afk_channel_id: data.afkChannelID,
      afk_timeout: data.afkTimeout,
      icon: data.icon,
      owner_id: data.ownerID,
      splash: data.splash,
      discovery_splash: data.discoverySplash,
      banner: data.banner,
      system_channel_id: data.systemChannelID,
      system_channel_flags: data.systemChannelFlags,
      rules_channel_id: data.rulesChannelID,
      public_updates_channel_id: data.publicUpdatesChannelID,
      preferred_locale: data.preferredLocale,
      features: data.features,
      description: data.description,
      premium_progress_bar_enabled: data.premiumProgressBarEnabled,
    });
  }

  delete() {
    this.client.rest.request('delete', `/guilds/${this.id}`);
  }

  /**
   *
   * @param {import('../../../../index').ChannelEditOptions} data
   */
  createChannel(data) {
    this.client.rest.request('post', `/guilds/${this.id}/channels`, {
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

  /**
   *
   * @param {import('../../../../index').GuildRoleCreateOptions} data
   */
  createRole(data) {
    this.client.rest.request('post', `/guilds/${this.id}/channels`, {
      name: data.name,
      permissions: data.permissions,
      color: data.color,
      hoist: data.hoist,
      icon: data.icon,
      unicode_emoji: data.unicodeEmoji,
      mentionable: data.mentionable,
    });
  }

  /**
   *
   * @param {string} [id]
   * @returns {Webhook | Webhook[]}
   */
  async getWebhooks(id) {
    // eslint-disable-next-line operator-linebreak
    const response = id ? new Webhook(this.client, await this.client.rest.request('get', `/webhooks/${id}`)) :
      await this.client.rest.request('get', `/guilds/${this.id}/webhooks`)
        .map((webhook) => new Webhook(this.client, webhook));

    return response;
  }

  /**
   *
   * @param {string} [id]
   * @returns {User | User[]}
   */
  async getBans(id) {
    // eslint-disable-next-line max-len, operator-linebreak
    const response = id ? new User(this.client, await this.client.rest.request('get', `/guilds/${this.id}/bans/${id}`).user) :
      await this.client.rest.request('get', `/guilds/${this.id}/bans`)
        .map(({ user }) => new User(this.client, user));

    return response;
  }

  /**
   *
   * @param {number} level
   */
  editMFALevel(level) {
    this.client.rest.request('post', `/guilds/${this.id}/mfa`, { level });
  }

  /**
   *
   * @param {import('../../../../index').GuildGetPruneCountOptions} data
   */
  async getPruneCount(data) {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/prune`, {
      days: data.days,
      include_roles: data.includeRoles,
    });

    return response;
  }

  /**
   *
   * @param {import('../../../../index').GuildBeginPruneOptions} data
   */
  beginPrune(data) {
    this.client.rest.request('post', `/guilds/${this.id}/prune`, {
      days: data.days,
      compute_prune_count: data.computePruneCount,
      include_roles: data.includeRoles,
      reason: data.reason,
    });
  }

  /**
   *
   * @returns {Promise<import('../../../../index').GuildVoiceRegion[]>}
   */
  async getVoiceRegions() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/regions`);

    return response;
  }

  /**
   *
   * @returns {Invite[]}
   */
  async getInvites() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/invites`);

    return response.map((invite) => new Invite(this.client, invite));
  }

  /**
   *
   * @returns {Integration[]}
   */
  async getIntegrations() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/integrations`);

    return response.map((integration) => new Integration(this.client, integration));
  }

  /**
   *
   * @param {string} id
   */
  deleteGuildIntegration(id) {
    this.client.rest.request('delete', `/guilds/${this.id}/integrations/${id}`);
  }

  /**
   *
   * @param {string} code
   */
  deleteInvite(code) {
    this.client.rest.request('delete', `/invites/${code}`);
  }

  /**
   *
   * @returns {import('../../../../index').GuildWidgetSettings}
   */
  async getWidgetSettings() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/widget`);

    return {
      enabled: response.enabled,
      channelID: response.channel_id,
    };
  }

  /**
   *
   * @param {import('../../../../index').GuildWidgetSettings} data
   * @returns {import('../../../../index').GuildWidget}
   */
  async editWidget(data) {
    const response = await this.client.rest.request('patch', `/guilds/${this.id}/widget`, data);

    return {
      id: response.id,
      name: response.name,
      instantInvite: response.instant_invite,
      presenceCount: response.presence_count,
      channels: response.channels
        .map((channel) => new Channel(this.client, channel)),
      members: response.members
        .map((member) => new Member(this.client, this, member)),
    };
  }

  /**
   *
   * @returns {import('../../../../index').GuildWidget}
   */
  async getWidget() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/widget.json`);

    return {
      id: response.id,
      name: response.name,
      instantInvite: response.instant_invite,
      presenceCount: response.presence_count,
      channels: response.channels
        .map((channel) => new Channel(this.client, channel)),
      members: response.members
        .map((member) => new Member(this.client, this, member)),
    };
  }

  /**
   *
   * @returns {Invite}
   */
  async getVanityURL() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/vanity-url`);

    return new Invite(this.client, response);
  }

  /**
   *
   * @returns {string}
   */
  async getVanityImage() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/widget.png`);

    return response;
  }

  /**
   *
   * @returns {import('../../../../index').GuildWelcomeScreen}
   */
  async getWelcomeScreen() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/welcome-screen`);

    return {
      description: response.description,
      welcomeChannels: response.map((channel) => ({
        channelID: channel.channel_id,
        description: channel.description,
        emojiID: channel.emoji_id,
        emojiName: channel.emoji_name,
      })),
    };
  }

  /**
   *
   * @param {import('../../../../index').GuildWelcomeScreen & { description: string }} data
   * @returns {import('../../../../index').GuildWelcomeScreen}
   */
  async editWelcomeScreen(data) {
    const response = await this.client.rest.request('patch', `/guilds/${this.id}/welcome-screen`, data);

    return {
      description: response.description,
      welcomeChannels: response.map((channel) => ({
        channelID: channel.channel_id,
        description: channel.description,
        emojiID: channel.emoji_id,
        emojiName: channel.emoji_name,
      })),
    };
  }

  /**
   *
   * @param {import('../../../../index').GuildCreateStickerOptions} data
   */
  createSticker(data) {
    this.client.rest.request('post', `/guilds/${this.id}/stickers`, data);
  }
}
