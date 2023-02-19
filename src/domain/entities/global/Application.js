import { User, Team } from '../index.js';
import { Base } from '../base.js';

export class Application extends Base {
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
     * @type {string?}
     */
    this.iconHash = data.icon;

    /**
     * @type {string}
     */
    this.description = data.description;

    /**
     * @type {string[]}
     */
    this.rpcOrigins = data.rpc_origins;

    /**
     * @type {boolean}
     */
    this.isPublic = data.bot_public;

    /**
     * @type {boolean}
     */
    this.requireCodeGrant = data.bot_require_code_grant;

    /**
     * @type {string}
     */
    this.termsOfServiceURL = data.terms_of_service_url;

    /**
     * @type {string}
     */
    this.privacyPolicyURL = data.privacy_policy_url;

    /**
     * @type {User}
     */
    this.owner = new User(data.owner);

    /**
     * @type {string}
     * @deprecated
     */
    this.summary = data.summary;

    /**
     * @type {string}
     */
    this.verifyKey = data.verify_key;

    /**
     * @type {Team}
     */
    this.team = new Team(data.team);

    /**
     * @type {string}
     */
    this.primarySkuID = data.primary_sku_id;

    /**
     * @type {string}
     */
    this.slug = data.slug;

    /**
     * @type {string}
     */
    this.coverImageHash = data.cover_image;

    /**
     * @type {number}
     */
    this.flags = data.flags;

    /**
     * @type {string[]}
     */
    this.tags = data.tags;

    /**
     * @type {import('../../../../index').ApplicationInstallParams}
     */
    this.installParams = data.install_params;

    /**
     * @type {string}
     */
    this.customInstallURL = data.custom_install_url;

    /**
     * @type {string}
     */
    this.roleConnectionsVerificationURL = data.role_connections_verification_url;
  }

  /**
   * @type {import('../index').Guild}
   */
  get guild() {
    return this.client.guilds.get(this.data.guild_id);
  }

  iconURL(size = 2048) {
    return `https://cdn.discordapp.com/icons/${this.id}/${this.iconHash}.png?size=${size}`;
  }
}
