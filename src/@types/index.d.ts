import EventEmitter from 'events';

import { Collection } from '../utils/Collection';
import { Channel, Member, User } from '../domain/entities/index';

/* eslint-disable no-use-before-define */
type IDiscordClient = EventEmitter & {
  ws: RestWS;
  rest: RestClient;

  options: IDiscordClientOptions;
  token: string;

  user?: User;
  guilds?: Collection;
  unavaliableGuilds?: Collection;

  connect(): void;
}

interface IDiscordClientOptions {
  intents?: string[];
  presence?: {
    activities: {
      type: number;
      name: string;
    }[];
  };
}

interface IEmbedFooter {
  name: string;
  icon_url?: string;
}

interface IEmbedImage {
  url: string;
}

interface IEmbedThumbnail {
  url: string;
}

interface IEmbedVideo {
  url: string;
}

interface IEmbedProvider {
  name: string;
  icon?: string;
}

interface IEmbedAuthor {
  name: string;
  icon?: string;
}

interface IEmbedFields {
  name: string;
  value: string;
  inline?: boolean;
}

interface IMessageReference {
  message_id?: string;
  channel_id?: string;
  guild_id?: string;
  fail_if_not_exists?: boolean;
}

interface ICreateRolesParams {
  name?: string;
  permissions?: string;
  color?: number;
  hoist?: boolean;
  icon?: string | null;
  unicode_emoji?: string | null;
  mentionable?: boolean;
}

interface IOverwrite {
  id: string;
  type: 0 | 1;
  allow: string;
  deny: string;
}

interface ICreateChannelParams {
  name?: string;
  type?: number;
  topic?: string;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  position?: number;
  permission_overwrites?: IOverwrite[];
  parent_id?: string;
  nsfw?: boolean;
  rtc_region?: string;
  video_quality_mode?: number;
  default_auto_archive_duration?: number;
  default_reaction_emoji?: {
    emoji_id?: string | null;
    emoji_name?: string | null;
  };
  available_tags?: {
    id?: string;
    name?: string;
    moderated?: boolean;
    emoji_id?: string | null;
    emoji_name?: string | null;
  }[];
  default_sort_order?: number;
}

interface IEditWelcomeScreen {
  channel_id?: string;
  description?: string;
  emoji_id?: string | null;
  emoji_name?: string | null;
}

interface IThreadMetadata {
  archived: boolean;
  auto_archive_duration: number;
  archive_timestamp: string;
  locked: boolean;
  invitable?: boolean;
  create_timestamp?: string
}

type IForumTag = IDefaultReaction & {
  id: string;
  name: string;
  moderated: boolean;
}

interface IDefaultReaction {
  emoji_id: string | null;
  emoji_name: string | null;
}

interface IEditChannel {
  name?: string;
  type?: number;
  position?: number | null;
  topic?: string | null;
  nsfw?: boolean | null;
  rate_limit_per_user?: number | null;
  bitrate?: number | null;
  user_limit?: number | null;
  permission_overwrites?: IOverwrite[] | null;
  parent_id?: string | null;
  rtc_region?: string | null;
  video_quality_mode?: number | null;
  default_auto_archive_duration?: number | null;
  flags?: number;
  available_tags?: IForumTag[];
  default_reaction_emoji?: IDefaultReaction | null;
  default_thread_rate_limit_per_user?: number;
  default_sort_order?: number | null;
  default_forum_layout?: number;
}

interface IEditDMChannel {
  name?: string;
  icon?: string;
}

interface ICreateInviteOptions {
  max_age?: number;
  max_uses?: number;
  temporary?: boolean;
  unique?: boolean;
  target_type?: number;
  target_user_id?: string;
  target_application_id?: string;
}

interface IStartThreadOptions {
  name: string;
  auto_archive_duration?: number
  type?: number;
  invitable?: boolean;
  rate_limit_per_user?: number | null;
}

interface IWelcomeScreenChannel {
  channel_id: string;
  description: string;
  emoji_id: string | null;
  emoji_name: string | null;
}

interface IWelcomeScreen {
  description: string | null;
  welcome_channels: IWelcomeScreenChannel[];
}

interface ICreateStickerParams {
  name: string;
  description: string;
  data: string;
  file: any;
}

