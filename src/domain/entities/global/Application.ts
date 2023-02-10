import type { IDiscordClient, IInstallParams, ITeam } from '@types';

import { User } from '../index';
import { Base } from '../base';

export class Application extends Base {
  id: string;
  name: string;
  iconHash: string | null;
  description: string;
  rpcOrigins?: string[];
  isPublic: boolean;
  requireCodeGrant: boolean;
  termsOfServiceURL?: string;
  privacyPolicyURL?: string;
  owner: User;
  /** @deprecated */
  summary?: string;
  verifyKey: string;
  team: ITeam;
  primarySkuID?: string;
  slug?: string;
  coverImageHash?: string;
  flags?: number;
  tags?: string[];
  installParams?: IInstallParams[];
  customInstallURL?: string;
  roleConnectionsVerificationURL?: string;

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.id = data.id;
    this.name = data.name;
    this.iconHash = data.icon;
    this.description = data.description;
    this.rpcOrigins = data.rpc_origins;
    this.isPublic = data.bot_public;
    this.requireCodeGrant = data.bot_require_code_grant;
    this.termsOfServiceURL = data.terms_of_service_url;
    this.privacyPolicyURL = data.privacy_policy_url;
    this.owner = new User(data.owner);
    this.summary = data.summary;
    this.verifyKey = data.verify_key;
    this.team = data.team.map(({ members }) => members.map((member) => new User(member.user)));
    this.primarySkuID = data.primary_sku_id;
    this.slug = data.slug;
    this.coverImageHash = data.cover_image;
    this.flags = data.flags;
    this.tags = data.tags;
    this.installParams = data.install_params;
    this.customInstallURL = data.custom_install_url;
    this.roleConnectionsVerificationURL = data.role_connections_verification_url;
  }

  get guild() {
    return this.client.guilds.get(this.data.guild_id);
  }

  iconURL(size = 2048) {
    return `https://cdn.discordapp.com/icons/${this.id}/${this.iconHash}.png?size=${size}`;
  }
}
