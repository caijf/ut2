import Emitter from './emitter-pro.esm.js';

class PostMessageBroker extends Emitter {
  constructor(destination = window.top) {
    super();
    this.destination = destination;

    this._emit = super.emit;

    this.fn = ((event) => {
      if (event.data.eventName) {
        this._emit(event.data.eventName, event);
      }
    }).bind(this);

    window.addEventListener('message', this.fn);
  }

  destroy() {
    window.removeEventListener('message', this.fn);
  }

  emit(eventName, payload = {}) {
    this.destination.postMessage(
      {
        error: false,
        eventName,
        ...payload
      },
      '*'
    );
  }
}

export default PostMessageBroker;
