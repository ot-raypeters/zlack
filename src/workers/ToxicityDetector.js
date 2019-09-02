/**
 * @hack this file is temporarily duplicated in <rootDir>/public
 * @todo eject create-react-app and add new entrypoint for webworkers
 */

self.importScripts(
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs',
  'https://cdn.jsdelivr.net/npm/@tensorflow-models/toxicity'
);

const THRESHOLD = 0.9;
const model = toxicity.load(THRESHOLD);

self.onmessage = ev =>
  new ToxicityReporter(ev.data.uid, ev.data.payload);

class ToxicityReporter {
  constructor(uid, payload) {
    const { messages } = payload;
    this.predict = this.predict.bind(this, uid);
    this.report = this.report.bind(this, uid);
    messages.forEach(this.predict);
  }

  static create() {
    return new ToxicityReporter();
  }

  getModel() {
    return Promise.resolve(model);
  }

  predict(uid, message) {
    return this.getModel()
      .then(model => model.classify(message.body))
      .then(predictions => this.report(message, predictions));
  }

  report(uid, message, predictions) {
    const warnings = predictions.reduce((map, prediction) => {
      map[prediction.label] = prediction.results.some(r => r.match);
      return map;
    }, {});

    const payload = { message, warnings };
    self.postMessage({ uid, payload });
  }
}

ToxicityReporter.create();
