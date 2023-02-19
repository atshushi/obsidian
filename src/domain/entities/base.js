/**
 * @abstract
 */
export class Base {
  /**
   *
   * @param {import('../discord-client').DiscordClient} client
   * @param {Object} data
   */
  constructor(client, data = {}) {
    this.client = client;
    this.data = data;
  }

  get createdAt() {
    // eslint-disable-next-line no-mixed-operators
    return new Date(~~(this.data.id / 4194304 + 1420070400000));
  }

  /**
   * Check if the structure is equal to another
   * @param {string} id
   * @returns {boolean}
   */
  equalsTo(id) {
    return this.data.id === id;
  }
}
