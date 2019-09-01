const THREADS = require('../fixtures/threads.json');

class Thread {
  constructor(props) {
    // @todo strict enforcement of props
    Object.assign(this, props);
    THREADS.push(this);
  }

  static create(props) {
    return new Thread(props);
  }

  static getAll() {
    return Promise.resolve([...THREADS]);
  }
}

module.exports = Thread;