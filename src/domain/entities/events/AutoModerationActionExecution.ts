import type { IDiscordClient, IAutoModerationAction } from '@types';

export class AutoModerationActionExecution {
  client: IDiscordClient;
  data?: any;
  action: IAutoModerationAction;
  ruleID: string;
  ruleTriggerType: 1 | 3 | 4;
  userID: string;
  messageID?: string;
  alertSystemMessageID?: string;
  content: string;
  matchedKeyword: string | null;
  matchedContent: string | null;

  constructor(client: IDiscordClient, data?: any) {
    this.client = client;
    this.data = data;

    this.action = data.action;
    this.ruleID = data.rule_id;
    this.ruleTriggerType = data.rule_trigger_type;
    this.userID = data.user_id;
    this.messageID = data.message_id;
    this.alertSystemMessageID = data.alert_system_message_id;
    this.content = data.content;
    this.matchedKeyword = data.matched_keyword;
    this.matchedContent = data.matched_content;
  }

  get guild() {
    return this.client.guilds.get(this.data.guild_id);
  }

  get channel() {
    return this.guild.channels.find((channel) => channel.id === this.data.channel_id);
  }
}
