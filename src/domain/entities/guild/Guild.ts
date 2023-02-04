import type {
  IDiscordClient,
  ICreateRolesParams,
  ICreateChannelParams,
  IEditWelcomeScreen,
  IWelcomeScreen,
  ICreateStickerParams,
} from '@types';

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
} from '../index';
import { Base } from '../base';

export class Guild extends Base {
  id: string;
  name: string;
  iconHash?: string | null;
  splashHash: string | null;
  discoverySplashHash: string | null;
  ownerID: string;

  /**
   * @deprecated Use {@link Guild.locale} instead;
   */
  region?: string | null;
  afkChannelID: string | null;
  afkChannelTimeout: number;
  isWidgetEnabled?: boolean | null;
  widgetChannelID?: string | null;
  verificationLevel: number;
  messageNotifications: number;
  nsfwFilter: number;
  roles: Role[];
  emojis: Emoji[];
  features: string[];
  mfaLevel: number;
  applicationID: string | null;
  systemChannelID: string | null;
  systemChannelFlags: number;
  ruleChannelID: string | null;
  maxPresences?: number | null;
  maxMembers?: number;
  vanityCode: string | null;
  description: string | null;
  bannerHash: string | null;
  boostTier: number;
  boostCount?: number;
  locale: string;
  moderationChannelID: string | null;
  maxiumUsersInVideoChannel?: number;
  membersCount?: number;
  onlineMembersCount?: number;
  welcomeScreen?: IWelcomeScreen;
  nsfwLevel: number;
  stickers: Sticker[];
  hasProgessBar: boolean;
  members: Member[];
  maxiumUsersInStageVideoChannel: number;
  appJoinedAt: Date;
  lazy: boolean;
  large: boolean;
  voiceStates: any[];
  scheduledEvents: any[];
  embeddedActivities: any[];
  channels: Channel[];
  threads: Channel[];
  appCommandsCount: { [key: string]: number } | null;
  isUnavaliable: boolean;
  commands: GuildCommands;

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.id = data.id;
    this.name = data.name;
    this.iconHash = data.icon;
    this.splashHash = data.splash;
    this.discoverySplashHash = data.discovery_splash;
    this.ownerID = data.owner_id;
    this.region = data.region;
    this.afkChannelID = data.afk_channel_id;
    this.afkChannelTimeout = data.afk_timeout;
    this.isWidgetEnabled = data.widget_enabled;
    this.widgetChannelID = data.widget_channel_id;
    this.verificationLevel = data.verification_level;
    this.messageNotifications = data.default_message_notifications;
    this.nsfwFilter = data.explicit_content_filter;
    this.roles = data.roles.map((role) => new Role(this.client, this, role));
    this.emojis = data.emojis.map((emoji) => new Emoji(this.client, emoji));
    this.features = data.features;
    this.mfaLevel = data.mfa_level;
    this.applicationID = data.application_id;
    this.systemChannelID = data.system_channel_id;
    this.systemChannelFlags = data.system_channel_flags;
    this.ruleChannelID = data.rules_channel_id;
    this.maxPresences = data.max_presences;
    this.maxMembers = data.max_members;
    this.vanityCode = data.vanity_url_code;
    this.description = data.description;
    this.bannerHash = data.banner;
    this.boostTier = data.premium_tier;
    this.boostCount = data.premium_subscription_count;
    this.locale = data.preferred_locale;
    this.moderationChannelID = data.public_updates_channel_id;
    this.maxiumUsersInVideoChannel = data.max_video_channel_users;
    this.maxiumUsersInStageVideoChannel = data.max_stage_video_channel_users;
    this.membersCount = data.approximate_member_count;
    this.onlineMembersCount = data.approximate_presence_count;
    this.welcomeScreen = data.welcome_screen;
    this.nsfwLevel = data.nsfw_level;
    this.stickers = data.stickers.map((sticker) => new Sticker(this.client, sticker));
    this.hasProgessBar = data.premium_progress_bar_enabled;
    this.members = data.members.map((member) => new Member(client, this, member));
    this.appJoinedAt = new Date(data.joined_at);
    this.lazy = data.lazy;
    this.large = data.large;
    this.voiceStates = data.voice_states;
    this.scheduledEvents = data.guild_scheduled_events;
    this.embeddedActivities = data.embedded_activities;
    this.channels = data.channels.map((channel) => new Channel(this.client, channel));
    this.threads = data.channels.map((thread) => new Channel(this.client, thread));
    this.appCommandsCount = data.application_command_counts;
    this.isUnavaliable = data.unavailable;
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

  edit(data: Guild) {
    this.client.rest.request('patch', `/guilds/${data.id}`, data);
  }

  delete() {
    this.client.rest.request('delete', `/guilds/${this.id}`);
  }

  createChannel(data: ICreateChannelParams) {
    this.client.rest.request('post', `/guilds/${this.id}/channels`, data);
  }

  createRole(data: ICreateRolesParams) {
    this.client.rest.request('post', `/guilds/${this.id}/channels`, data);
  }

  async getWebhooks() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/webhooks`);

    return response.map((webhook) => new Webhook(this.client, webhook));
  }

  async getBans(id?: string) {
    const response = id ? new User(
      this.client,
      await this.client.rest.request('get', `/guilds/${this.id}/bans/${id}`).user,
    ) : await this.client.rest.request('get', `/guilds/${this.id}/bans`)
      .map(({ user }) => new User(this.client, user));

    return response;
  }

  editMFALevel(level: number) {
    this.client.rest.request('post', `/guilds/${this.id}/mfa`, { level });
  }

  async getPruneCount(data?: { days?: number, include_roles?: string }) {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/prune`, data);

    return response;
  }

  beginPrune(data?: { days?: number, compute_prune_count?: boolean, include_roles?: string[], reason?: string }) {
    this.client.rest.request('post', `/guilds/${this.id}/prune`, data);
  }

  async getVoiceRegions() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/regions`);

    return response;
  }

  async getInvites() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/invites`);

    return response.map((invite) => new Invite(this.client, invite));
  }

  async getIntegrations() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/integrations`);

    return response.map((integration) => new Integration(this.client, integration));
  }

  deleteGuildIntegration(id: string) {
    this.client.rest.request('delete', `/guilds/${this.id}/integrations/${id}`);
  }

  deleteInvite(code: string) {
    this.client.rest.request('delete', `/invites/${code}`);
  }

  async getWidgetSettings() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/widget`);

    return response;
  }

  async editWidget(data?: { enabled?: boolean, channel_id?: string | null }) {
    const response = await this.client.rest.request('patch', `/guilds/${this.id}/widget`, data);

    return response;
  }

  async getWidget() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/widget.json`);

    return response
      .map(({ member }) => new Member(this.client, this, member))
      .map(({ channel }) => new Channel(this.client, channel));
  }

  async getVanityURL() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/vanity-url`);

    return response;
  }

  async getVanityImage() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/widget.png`);

    return response;
  }

  async getWelcomeScreen() {
    const response = await this.client.rest.request('get', `/guilds/${this.id}/welcome-screen`);

    return response;
  }

  async editWelcomeScreen(data?: IEditWelcomeScreen) {
    const response = await this.client.rest.request('patch', `/guilds/${this.id}/welcome-screen`, data);

    return response;
  }

  createSticker(data?: ICreateStickerParams) {
    this.client.rest.request('post', `/guilds/${this.id}/stickers`, data);
  }
}
