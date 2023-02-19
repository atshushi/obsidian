import { Member } from '../index.js';

export class VoiceState {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {object} data
   */
  constructor(client, data = {}) {
    this.client = client;
    this.data = data;

    /**
     * @type {string}
     */
    this.userID = data.user_id;

    /**
     * @type {Member}
     */
    this.member = data.member ?? new Member(client, this.guild, data.member);

    /**
     * @type {string}
     */
    this.sessionID = data.session_id;

    /**
     * @type {boolean}
     */
    this.isDeaf = data.deaf;

    /**
     * @type {boolean}
     */
    this.isMute = data.mute;

    /**
     * @type {boolean}
     */
    this.isSelfDeaf = data.self_deaf;

    /**
     * @type {boolean}
     */
    this.isSelfMute = data.self_mute;

    /**
     * @type {boolean}
     */
    this.isSelfStream = data.self_stream;

    /**
     * @type {boolean}
     */
    this.isSelfVideo = data.self_video;

    /**
     * @type {boolean}
     */
    this.isSuppress = data.suppress;

    /**
     * @type {Date}
     */
    this.requestToSpeak = new Date(data.request_to_speak_timestamp);
  }

  /**
   * @type {import('../index').Guild}
   */
  get guild() {
    return this.client.guilds.get(this.data.guild_id);
  }

  /**
   * @type {import('../index').Channel}
   */
  get channel() {
    return this.guild.channels.find((channel) => channel.id === this.data.channel_id);
  }
}
