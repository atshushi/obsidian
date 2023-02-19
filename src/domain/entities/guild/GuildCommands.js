export class GuildCommands {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {object} data
   */
  constructor(client, data = {}) {
    this.client = client;
    this.data = data;
  }

  /**
   *
   * @param {import('../../../../index').GuildCommandDataOptions} command
   */
  create(command) {
    this.client.rest.request(
      'post',
      `/applications/${this.client.user.id}/guilds/${this.data.id}/commands`,
      this.#resolveDataOption(command),
    );
  }

  /**
   *
   * @param {string} id
   * @param {import('../../../../index').GuildCommandDataOptions} data
   */
  deleteCommand(id, data) {
    this.client.rest.request(
      'delete',
      `/applications/${this.client.user.id}/guilds/${this.data.id}/commands/${id}`,
      this.#resolveDataOption(data),
    );
  }

  /**
   *
   * @param {string} id
   * @param {import('../../../../index').GuildCommandDataOptions} data
   */
  editCommand(id, data) {
    this.client.rest.request(
      'patch',
      `/applications/${this.client.user.id}/guilds/${this.data.id}/commands/${id}`,
      this.#resolveDataOption(data),
    );
  }

  /**
   *
   * @param {import('../../../../index').GuildCommandDataOptions} command
   */
  #resolveDataOption(command) {
    return {
      name: command.name,
      type: command.type,
      description: command.description,
      options: command.options?.map((option) => ({
        name: option.name,
        description: option.description,
        type: option.type,
        required: option.boolean,
        autocomplete: option.autocomplete,
        channelTypes: option.channelTypes,
        min_value: option.minValue,
        max_value: option.maxValue,
        min_length: option.minLength,
        max_length: option.maxLength,
        choices: option.choices,
      })),
    };
  }
}