interface IEditMemberParams {
  nick?: string;
  roles?: string[];
  mute?: boolean;
  deaf?: boolean;
  channelID?: string;
  communication_disabled_until?: string;
}

export enum IInteractionType {
  PING = 1,
  APPLICATION_COMMAND = 2,
  MESSAGE_COMPONENT = 3,
  APPLICATION_COMMAND_AUTOCOMPLETE = 4,
  MODAL_SUBMIT = 5,
}

export enum IInteractionCommandTypes {
  CHAT_INPUT = 1,
  USER = 2,
  MESSAGE = 3,
}

export enum IInteractionCommandOptionsTypes {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11,
}

interface IInteractionCommandDataOption {
  name: string;
  type: IInteractionCommandTypes;
  name_localizations?: any;
  description: string;
  description_localizations?: any;
  required?: boolean;
  choices?: {
    name: string;
    name_localizations?: any;
    value: string | number;
  };
  options?: {
    name: string;
    type: IInteractionCommandOptionsTypes;
    description: string;
    required?: boolean;
    choices?: {
      name: string;
      value: string | number;
    }[];
  }[];
  channel_types?: number;
  min_value?: number;
  max_value?: number;
  min_length?: number;
  max_length?: number;
  autocomplete?: boolean;
}

interface IInteractionCommandData {
  id: string;
  name: string;
  type: IInteractionCommandTypes;
  resolved?: any;
  options?: IInteractionCommandDataOption[];
  guild_id?: string;
  target_id?: string;
}

interface IMessagePayload {
  content?: string;
  nonce?: string | number;
  username?: string;
  avatar?: string;
  tts?: boolean;
  embeds?: Embed[];
  mentions?: AllowedMentions;
  references?: IMessageReference;
  components?: Component[];
  stickers?: string[];
  files?: any;
  payload?: string;
  attachments?: Attachment[];
  flags?: number;
  thread?: string;
}

interface ITeam {
  icon: string | null;
  id: string;
  members: {
    membership_state: number;
    permissions: string[];
    team_id: string;
    user: User;
  }[];
  name: string;
  owner_user_id: string;
}

interface IInstallParams {
  scopes: string[];
  permissions: string;
}

interface ICreateWebhook {
  name: string,
  avatar?: string
}

interface IGetPruneCount {
  days?: number,
  include_roles?: string
}

interface IBeginPrune {
  days?: number,
  compute_prune_count?: boolean,
  include_roles?: string[],
  reason?: string
}

interface IComponent {
  type: number;
  label: string;
  style: number;
  custom_id: string;
}

interface IEditWebhook {
  name?: string,
  avatar?: string
}

interface ITags {
  bot_id?: string;
  integration_id?: string;
  premium_subscriber?: null;
  subscription_listing_id?: string;
  available_for_purchase?: null;
  guild_connections?: null;
}

interface IGuildScheduledEvent {
  id: string;
  guild_id: string;
  channel_id: string | null;
  creator_id?: string | null;
  name: string;
  description?: string | null;
  scheduled_start_time: Date;
  scheduled_end_time: Date;
  privacy_level: number;
  status: number;
  entity_type: number;
  entity_id: string | null;
  entity_metadata: { location?: string } | null;
  creator?: User;
  user_count?: number;
  image?: string | null;
}

interface IStageInstance {
  members: Member[];
  participant_count: number;
  speaker_count: number;
  topic: string;
}

interface IGetArchivedThreads {
  threads: Channel[];
  members: Member[];
  has_more: boolean;
}

interface IVoiceRegion {
  id: string;
  name: string;
  optimal: boolean;
  deprecated: boolean;
  custom: boolean;
}

interface IAccount {
  id: string;
  name: string;
}

interface IEditWidget {
  enabled?: boolean,
  channel_id?: string | null
}

interface IWidget {
  id: string;
  name: string;
  instant_invite: string | null;
  channels: Channel[];
  members: User[];
  presence_count: number;
}

interface IEntityMetadata {
  location?: string;
}

interface IActivityTimestamps {
  start?: number;
  end?: number;
}

interface IActivityParty {
  id?: string;
  size?: number[];
}

interface IActivityAssets {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

interface IActivitySecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

interface IActivityButton {
  label: string;
  url: string;
}

interface IAutoModerationAction {
  type: 1 | 2 | 3;
  metadata?: {
    channel_id: string;
    duration_seconds: number;
  };
}
