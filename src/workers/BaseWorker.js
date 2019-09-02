import Deferred from './Deferred';

class BaseWorker {
  constructor(url) {
    this.requests = {};
    this.readyCallbacks = [];
    this.worker = new Worker(url);
    this.worker.onmessage = this.onmessage.bind(this);
  }

  request(type, payload) {
    const deferred = Deferred.createAndAddTimings();
    const { uid } = deferred;

    this.requests[uid] = deferred;
    this.worker.postMessage({ uid, type, payload });

    return deferred.promise;
  }

  onmessage(ev) {
    const { uid, payload } = ev.data;

    if (this.requests[uid]) {
      this.requests[uid].resolve(payload);
    }
  }
}

export default BaseWorker;