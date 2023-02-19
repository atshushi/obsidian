/**
 * Represents Embed Sturcture
 */
export class Embed {
  /**
   * Set the Embed's Title
   * @param {string} title
   * @returns {this}
   */
  setTitle(title) {
    this.title = title;
    return this;
  }

  /**
   * Set the Embed's Description
   * @param {string} description
   * @returns {this}
   */
  setDescription(description) {
    this.description = description;
    return this;
  }

  /**
   * Set the Embed's URL
   * @param {string} url
   * @returns {this}
   */
  setURL(url) {
    this.url = url;
    return this;
  }

  /**
   * Set the Embed's Timestamp
   * @param {string | Date} timestamp
   * @returns {this}
   */
  setTimestamp(timestamp) {
    this.timestamp = timestamp ? timestamp : new Date();
    return this;
  }

  /**
   * Set the Embed's Color
   * @param {number | string} color
   * @returns {this}
   */
  setColor(color) {
    this.color = +color;
    return this;
  }

  /**
   * Set the Embed's Footer
   * @param {string} name
   * @param {string} [icon]
   * @returns {this}
   */
  setFooter(name, icon) {
    this.footer = { name, icon_url: icon };
    return this;
  }

  /**
   * Set the Embed's Image
   * @param {string} url
   * @returns {this}
   */
  setImage(url) {
    this.image = { url };
    return this;
  }

  /**
   * Set the Embed's Thumbnail
   * @param {string} url
   * @returns {this}
   */
  setThumbnail(url) {
    this.thumbnail = { url };
    return this;
  }

  /**
   * Set the Embed's Video
   * @param {string} url
   * @returns {this}
   */
  setVideo(url) {
    this.video = { url };
    return this;
  }

  /**
   * Set the Embed's Provider
   * @param {string} name
   * @param {string} [icon]
   * @returns {this}
   */
  setProvider(name, icon) {
    this.provider = { name, icon };
    return this;
  }

  /**
   * Set the Embed's Author
   * @param {string} name
   * @param {string} [icon]
   * @returns {this}
   */
  setAuthor(name, icon) {
    this.author = { name, icon };
    return this;
  }

  /**
   * Add a Embed's Field
   * @param {string} name
   * @param {string} value
   * @param {boolean} inline
   * @returns {this}
   */
  addField(name, value, inline = false) {
    if (!this.fields) this.fields = [];

    this.fields.push({ name, value, inline });
    return this;
  }
}
