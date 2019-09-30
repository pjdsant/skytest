
const User = require('../models/user');

module.exports = (id, res, next) => {
  User.findOneAndUpdate({id: id}, {$set: {ultimo_login: Date.now()}});
};
