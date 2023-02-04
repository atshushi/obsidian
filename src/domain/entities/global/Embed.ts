import {
  IEmbedFooter,
  IEmbedImage,
  IEmbedThumbnail,
  IEmbedVideo,
  IEmbedProvider,
  IEmbedAuthor,
  IEmbedFields,
} from '@types';

export class Embed {
  title?: string;
  description?: string;
  url?: string;
  timestamp?: Date | string;
  color?: number;
  footer?: IEmbedFooter;
  image?: IEmbedImage;
  thumbnail?: IEmbedThumbnail;
  video?: IEmbedVideo;
  provider?: IEmbedProvider;
  author?: IEmbedAuthor;
  fields?: IEmbedFields[];

  setTitle(title: string): this {
    this.title = title;
    return this;
  }

  setDescription(description: string): this {
    this.description = description;
    return this;
  }

  setURL(url: string): this {
    this.url = url;
    return this;
  }

  setTimestamp(timestamp: string | Date): this {
    this.timestamp = timestamp ? timestamp : new Date();
    return this;
  }

  setColor(color: number | string): this {
    this.color = +color;
    return this;
  }

  setFooter(name: string, icon?: string): this {
    this.footer = { name, icon_url: icon };
    return this;
  }

  setImage(url: string): this {
    this.image = { url };
    return this;
  }

  setThumbnail(url: string): this {
    this.thumbnail = { url };
    return this;
  }

  setVideo(url: string): this {
    this.video = { url };
    return this;
  }

  setProvider(name: string, icon?: string): this {
    this.provider = { name, icon };
    return this;
  }

  setAuthor(name: string, icon?: string): this {
    this.author = { name, icon };
    return this;
  }

  addField(name: string, value: string, inline = false): this {
    if (!this.fields) this.fields = [];

    this.fields.push({ name, value, inline });
    return this;
  }
}
