export class AllowedMentions {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {object} data
   */
  constructor(_client, data = {}) {
    /**
     * @type {'roles' | 'users' | 'everyone'}
     */
    this.parse = data.parse;

    /**
     * @type {string[]}
     */
    this.roles = data.roles;

    /**
     * @type {string[]}
     */
    this.users = data.users;

    /**
     * @type {boolean}
     */
    this.replied = data.replied_user;
  }
}
