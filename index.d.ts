import { AllowedMentions, Attachment, Channel, Component, Embed, Member, User } from './src/domain/entities';

export interface PermissionsOverwrite {
  id: string,
  type: 0 | 1,
  allow: string,
  deny: string,
}

export interface AutoModerationAction {
  type: 1 | 2 | 3,
  metadata: {
    channelID: string,
    durationSeconds: number,
  },
}

export interface ActivityTimestamps {
  start?: number,
  end?: number,
}

export interface ActivityParty {
  id?: string,
  size?: number[],
}

export interface ActivityAssets {
  largeImage?: string,
  largeText?: string,
  smallImage?: string,
  smallText?: string,
}

export interface ActivitySecrets {
  join?: string,
  spectate?: string,
  match?: string,
}

export interface ActivityButton {
  label: string,
  url: string,
}

export interface ApplicationInstallParams {
  scopes: string[],
  permissions: string,
}

export interface TeamMembers {
  membershipState: number,
  permissions: string[],
  teamID: string,
  user: User,
}

export interface ChannelThreadMetadata {
  archived: boolean,
  autoArchiveDuration: number,
  archiveTimestamp: string,
  locked: boolean,
  invitable?: boolean,
  createTimestamp?: string,
}

export interface ChannelAvaliableTags {
  id: string,
  name: string,
  moderated: boolean,
  emojiID: string | null,
  emojiName: string | null,
}

export interface ChannelDefaultReact {
  emojiID: string | null,
  emojiName: string | null,
}

export interface ChannelEditOptions {
  name?: string,
  icon?: string,
  type?: number,
  position?: number,
  topic?: string,
  nsfw?: boolean,
  rateLimitPerUser?: number,
  bitrate?: number,
  userLimit?: number,
  permissionOverwrites?: PermissionsOverwrite[],
  parentID?: string,
  rtcRegion?: string,
  videoQualityMode?: number,
  defaultAutoArchiveDuration?: number,
  flags?: number,
  availableTags?: ChannelAvaliableTags[],
  defaultReactionEmoji?: ChannelDefaultReact,
  defaultThreadRateLimitPerUser?: number,
  defaultSortOrder?: number,
  defaultForumLayout?: number,
}

export interface ChannelCreateWebhookOptions {
  name: string,
  avatar?: string,
}

export interface ChannelCreateInviteOptions {
  maxAge?: number,
  maxUses?: number,
  temporary?: boolean,
  unique?: boolean,
  targetType?: number,
  targetUserID?: string,
  targetApplicationID?: string,
}

export interface ChannelStartThreadOptions {
  name: string,
  autoArchiveDuration?: number,
  type?: number,
  invitable?: boolean,
  rateLimitPerUser?: number | null,
}

export interface ChannelArchivedThreads {
  threads: Channel[],
  members: Member[],
  hasMore: boolean,
}

export interface GuildWelcomeScreenChannel {
  channelID: string,
  description: string,
  emojiID: string | null,
  emojiName: string | null,
}

export interface GuildWelcomeScreen {
  description: string | null,
  welcomeChannels: GuildWelcomeScreenChannel[],
}

export interface GuildEditOptions {
  name?: string,
  region?: string | null,
  verificationLevel?: number | null;
  defaultMessageNotifications?: number | null,
  explicitContentFilter?: number | null,
  afkChannelID?: string | null,
  afkTimeout?: number,
  icon?: string | null,
  ownerID?: string,
  splash?: string | null,
  discoverySplash?: string | null,
  banner?: string | null,
  systemChannelID?: string | null,
  systemChannelFlags?: number,
  rulesChannelID?: string | null,
  publicUpdatesChannelID?: string | null,
  preferredLocale?: string | null,
  features?: string[],
  description?: string | null,
  premiumProgressBarEnabled?: boolean,
}

export interface GuildRoleCreateOptions {
  name?: string,
  permissions?: string,
  color?: number,
  hoist?: boolean,
  icon?: string | null,
  unicodeEmoji?: string | null,
  mentionable?: boolean,
}

export interface GuildGetPruneCountOptions {
  days: number,
  includeRoles: string,
}

export interface GuildBeginPruneOptions {
  days: number,
  includeRoles: string,
  computePruneCount: boolean,
  /** @deprecated */
  reason?: string,
}

export interface GuildVoiceRegion {
  id: string,
  name: string,
  optimal: boolean,
  deprecated: boolean,
  custom: boolean,
}

export interface GuildWidgetSettings {
  enabled: boolean,
  channelID: string | null,
}

export interface GuildWidget {
  id: string,
  name: string,
  instantInvite: string | null,
  presenceCount: number,
  channels: Channel[],
  members: Member[],
}

export interface GuildCreateStickerOptions {
  name: string,
  description: string,
  tags: string,
  file: any,
}

export interface GuildCommandDataOptions {
  name: string,
  type: 1 | 2 | 3,
  description: string,
  options: {
    name: string,
    description: string,
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
    required?: boolean,
    autocomplete?: boolean,
    channelTypes: Array<0 | 1 | 2 | 3 | 4 | 5 | 10 | 11 | 12 | 13 | 14 | 15>,
    minValue: number,
    maxValue: number,
    minLength: number,
    maxLength: number,
    choices?: {
      name: string,
      value: string | number,
    }[],
  }[],
}

export interface IntegrationAccount {
  id: string,
  name: string,
}

export interface StageInstance {
  members: Member[],
  participantCount: number,
  speakerCount: number,
  topic: string,
}

export interface GuildMemberEditOptions {
  nick?: string,
  roles?: string[],
  mute?: boolean,
  deaf?: boolean,
  channelID?: string,
  communicationDisabledUntil?: string,
  flags?: number,
}

export interface GuildRoleTags {
  botID?: string,
  integrationID?: string,
  premiumSubscriber?: null,
  subscriptionListingID?: string,
  availableForPurchase?: null,
  guildConnections?: null,
}

export interface GuildRoleEditOptions {
  name?: string,
  permissions?: string,
  color?: number,
  hoist?: boolean,
  icon?: string | null,
  unicodeEmoji?: string | null,
  mentionable?: boolean,
}

export interface Component {
  type: number,
  label: string,
  style: number,
  customID: string,
}

export interface MessageChannelMentions {
  id: string,
  guildID: string,
  type: number,
  name: string,
}

export interface MessageReaction {
  count: number,
  me: boolean,
  emoji: Emoji,
}

export interface MessageActivity {
  type: number,
  partyID?: string,
}

export interface MessageReference {
  messageID?: string,
  channelID?: string,
  guildID?: string,
  failIfNotExists?: boolean,
}

export interface MessageStickerItems {
  id: string;
  name: string;
  formatType: number;
}

export interface BoostRoleData {
  roleSubscriptionListingID: string;
  tierName: string;
  totalMonthsSubscribed: number;
  isRenewal: boolean;
}
