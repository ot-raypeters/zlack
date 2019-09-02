const USERS = require('../fixtures/users.json');

class User {
  constructor(props) {
    // @todo strict enforcement of props
    Object.assign(this, props);
    USERS.push(this);
  }

  static create(props) {
    return new User(props);
  }

  static getAll() {
    return Promise.resolve([...USERS]);
  }
}

module.exports = User;