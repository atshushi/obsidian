import type { IDiscordClient } from '@types';

import { User, Message, CommandInteraction, Guild } from '../../domain/entities/index';

export const dispatch = (client: IDiscordClient, { d, t }: any) => {
  switch (t) {
    case 'READY': {
      client.user = new User(client, d.user);
      if (!d.guilds.length) client.emit('Ready');

      for (const guild of d.guilds) {
        client.unavaliableGuilds.add(guild.id, guild);
      }
      break;
    }

    case 'MESSAGE_CREATE':
      client.emit('MessageCreate', new Message(client, d));
      break;

    case 'INTERACTION_CREATE':
      client.emit('InteractionCreate', new CommandInteraction(client, d));
      break;

    case 'GUILD_CREATE': {
      const guild = new Guild(client, d);

      const removed = client.unavaliableGuilds.remove(d.id);
      client.guilds.add(guild.id, guild);

      if (removed && !client.unavaliableGuilds.size)
        client.emit('Ready');

      client.emit('GuildCreate', guild);
      break;
    }

    case 'GUILD_REMOVE': {
      const guild = new Guild(client, d);
      client.guilds.remove(d.id);

      client.emit('GuildRemove', guild);
      break;
    }
  }
};
