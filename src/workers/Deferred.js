import { generateUid } from '../utils';

class Deferred {
  static create() {
    let resolve;
    let reject;

    const promise = new Promise((promiseResolve, promiseReject) => {
      resolve = promiseResolve;
      reject = promiseReject;
    });

    const uid = generateUid();
    return { uid, promise, resolve, reject };
  }

  static createAndAddTimings() {
    const deferred = Deferred.create();
    const now = performance.now();

    deferred.promise.startTime = now;
    deferred.promise.then(() => {
      const duration = performance.now() - now;
      console.log(`Web worker completed request in ${duration}ms`);
    });

    return deferred;
  }
}

export default Deferred;