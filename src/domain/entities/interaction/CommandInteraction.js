import { MessagePayload } from '../message/MessagePayload.js';
import { Interaction } from './Interaction.js';

export class CommandInteraction extends Interaction {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {object} data
   */
  constructor(client, data = {}) {
    super(client, data);
  }

  /**
   *
   * @param {string} name
   * @returns {string | number | boolean}
   */
  getOption(name) {
    return this.data.data.options
      .find((option) => option.name === name)
      .value;
  }

  /**
   *
   * @param {MessagePayload} data
   */
  respond(data) {
    this.client.rest.request('post', `/interactions/${this.id}/${this.token}/callback`, {
      type: 4,
      data: {
        ...new MessagePayload(this.client, data).resolve(),
      },
    });
  }
}
