export class AutoModerationActionExecution {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {object} data
   */
  constructor(client, data = {}) {
    this.client = client;
    this.data = data;

    /**
     * @type {import('../../../../index').AutoModerationAction}
     */
    this.action = {
      type: data.action?.type,
      metadata: {
        channelID: data.action?.metadata.channel_id,
        durationSeconds: data.action?.metadata.duration_seconds,
      },
    };

    /**
     * @type {string}
     */
    this.ruleID = data.rule_id;

    /**
     * @type {1 | 3 | 4}
     */
    this.ruleTriggerType = data.rule_trigger_type;

    /**
     * @type {string}
     */
    this.userID = data.user_id;

    /**
     * @type {string}
     */
    this.messageID = data.message_id;

    /**
     * @type {string?}
     */
    this.alertSystemMessageID = data.alert_system_message_id;

    /**
     * @type {string}
     */
    this.content = data.content;

    /**
     * @type {string?}
     */
    this.matchedKeyword = data.matched_keyword;

    /**
     * @type {string?}
     */
    this.matchedContent = data.matched_content;
  }

  /**
   * @type {import('../index').Guild}
   */
  get guild() {
    return this.client.guilds.get(this.data.guild_id);
  }

  /**
   * @type {import('../index').Channel}
   */
  get channel() {
    return this.guild.channels.find((channel) => channel.id === this.data.channel_id);
  }
}
