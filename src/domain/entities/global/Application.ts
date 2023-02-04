import type { IDiscordClient } from '@types';

import { User } from '../index';
import { Base } from '../base';

export class Application extends Base {
  id: string;
  name: any;
  iconHash: any;
  description: any;
  rpcOrigins: any;
  isPublic: any;
  requireCodeGrant: any;
  termsOfServiceURL: any;
  privacyPolicyURL: any;
  owner: User;
  /** @deprecated */
  summary?: string;
  verifyKey: string;
  team: {
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
  };
  primarySkuID?: string;
  slug?: string;
  coverImageHash?: string;
  flags?: number;
  tags?: string[];
  installParams?: {
    scopes: string[];
    permissions: string;
  }[];
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
