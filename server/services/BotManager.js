const ZenOfPythonBot = require('../bots/ZenOfPythonBot');
const User = require('../models/User');

class BotManager {
  static configure(app) {
    BotManager.activateZenOfPythonBot(app);
  }

  static activateZenOfPythonBot(app) {
    const userId = 'zop-bot';
    User.findOrCreate(userId, 'Zen of Python Bot')
      .then((user) => {
        const bot = ZenOfPythonBot.create(app, user).join('general');
        setTimeout(() => bot.serenade(), 7777);
      });
  }
}

module.exports = BotManager;