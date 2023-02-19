import { Component } from '../index.js';

export class MessageInteraction {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {object} data
   */
  constructor(client, data = {}) {
    this.content = data.content;
    this.components = data.components
      ?.map((component) => new Component(client, component));
  }
}
