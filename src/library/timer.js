const eventEmmiter = {
  _handlers: {},
  on(eventName, handler) {
    this._handlers[eventName] = this._handlers[eventName] || [];
    this._handlers[eventName].push(handler);
    return handler;
  },
  off(eventName, handler) {
    if (!handler) {
      this._handlers[eventName] = [];
      return;
    }
    const eventHandlers = this._handlers[eventName] || [];
    this._handlers[eventName] = eventHandlers.filter((handlerItem) => handlerItem !== handler);
  },
  emit(eventName, data) {
    const eventHandlers = this._handlers[eventName] || [];
    eventHandlers.forEach((handler) => handler(data));
  },
};
const timer = {
  ...eventEmmiter,
  timerTime: document.querySelector('.timer__time'),
  _minutes: 0,
  _seconds: 0,
  _timer: null,
  stop() {
    clearTimeout(this._timer);
    this.emit('stop');
  },
  start(numSeconds) {
    clearTimeout(this._timer);
    this.emit('start');
    this.progress(numSeconds);
  },
  progress(numSeconds) {
    this.emit('progress', { time: numSeconds });
    this._minutes = Math.floor(numSeconds / 60);
    this._seconds = numSeconds % 60;
    this._seconds = this._seconds < 10 ? '0' + this._seconds : this._seconds;
    if (numSeconds > 0) {
      if (this.timerTime) {
        this.timerTime.innerHTML = `${this._minutes} : ${this._seconds}`;
      }
      if (numSeconds < 10) {
        this.timerTime.style.color = 'red';
      }
      numSeconds--;
      this._timer = setTimeout(() => this.progress(numSeconds), 1000);
    } else {
      this.timerTime.innerHTML = `00 : 00`;
      this.stop();
    }
  },
};

export { timer };