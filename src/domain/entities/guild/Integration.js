import { Application, User } from '../index.js';
import { Base } from '../base.js';

export class Integration extends Base {
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
     * @type {string}
     */
    this.type = data.type;

    /**
     * @type {boolean}
     */
    this.enabled = data.enabled;

    /**
     * @type {string}
     */
    this.syncing = data.syncing;

    /**
     * @type {string}
     */
    this.roleID = data.role_id;

    /**
     * @type {boolean}
     */
    this.enableEmoticons = data.enable_emoticons;

    /**
     * @type {number}
     */
    this.expireBehaviour = data.expire_behavior;

    /**
     * @type {number}
     */
    this.expireGracePeriod = data.expire_grace_period;

    /**
     * @type {User}
     */
    this.user = new User(data.user);

    /**
     * @type {import('../../../../index').IntegrationAccount}
     */
    this.account = data.account;

    /**
     * @type {Date}
     */
    this.syncedAt = new Date(data.synced_at);

    /**
     * @type {number}
     */
    this.subscriberCount = data.subscriber_count;

    /**
     * @type {boolean}
     */
    this.revoked = data.revoked;

    /**
     * @type {Application}
     */
    this.application = new Application(data.application);

    /**
     * @type {string[]}
     */
    this.scopes = data.scopes;
  }
}
