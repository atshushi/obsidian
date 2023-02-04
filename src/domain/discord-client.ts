import type { IDiscordClient, IDiscordClientOptions } from '@types';
import events from 'events';

import { RestWS } from '../rest/websocket';
import { Guild, User } from './entities/index';
import { RestClient } from '../rest/rest-client';
import { Collection } from '../utils/Collection';

export class DiscordClient extends events implements IDiscordClient {
  ws: RestWS;
  rest: RestClient;

  options: IDiscordClientOptions;
  token: string;

  user?: User;
  guilds?: Collection<string, Guild>;
  unavaliableGuilds?: Collection;

  constructor(token: string, options?: IDiscordClientOptions) {
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
}
