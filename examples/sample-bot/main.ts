import { DiscordClient } from '../../src/main';

const client = new DiscordClient(
  'DISCORD_TOKEN',
  {
    intents: ['GUILDS', 'GUILD_MEMBERS'],
    presence: {
      activities: [
        {
          type: 0,
          name: 'Hello World!',
        },
      ],
    },
  },
);

client.connect();
