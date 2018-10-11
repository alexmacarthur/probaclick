export default class ElementWatcher {
  constructor(link, { max, delay, callback } = {}) {
    this.max = max;
    this.link = link;
    this.delay = delay;
    this.callback = callback;

    this.fireCount = 0;
    this.hoverStart = 0;
    this.timerStore = 0;
    this.timeout = null;
    this.eventHandlers = {
      mouseover: this.handleMouseOver.bind(this),
      mouseleave: this.handleMouseLeave.bind(this)
    };

    this.attachListeners();
  }

  attachListeners() {
    this.link.addEventListener("mouseover", this.eventHandlers.mouseover);
    this.link.addEventListener("mouseleave", this.eventHandlers.mouseleave);
  }

  handleMouseOver() {
    this.hoverStart = Date.now();

    this.timeout = setTimeout(() => {
      //-- FIRE!
      this.callback(this.link);

      this.fireCount++;

      this.timerStore = 0;

      if (this.max !== null && this.fireCount >= this.max) {
        this.removeListeners();
      }
    }, this.delay - this.timerStore);
  }

  handleMouseLeave() {
    //-- Do not update immediately after firing.
    this.updateTimerStore();
    clearTimeout(this.timeout);
  }

  removeListeners() {
    for (let i in this.eventHandlers) {
      this.link.removeEventListener(i, this.eventHandlers[i]);
    }
  }

  updateTimerStore() {
    this.timerStore = this.timerStore + (Date.now() - this.hoverStart);
    return this.timerStore;
  }
}
