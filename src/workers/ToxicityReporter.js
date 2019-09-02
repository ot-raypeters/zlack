import BaseWorker from './BaseWorker';

/**
 * @hack this file is temporarily duplicated in <rootDir>/public
 * @todo eject create-react-app and add new entrypoint for webworkers
 */

class ToxicityReporter extends BaseWorker {
  constructor(props) {
    super(`${process.env.PUBLIC_URL}/ToxicityReporter.js`);
  }

  static create() {
    return new ToxicityReporter();
  }

  verify(message) {
    const messages = [message];
    return this.request('predict', { messages });
  }
}

const reporter = new ToxicityReporter();
export default reporter;
