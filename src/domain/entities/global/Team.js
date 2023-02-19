import { User } from '../index.js';
import { Base } from '../base.js';

export class Team extends Base {
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
    this.iconHash = data.icon;

    /**
     * @type {import('../../../../index').TeamMembers}
     */
    this.members = data.members.map((member) => ({
      membershipState: member.membership_state,
      permissions: member.permissions,
      teamID: member.team_id,
      user: new User(member.user),
    }));

    /**
     * @type {string}
     */
    this.name = data.name;

    /**
     * @type {string}
     */
    this.ownerUserID = data.owner_user_id;
  }

  iconURL(size = 2048) {
    return `https://cdn.discordapp.com/team-icons/${this.id}/${this.iconHash}.png?size=${size}`;
  }
}
