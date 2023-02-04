import type { IDiscordClient } from '@types';
import { Base } from '../base';

export class User extends Base {
  id: string;
  username: string;
  discriminator: string;
  avatarHash: string | null;
  bot?: boolean;
  system?: boolean;
  MFAEnabled?: boolean;
  bannerHash?: string | null;
  accentColor?: number | null;
  locale?: string;
  flags?: boolean;
  premiumType?: number;
  publicFlags?: number;

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.id = data.id;
    this.username = data.username;
    this.discriminator = data.discriminator;
    this.avatarHash = data.avatar;
    this.bot = data.bot;
    this.system = data.system;
    this.MFAEnabled = data.mfa_enabled;
    this.bannerHash = data.banner;
    this.accentColor = data.accent_color;
    this.locale = data.locale;
    this.flags = data.flags;
    this.premiumType = data.premium_type;
    this.publicFlags = data.public_flags;
  }

  get tag() {
    return `${this.username}#${this.discriminator}`;
  }

  bannerURL(size = 2048) {
    return `https://cdn.discordapp.com/banners/${this.id}/${this.bannerHash}.png?size=${size}`;
  }

  avatarURL(size = 2048) {
    return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatarHash}.png?size=${size}`;
  }

  toMention() {
    return `<@${this.id}>`;
  }
}
