import type { IDiscordClient } from '@types';
import { Base } from '../base';

export class Emoji extends Base {
  id: string;
  name: string | null;
  roles?: string[];
  requireColons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.id = data.id;
    this.name = data.name;
    this.roles = data.roles;
    this.requireColons = data.require_colons;
    this.managed = data.managed;
    this.animated = data.animated;
    this.available = data.available;
  }
}
