class ServiceRegistry {
  constructor() {
    this._services = [];
    this._timeout = 30;
  }

  add(name, ip, port) {
    const key = name + ip + port;
    if (!this._services[key]) {
      this._services[key] = {};
      this._services[key].timestamp = Math.floor(new Date() / 1000);
      this._services[key].ip  = ip;
      this._services[key].port  = port;
      this._services[key].name  = name;
      console.log(`Added service for ${name} on ${ip}:${port}`);
      this.cleanup();
      return;
    }
    this._services[key].timestamp = Math.floor(new Date() / 1000);
    console.log(`Updated service for ${name} on ${ip}:${port}`);
    this.cleanup();
    return;
  }

  remove(name, ip, port) {
    const key = name + ip + port;
    delete this._services[key];
  }

  get(name) {
    this.cleanup();
    for (let key in this._services) {
      if (this._services[key].name === name) {
        return this._services[key];
      }
    }
    return null;
  }

  cleanup() {
    const now = Math.floor(new Date() / 1000);
    for (let key in this._services) {
      if (this._services[key].timestamp + this._timeout < now) {
        console.log(`Removed service for ${this._services[key].name}`);
        delete this._services[key];
      }
    }
  }
}

module.exports = ServiceRegistry;
