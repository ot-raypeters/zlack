const BaseBot = require('./BaseBot');
const ZenOfPythonQuotes = require('../fixtures/zen-of-python.json');

class ZenOfPythonBot extends BaseBot {
  constructor(app, user, props) {
    super(app, user, props);

    this.index = ~~(Math.random() * 100);
    this.interval = props.interval || 10000;

    this.serenade = this.serenade.bind(this);
    this.scheduleNextQuote = this.scheduleNextQuote.bind(this);
  }

  static create(app, user, props = {}) {
    return new ZenOfPythonBot(app, user, props);
  }

  getNextQuote() {
    const index = this.index % ZenOfPythonQuotes.length;
    const nextQuote = ZenOfPythonQuotes[index];
    this.index += 1;
    return nextQuote;
  }

  serenade() {
    const nextQuote = this.getNextQuote();

    this.simulateUserMessage(nextQuote)
      .then(this.scheduleNextQuote);

    return this;
  }

  scheduleNextQuote() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.serenade, this.interval);
    return this;
  }
}

module.exports = ZenOfPythonBot;
