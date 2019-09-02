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
    const req = () => this.worker.postMessage({ uid, type, payload });

    if (!this.isReady) {
      this.readyCallbacks.push(req);
    } else {
      req();
    }

    return deferred.promise;
  }

  runReadyCallbacks() {
    this.isReady = true;
    this.readyCallbacks.forEach(cb => cb());
  }

  onmessage(ev) {
    const { uid, payload, status } = ev.data;

    if (status === 'loaded') {
      this.runReadyCallbacks();
    }

    if (this.requests[uid]) {
      this.requests[uid].resolve(payload);
    }
  }
}

export default BaseWorker;