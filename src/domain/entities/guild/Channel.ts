import type {
  IDiscordClient,
  IOverwrite,
  IThreadMetadata,
  IForumTag,
  IDefaultReaction,
  IEditChannel,
  IEditDMChannel,
  ICreateInviteOptions,
  IStartThreadOptions,
  IMessagePayload,
  ICreateWebhook,
  IGetArchivedThreads,
} from '@types';

import { User, Member, Message, Invite, Webhook } from '../index';
import { Base } from '../base';

export class Channel extends Base {
  id: string;
  type: number;
  position?: number;
  permissionOverwrites?: IOverwrite[];
  name?: string | null;
  topic?: string | null;
  isNsfw?: boolean;
  lastMessageID?: string | null;
  bitrate?: number;
  userLimit?: number;
  rateLimit?: number;
  dmUsers?: User[] | User;
  icon?: string | null;
  ownerID?: string;
  applicationID?: string;
  categoryID?: string | null;
  lastPin?: Date | null;
  region?: string | null;
  videoQuality?: number;
  messageCount?: number;
  memberCount?: number;
  threadData?: IThreadMetadata;
  threadMember?: Member;
  autoArchiveDuration?: number;
  permissions?: string;
  flags?: number;
  totalMessageCount?: number;
  avaliableTags?: IForumTag[];
  appliedsID?: string[];
  defaultReact?: IDefaultReaction | null;
  threadRateLimit?: number;
  sortOrder?: number | null;
  fourmLayout?: number;

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.id = data.id;
    this.type = data.type;
    this.position = data.position;
    this.permissionOverwrites = data.permission_overwrites;
    this.name = data.name;
    this.topic = data.topic;
    this.isNsfw = data.nsfw;
    this.lastMessageID = data.last_message_id;
    this.bitrate = data.bitrate;
    this.userLimit = data.user_limit;
    this.rateLimit = data.rate_limit_per_user;
    this.icon = data.icon;
    this.ownerID = data.owner_id;
    this.applicationID = data.application_id;
    this.categoryID = data.parent_id;
    this.lastPin = new Date(data.last_pin_timestamp);
    this.region = data.rtc_region;
    this.videoQuality = data.video_quality_mode;
    this.messageCount = data.message_count;
    this.memberCount = data.member_count;
    this.threadData = data.thread_metadata;
    this.autoArchiveDuration = data.default_auto_archive_duration;
    this.permissions = data.permissions;
    this.flags = data.flags;
    this.totalMessageCount = data.total_message_sent;
    this.avaliableTags = data.available_tags;
    this.appliedsID = data.applied_tags;
    this.defaultReact = data.default_reaction_emoji;
    this.threadRateLimit = data.default_thread_rate_limit_per_user;
    this.sortOrder = data.default_sort_order;
    this.fourmLayout = data.default_forum_layout;
  }

  get guild() {
    return this.client.guilds.get(this.data.guild_id);
  }

  edit(data?: IEditChannel | IEditDMChannel) {
    this.client.rest.request('patch', `/channels/${this.id}`, data);
  }

  delete() {
    this.client.rest.request('patch', `/channels/${this.id}`);
  }

  async getMessages(id?: string) {
    const response = id ? await this.client.rest.request('get', `/channels/${this.id}/messages`)
      // eslint-disable-next-line operator-linebreak
      : await this.client.rest.request('get', `/channels/${this.id}/messages/${id}`);

    return response;
  }

  createMessage(data: IMessagePayload) {
    this.client.rest.request('post', `/channels/${this.id}/messages`, data);
  }

  async createWebhook(data: ICreateWebhook) {
    const webhook = await this.client.rest.request('post', `/channels/${this.id}/webhooks`, data);

    return new Webhook(this.client, webhook);
  }

  bulkDelete(messagesID?: string[]) {
    this.client.rest.request('post', `/channels/${this.id}/messages/bulk-delete`, { messages: messagesID });
  }

  editPermissions(id: string, data?: Omit<IOverwrite, 'id'>) {
    this.client.rest.request('put', `/channels/${this.id}/permissions/${id}`, data);
  }

  async getInvites() {
    const response = await this.client.rest.request('get', `/channels/${this.id}/invites`);

    return response.map((invite) => new Invite(this.client, invite));
  }

  createInvite(data?: ICreateInviteOptions) {
    this.client.rest.request('post', `/channels/${this.id}/invites`, data);
  }

  removePermission(id: string) {
    this.client.rest.request('delete', `/channels/${this.id}/permissions/${id}`);
  }

  followAnnouncementChannel(channelID: string) {
    this.client.rest.request('post', `/channels/${this.id}/followers`, { webhook_channel_id: channelID });
  }

  async getPinnedMessages() {
    const response = await this.client.rest.request('post', `/channels/${this.id}/typing`);

    return response.map((invite) => new Message(this.client, invite));
  }

  removeUserToDM(userID: string) {
    if (this.type === 3)
      this.client.rest.request('delete', `/channels/${this.id}/recipients/${userID}`);
  }

  startThread(data?: IStartThreadOptions) {
    this.client.rest.request('post', `/channels/${this.id}/threads`, data);
  }

  addThreadMember(memberID: string) {
    this.client.rest.request('post', `/channels/${this.id}/thread-members/${memberID}`);
  }

  removeThreadMember(memberID: string) {
    this.client.rest.request('delete', `/channels/${this.id}/thread-members/${memberID}`);
  }

  async getPublicArchivedThreads(): Promise<IGetArchivedThreads> {
    const response = await this.client.rest.request('get', `/channels/${this.id}/threads/archived/public`);

    return response
      .map(({ threads }) => new Channel(this.client, threads))
      .map(({ members }) => new Member(this.client, members, this.guild.id));
  }

  async getPrivateArchivedThreads(): Promise<IGetArchivedThreads> {
    const response = await this.client.rest.request('get', `/channels/${this.id}/threads/archived/private`);

    return response
      .map(({ threads }) => new Channel(this.client, threads))
      .map(({ members }) => new Member(this.client, members, this.guild.id));
  }

  async getWebhooks() {
    const response = await this.client.rest.request('get', `/channels/${this.id}/webhooks`);

    return response.map((webhook) => new Webhook(this.client, webhook));
  }
}
