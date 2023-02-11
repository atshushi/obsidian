import type { IDiscordClient } from '@types';
import { AutoModerationActionExecution } from 'domain/entities/events/AutoModerationActionExecution';
import { VoiceState } from 'domain/entities/events/VoiceState';
import { Activity } from 'domain/entities/global/Activity';
import {
  User,
  Message,
  CommandInteraction,
  Guild,
  Channel,
  Member,
  Role,
  GuildScheduled,
  Integration,
  Emoji,
  Sticker,
} from '../../domain/entities/index';

export const dispatch = (client: IDiscordClient, { d, t }: any) => {
  switch (t) {
    case 'APPLICATION_COMMAND_PERMISSIONS_UPDATE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('ApplicationCommandPermissionsUpdate', {
        id: d.id,
        applicationID: d.application_id,
        permissions: d.permissions,
        guild,
      });
      break;
    }

    case 'AUTO_MODERATION_ACTION_EXECUTION':
      client.emit('AutoModerationActionExecution', new AutoModerationActionExecution(client, d));
      break;

    case 'AUTO_MODERATION_RULE_CREATE':
      client.emit('AutoModerationRuleCreate', new AutoModerationActionExecution(client, d));
      break;

    case 'AUTO_MODERATION_RULE_DELETE':
      client.emit('AutoModerationRuleDelete', new AutoModerationActionExecution(client, d));
      break;

    case 'AUTO_MODERATION_RULE_UPDATE':
      client.emit('AutoModerationRuleUpdate', new AutoModerationActionExecution(client, d));
      break;

    case 'CHANNEL_CREATE':
      client.emit('ChannelCreate', new Channel(client, d));
      break;

    case 'CHANNEL_DELETE':
      client.emit('ChannelDelete', new Channel(client, d));
      break;

    case 'CHANNEL_PINS_UPDATE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('ChannelPinsUpdate', {
        lastPin: d.last_pin_timestamp,
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        guild,
      });
      break;
    }

    case 'READY': {
      client.user = new User(client, d.user);
      if (!d.guilds.length) client.emit('Ready');

      for (const guild of d.guilds) {
        client.unavaliableGuilds.add(guild.id, guild);
      }
      break;
    }

    case 'THREAD_CREATE':
      client.emit('ThreadCreate', new Channel(client, d));
      break;

    case 'THREAD_UPDATE':
      client.emit('ThreadUpdate', new Channel(client, d));
      break;

    case 'THREAD_DELETE':
      client.emit('ThreadDelete', new Channel(client, d));
      break;

    case 'THREAD_LIST_SYNC': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('ThreadListSync', {
        channelIDs: d.channel_ids,
        threads: d.threads.map((thread) => new Channel(client, thread)),
        members: d.members.map((member) => new Member(client, guild, member)),
        guild,
      });
      break;
    }

    case 'THREAD_MEMBER_UPDATE':
      client.emit('ThreadMemberUpdate', new Member(client, client.guilds.get(d.guild_id), d));
      break;

    case 'THREAD_MEMBERS_UPDATE':
      client.emit('ThreadMembersUpdate', {
        id: d.id,
        guild: client.guilds.get(d.guild_id),
        memberCount: d.member_count,
        addedMembers: d.added_members,
        removedMemberIDs: d.removed_member_ids,
      });
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

    case 'GUILD_UPDATE':
      client.emit('GuildUpdate', new Guild(client, d));
      break;

    case 'GUILD_REMOVE': {
      const guild = new Guild(client, d);
      client.guilds.remove(d.id);

      client.emit('GuildRemove', guild);
      break;
    }

    case 'GUILD_AUDIT_LOG_ENTRY_CREATE':
      client.emit('GuildAuditLogEntryCreate', {
        targetID: d.target_id,
        changes: d.changes,
        userID: d.user_id,
        id: d.id,
        actionType: d.action_type,
        options: d.options,
        reason: d.reason,
      });
      break;

    case 'GUILD_BAN_ADD':
      client.emit('GuildBanAdd', {
        guild: client.guilds.get(d.guild_id),
        user: new User(client, d.user),
      });
      break;

    case 'GUILD_BAN_REMOVE':
      client.emit('GuildBanRemove', {
        guild: client.guilds.get(d.guild_id),
        user: new User(client, d.user),
      });
      break;

    case 'GUILD_EMOJIS_UPDATE':
      client.emit('GuildEmojisUpdate', {
        guild: client.guilds.get(d.guild_id),
        emojis: d.stickers.map((emoji) => new Emoji(client, emoji)),
      });
      break;

    case 'GUILD_STICKERS_UPDATE':
      client.emit('GuildStickersUpdate', {
        guild: client.guilds.get(d.guild_id),
        stickers: d.stickers.map((sticker) => new Sticker(client, sticker)),
      });
      break;

    case 'GUILD_INTEGRATIONS_UPDATE':
      client.emit('GuildIntegrationsUpdate', {
        guild: client.guilds.get(d.guild_id),
      });
      break;

    case 'GUILD_MEMBER_ADD': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('GuildMemberAdd', new Member(client, guild, d));
      break;
    }

    case 'GUILD_MEMBER_REMOVE':
      client.emit('GuildMemberRemove', {
        guild: client.guilds.get(d.guild_id),
        user: new User(client, d.user),
      });
      break;

    case 'GUILD_MEMBER_UPDATE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('GuildMemberUpdate', new Member(client, guild, t));
      break;
    }

    case 'GUILD_MEMBERS_CHUNK': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('GuildMembersChunk', {
        members: d.members.map((member) => new Member(client, guild, member)),
        chunkIndex: d.chunk_index,
        chunkCount: d.chunk_count,
        notFound: d.not_found,
        presences: d.presences,
        nonce: d.nonce,
        guild,
      });
      break;
    }

    case 'GUILD_ROLE_CREATE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('GuildRoleCreate', {
        role: new Role(client, guild, d.role),
        guild,
      });
      break;
    }

    case 'GUILD_ROLE_UPDATE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('GuildRoleUpdate', {
        role: new Role(client, guild, d.role),
        guild,
      });
      break;
    }

    case 'GUILD_ROLE_DELETE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('GuildRoleDelete', {
        roleID: d.role_id,
        guild,
      });
      break;
    }

    case 'GUILD_SCHEDULED_EVENT_CREATE':
      client.emit('GuildScheduledEventCreate', new GuildScheduled(client, t));
      break;

    case 'GUILD_SCHEDULED_EVENT_DELETE':
      client.emit('GuildScheduledEventDelete', new GuildScheduled(client, t));
      break;

    case 'GUILD_SCHEDULED_EVENT_UPDATE':
      client.emit('GuildScheduledEventDelete', new GuildScheduled(client, t));
      break;

    case 'GUILD_SCHEDULED_EVENT_USER_ADD': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('GuildScheduledEventUserAdd', {
        guildScheduledEventID: d.guild_scheduled_event_id,
        userID: d.user_id,
        guild,
      });
      break;
    }

    case 'GUILD_SCHEDULED_EVENT_USER_REMOVE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('GuildScheduledEventUserRemove', {
        guildScheduledEventID: d.guild_scheduled_event_id,
        userID: d.user_id,
        guild,
      });
      break;
    }

    case 'INTEGRATION_CREATE':
      client.emit('IntegrationCreate', {
        ...new Integration(client, t),
        guild: client.guilds.get(d.guild_id),
      });
      break;

    case 'INTEGRATION_UPDATE':
      client.emit('IntegrationCreate', {
        ...new Integration(client, t),
        guild: client.guilds.get(d.guild_id),
      });
      break;

    case 'INTEGRATION_DELETE':
      client.emit('IntegrationCreate', {
        id: d.id,
        guild_id: client.guilds.get(d.guild_id),
        application_id: d?.application_id,
      });
      break;

    case 'INTERACTION_CREATE':
      client.emit('InteractionCreate', new CommandInteraction(client, d));
      break;

    case 'INVITE_CREATE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('InviteCreate', {
        code: d.code,
        createdAt: d.created_at,
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        inviter: new User(client, d.inviter),
        maxAge: d.max_age,
        maxUses: d.max_uses,
        targetType: d.target_type,
        targetUser: d.target_user,
        targetApplication: d.target_application,
        isTmporary: d.temporary,
        uses: d.uses,
        guild,
      });
      break;
    }

    case 'INVITE_DELETE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('InviteDelete', {
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        code: d.code,
        guild,
      });
      break;
    }

    case 'MESSAGE_CREATE':
      client.emit('MessageCreate', new Message(client, d));
      break;

    case 'MESSAGE_UPDATE':
      client.emit('MessageUpdate', new Message(client, d));
      break;

    case 'MESSAGE_DELETE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('MessageDelete', {
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        id: d.id,
        guild,
      });
      break;
    }

    case 'MESSAGE_DELETE_BULK': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('MessageDeleteBulk', {
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        ids: d.ids,
        guild,
      });
      break;
    }

    case 'MESSAGE_REACTION_ADD': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('MessageReactionAdd', {
        userID: d.user_id,
        messageID: d.message_id,
        member: d.member ?? new Member(client, guild, d.member),
        emoji: new Emoji(client, d.emoji),
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        guild,
      });
      break;
    }

    case 'MESSAGE_REACTION_REMOVE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('MessageReactionRemove', {
        userID: d.user_id,
        messageID: d.message_id,
        emoji: new Emoji(client, d.emoji),
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        guild,
      });
      break;
    }

    case 'MESSAGE_REACTION_REMOVE_ALL': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('MessageReactionRemoveAll', {
        messageID: d.message_id,
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        guild,
      });
      break;
    }

    case 'MESSAGE_REACTION_REMOVE_EMOJI': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('MessageReactionRemoveEmoji', {
        messageID: d.message_id,
        emoji: new Emoji(client, d.emoji),
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        guild,
      });
      break;
    }

    case 'PRESENCE_UPDATE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('PresenceUpdate', {
        user: new User(client, d.user),
        status: d.status,
        activities: d.activities
          .map((activitie) => new Activity(client, activitie)),
        clientStatus: d.client_status,
        guild,
      });
      break;
    }

    case 'STAGE_INSTANCE_CREATE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('StageInstanceCreate', {
        id: d.id,
        topic: d.topic,
        privacylevel: d.privacy_level,
        discoverableDisabled: d.discoverable_disabled,
        guildScheduledEventID: d.guild_scheduled_event_id,
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        guild,
      });
      break;
    }

    case 'STAGE_INSTANCE_UPDATE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('StageInstanceUpdate', {
        id: d.id,
        topic: d.topic,
        privacylevel: d.privacy_level,
        discoverableDisabled: d.discoverable_disabled,
        guildScheduledEventID: d.guild_scheduled_event_id,
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        guild,
      });
      break;
    }

    case 'STAGE_INSTANCE_DELETE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('StageInstanceDelete', {
        id: d.id,
        topic: d.topic,
        privacylevel: d.privacy_level,
        discoverableDisabled: d.discoverable_disabled,
        guildScheduledEventID: d.guild_scheduled_event_id,
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        guild,
      });
      break;
    }

    case 'TYPING_START': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('TypingStart', {
        userID: d.user_id,
        timestamp: d.timestamp,
        member: d.member ?? new Member(client, guild, d.member),
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        guild,
      });
      break;
    }

    case 'USER_UPDATE':
      client.emit('UserUpdate', new User(client, d));
      break;

    case 'VOICE_STATE_UPDATE':
      client.emit('VoiceStateUpdate', new VoiceState(client, d));
      break;

    case 'VOICE_SERVER_UPDATE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('VoiceServerUpdate', {
        token: d.token,
        endpoint: d.endpoint,
        guild,
      });
      break;
    }

    case 'WEBHOOKS_UPDATE': {
      const guild = client.guilds.get(d.guild_id);

      client.emit('WebhooksUpdate', {
        channel: guild.channels
          .find((channel) => channel.id === d.channel_id),
        guild,
      });
      break;
    }
  }
};
