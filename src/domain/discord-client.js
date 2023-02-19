import events from 'events';

import { RestWS } from '../rest/websocket.js';
import { RestClient } from '../rest/rest-client.js';
import { Collection } from '../utils/Collection.js';

/**
 * Represents the Client
 * @extends events
 */
export class DiscordClient extends events {
  /**
   * @arg {string} token
   * @arg {Object} options
   * @arg {string[]} [options.intents]
   * @arg {Object} [options.presence]
   * @arg {{ type: number, name: string }[]} [options.presence.activities]
   */
  constructor(token, options = {}) {
    super();

    this.ws = new RestWS(this);
    this.rest = new RestClient(this);

    this.options = options;
    this.token = token;

    this.user = null;
    this.guilds = new Collection();
    this.unavaliableGuilds = new Collection();
  }

  connect() {
    this.ws.connect();
  }

  /**
   *
   * @param {import('../../index').GuildCommandDataOptions} data
   */
  createGlobalCommand(data) {
    this.rest.request('POST', `/applications/${this.user.id}/commands`, data);
  }

  /**
   *
   * @param {string} id
   * @param {import('../../index').GuildCommandDataOptions} data
   */
  editGlobalCommand(id, data) {
    this.rest.request(
      'PATCH',
      `/applications/${this.user.id}/commands/${id}`,
      data,
    );
  }

  /**
   *
   * @param {string} id
   * @param {import('../../index').GuildCommandDataOptions} data
   */
  deleteGlobalCommand(id, data) {
    this.rest.request(
      'DELETE',
      `/applications/${this.user.id}/commands/${id}`,
      data,
    );
  }
}
