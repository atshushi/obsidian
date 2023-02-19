import { MessagePayload, User } from '../index.js';
import { Base } from '../base.js';

export class Webhook extends Base {
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
     * @type {User}
     */
    this.author = new User(this.client, data.user);

    /**
     * @type {string?}
     */
    this.name = data.name;

    /**
     * @type {string?}
     */
    this.avatar = data.avatar;

    /**
     * @type {string}
     */
    this.token = data.token;

    /**
     * @type {string?}
     */
    this.applicationID = data.application_id;

    /**
     * @type {string}
     */
    this.url = data.url;
  }

  /**
   * @type {import('../index').Guild}
   */
  get guild() {
    return this.client.guilds
      .get(this.data.guild_id);
  }

  /**
   * @type {import('../index').Channel}
   */
  get channel() {
    return this.guild.channels
      .find((channel) => channel.id === this.data.channelID);
  }

  /**
   *
   * @param {import('../../../../index').ChannelCreateWebhookOptions} data
   */
  edit(data) {
    this.client.rest
      .request('patch', `/webhooks/${this.id}`, {
        name: data.name ? data.name : this.name,
        avatar: data.avatar ? data.avatar : this.avatar,
        channel_id: this.channel.id,
      });
  }

  delete() {
    return this.client.rest.request('delete', `/webhooks/${this.id}`);
  }

  /**
   *
   * @param {import('../index').MessagePayload} data
   * @returns
   */
  sendMessage(data) {
    return this.client.rest.request(
      'post',
      `/webhooks/${this.id}/${this.token}`,
      new MessagePayload(this.client, data).resolve(),
    );
  }

  /**
   *
   * @param {string} id
   * @param {import('../index').MessagePayload} data
   */
  editMessage(id, data) {
    this.client.rest.request(
      'patch',
      `/webhooks/${this.id}/${this.token}/messages/${id}`,
      new MessagePayload(this.client, data).resolve(),
    );
  }

  /**
   *
   * @param {string} id
   */
  deleteMessage(id) {
    this.client.rest.request('delete', `/webhooks/${this.id}/${this.token}/messages/${id}`);
  }
}
