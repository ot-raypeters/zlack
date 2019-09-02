const USERS = require('../fixtures/users.json');
const BY_USER_ID = {};

class User {
  constructor(props) {
    // @todo strict enforcement of props
    Object.assign(this, props);
    USERS.push(this);
  }

  static create(props) {
    return new User(props);
  }

  static indexByUserId(user) {
    BY_USER_ID[user.threadId] = BY_USER_ID[user.threadId] || [];
    BY_USER_ID[user.threadId].push(user);
  }

  static getAll() {
    return Promise.resolve([...USERS]);
  }

  static byId(userId) {
    return Promise.resolve(BY_USER_ID[userId] || null);
  }

  static findOrCreate(userId, username) {
    return User.byId(userId)
      .then((user) => {
        if (user) return user;
        return User.create({ uid: userId, username });
      });
  }
}

USERS.forEach(User.indexByUserId);
module.exports = User;
