export default class ElementWatcher {
  constructor(link, { max, delay, callback, count } = {}) {
    this.max = max;
    this.link = link;
    this.callback = callback;
    this.triggers = { delay, count };

    this.hasJustFired = false;
    this.totalFireCount = 0;
    this.hoverStart = 0;
    this.timeout = null;

    this.store = {
      time: 0,
      interactions: 0
    };

    this.eventHandlers = {
      mouseover: this.handleMouseOver.bind(this),
      mouseleave: this.handleMouseLeave.bind(this)
    };

    this.updateListeners("add");
  }

  handleMouseOver() {
    this.hasJustFired = false;
    this.hoverStart = Date.now();
    this.store.interactions++;

    if (this.maybeFireBasedOnCount()) {
      return;
    }

    this.maybeFireBasedOnTime();
  }

  maybeFireBasedOnCount() {
    if (this.triggers.count === null) return false;

    if (this.store.interactions >= this.triggers.count) {
      this.fire();
      return true;
    }

    return false;
  }

  maybeFireBasedOnTime() {
    if (this.triggers.delay === null) return false;

    this.timeout = setTimeout(() => {
      this.fire();
    }, this.triggers.delay - this.store.time);

    return this.timeout;
  }

  fire() {
    this.callback(this.link);

    this.totalFireCount++;

    this.resetStore();

    this.hasJustFired = true;

    if (this.max !== null && this.totalFireCount >= this.max) {
      this.updateListeners("remove");
    }
  }

  handleMouseLeave() {
    clearTimeout(this.timeout);

    if (this.hasJustFired) {
      return;
    }

    this.updateStoreTime();
  }

  updateListeners(type) {
    for (let i in this.eventHandlers) {
      this.link[`${type}EventListener`](i, this.eventHandlers[i]);
    }
  }

  resetStore() {
    this.store = {
      time: 0,
      interactions: 0
    };
  }

  updateStoreTime() {
    this.store.time = this.store.time + (Date.now() - this.hoverStart);
  }
}
