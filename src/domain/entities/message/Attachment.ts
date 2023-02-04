import type { IDiscordClient } from '@types';
import { Base } from '../base';

export class Attachment extends Base {
  id: string;
  filename?: string;
  description?: string;
  contentType?: string;
  size?: number;
  url?: string;
  proxyURL?: string;
  height?: number | null;
  width?: number | null;
  ephemeral?: boolean;

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.id = data.id;
    this.filename = data.filename;
    this.description = data.description;
    this.contentType = data.content_type;
    this.size = data.size;
    this.url = data.url;
    this.proxyURL = data.proxy_url;
    this.height = data.height;
    this.width = data.width;
    this.ephemeral = data.ephemeral;
  }
}
