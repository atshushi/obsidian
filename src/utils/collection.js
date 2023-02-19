export class Collection extends Map {
  add(name, value) {
    return this.has(name) ? this.get(name) : this.set(name, value);
  }

  remove(name) {
    return this.get(name) && this.delete(name);
  }

  find(callback) {
    for (const item of this.values()) {
      if (callback(item)) return item;
    }
  }
}
