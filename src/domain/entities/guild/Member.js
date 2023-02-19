import { User } from '../index.js';
import { Base } from '../base.js';

export class Member extends Base {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {Guild} guild
   * @arg {object} data
   */
  constructor(client, guild, data = {}) {
    super(client, data);

    /**
     * @type {User}
     */
    this.user = new User(this.client, data.user);

    /**
     * @type {string?}
     */
    this.nickname = data.nick;

    /**
     * @type {string?}
     */
    this.avatarHash = data.avatar;

    /**
     * @type {string[]}
     */
    this.roles = data.roles;

    /**
     * @type {Date}
     */
    this.joinedAt = new Date(data.joined_at);

    /**
     * @type {Date}
     */
    this.premiumSince = new Date(data.premium_since);

    /**
     * @type {boolean}
     */
    this.isDeaf = data.deaf;

    /**
     * @type {Boolean}
     */
    this.isMuted = data.mute;

    /**
     * @type {number}
     */
    this.flags = data.flags;

    /**
     * @type {boolean}
     */
    this.isPending = data.pending;

    /**
     * @type {string}
     */
    this.permissions = data.permissions;

    /**
     * @type {Date?}
     */
    this.muteTimeout = data.communication_disabled_until ?? new Date(data.communication_disabled_until);

    /**
     * @type {import('../index').Guild}
     */
    this.guild = guild;
  }

  avatarURL(size = 2048) {
    return `https://cdn.discordapp.com/avatars/${this.user.id}/${this.avatarHash}.png?size=${size}`;
  }

  /**
   *
   * @param {import('../../../../index').GuildMemberEditOptions} data
   */
  edit(data) {
    this.client.rest.request('patch', `/guilds/${this.guild.id}/members/${this.user.id}`, {
      nick: data.nick,
      roles: data.roles,
      mute: data.mute,
      deaf: data.deaf,
      channel_id: data.channelID,
      communication_disabled_until: data.communicationDisabledUntil,
      flags: data.flags,
    });
  }

  /**
   *
   * @param {string} id
   */
  addRole(id) {
    this.client.rest.request('put', `/guilds/${this.guild.id}/members/${this.user.id}/roles/${id}`);
  }

  /**
   *
   * @param {string} id
   */
  removeRole(id) {
    this.client.rest.request('delete', `/guilds/${this.guild.id}/members/${this.user.id}/roles/${id}`);
  }

  /**
   *
   * @param {string} [reason]
   */
  kick(reason) {
    this.client.rest.request('delete', `/guilds/${this.guild.id}/members/${this.user.id}`, null, reason);
  }

  /**
   *
   * @param {string} [reason]
   */
  ban(reason) {
    this.client.rest.request('put', `/guilds/${this.guild.id}/bans/${this.user.id}`, null, reason);
  }

  unban() {
    this.client.rest.request('delete', `/guilds/${this.guild.id}/bans/${this.user.id}`);
  }

  /**
   *
   * @param {string} time
   * @param {string} [reason]
   */
  timeout(time, reason) {
    this.client.rest.request('patch', `/guilds/${this.guild.id}/members/${this.user.id}`, {
      communication_disabled_until: time,
    }, reason);
  }
}
