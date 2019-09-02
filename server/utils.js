const uuidv4 = require('uuid/v4');

function generateUid() {
  return uuidv4();
}

module.exports = { generateUid };