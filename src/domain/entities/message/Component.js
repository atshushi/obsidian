export class Component {
  /**
   * @arg {import('../../discord-client').DiscordClient} client
   * @arg {object} data
   */
  constructor(_client, data = {}) {
    /**
     * @type {number}
     */
    this.type = data.type;

    /**
     * @type {import('../../../../index').Component[]}
     */
    this.components = {
      type: data.components?.type,
      label: data.components?.label,
      style: data.components?.style,
      customID: data.components?.custom_id,
    };
  }
}
