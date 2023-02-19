import { AllowedMentions, Attachment, Component } from '../index.js';

export class MessagePayload {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {object} data
   */
  constructor(_client, data = {}) {
    /**
     * @type {string}
     */
    this.content = data.content;

    /**
     * @type {string | number}
     */
    this.nonce = data.nonce;

    /**
     * @type {boolean}
     */
    this.tts = data.tts;

    /**
     * @type {import('../index').Embed[]}
     */
    this.embeds = data.embeds;

    /**
     * @type {AllowedMentions}
     */
    this.mentions = new AllowedMentions(this.client, data.allowed_mentions);

    /**
     * @type {import('../../../../index').MessageReference}
     */
    this.references = {
      messageID: data.message_reference?.message_id,
      channelID: data.message_reference?.channel_id,
      guildID: data.message_reference?.guild_id,
      failIfNotExists: data.message_reference?.fail_if_not_exists,
    };

    /**
     * @type {Component[]}
     */
    this.components = data.components
      ?.map((component) => new Component(this.client, component));

    /**
     * @type {string[]}
     */
    this.stickerIDs = data.sticker_ids;

    /**
     * @type {string}
     */
    this.payload = data.payload_json;

    /**
     * @type {Attachment[]}
     */
    this.attachment = data.attachments
      ?.map((attachment) => new Attachment(this.client, attachment));

    /**
     * @type {number}
     */
    this.flags = data.flags;
  }

  resolve() {
    return {
      content: this.content,
      nonce: this.nonce,
      tts: this.tts,
      embeds: this.embeds,
      allowed_mentions: this.mentions,
      message_reference: {
        message_id: this.references.messageID,
        channel_id: this.references.channelID,
        guild_id: this.references.guildID,
        fail_if_not_exists: this.references.failIfNotExists,
      },
      components: this.components,
      sticker_ids: this.stickerIDs,
      payload_json: this.payload,
      attachments: this.attachment,
      flags: this.flags,
    };
  }
}
