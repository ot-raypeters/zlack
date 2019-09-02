/**
 * @hack this file is temporarily duplicated in <rootDir>/public
 * @todo eject create-react-app and add new entrypoint for webworkers
 */

self.importScripts(
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs',
  'https://cdn.jsdelivr.net/npm/@tensorflow-models/toxicity'
);

const THRESHOLD = 0.9;
const ASYNC_TOXICITY_MODEL = toxicity.load(THRESHOLD);

self.postMessage({ status: 'loaded' });

self.onmessage = ev =>
  new ToxicityReporter(ev.data.uid, ev.data.payload);

class ToxicityReporter {
  constructor(uid, payload) {
    this.predict = this.predict.bind(this, uid);
    this.report = this.report.bind(this, uid);
    this.predictAll(uid, payload.messages);
  }

  static create() {
    return new ToxicityReporter();
  }

  getModel() {
    return Promise.resolve(ASYNC_TOXICITY_MODEL);
  }

  predictAll(uid, messages) {
    const promises = messages.map(this.predict);
    return Promise.all(promises).then(this.report);
  }

  predict(uid, message) {
    return this.getModel()
      .then(model => model.classify(message.body))
      .then(predictions => this.getWarnings(uid, message, predictions));
  }

  getWarnings(uid, message, predictions) {
    const warnings = predictions.reduce((map, prediction) => {
      map[prediction.label] = prediction.results.some(({ match }) => match);
      return map;
    }, {});

    return { message, warnings };
  }

  report(uid, payload) {
    self.postMessage({ uid, payload });
  }
}
