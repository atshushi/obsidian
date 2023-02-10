import type { IDiscordClient, ICreateStickerParams } from '@types';

import { Guild, User } from '../index';
import { Base } from '../base';

export class Sticker extends Base {
  id: string;
  packID: string;
  name: string;
  description: string | null;
  tags: string;
  asset: string;
  type: number;
  formatType: number;
  available: boolean;
  user: User;
  sortValue: number;

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.id = data.id;
    this.packID = data.pack_id;
    this.name = data.name;
    this.description = data.description;
    this.tags = data.tags;
    this.asset = data.asset;
    this.type = data.type;
    this.formatType = data.format_type;
    this.available = data.available;
    this.user = new User(this.client, data.user);
    this.sortValue = data.sort_value;
  }

  get guild(): Guild {
    return this.client.guilds.get(this.data.guild_id);
  }

  edit(data?: Omit<ICreateStickerParams, 'file'>) {
    this.client.rest.request('patch', `/guilds/${this.guild.id}/stickers/${this.id}`, data);
  }

  delete() {
    this.client.rest.request('delete', `/guilds/${this.guild.id}/stickers/${this.id}`);
  }
}
