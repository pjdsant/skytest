/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
const checkAuth = require('../../api/middleware/check-auth');
const events = require('events');

module.exports = {
  'setUp': function(cb) {
    this._openStdin = process.openStdin;
    this._log = console.log;
    this._checkAuth = checkAuth;
    this._exit = process.exit;

    const ev = this.ev = new events.EventEmitter();
    process.openStdin = function() {
      return ev;
    };
    return cb();
  },
  'tearDown': function(cb) {
    // reset all the overidden functions:
    process.openStdin = this._openStdin;
    process.exit = this._exit;
    this._checkAuth = checkAuth;
    console.log = this._log;
    return cb();
  },
  'test checkAuth': function(test) {
    test.equal('1', '1');
    test.throws(function() {
      checkAuth();
    });
    test.throws(function() {
      checkAuth(null);
    });
    test.throws(function() {
      checkAuth(true);
    });
    test.throws(function() {
      checkAuth([]);
    });
    // eslint-disable-next-line no-tabs
    test.throws(function() {
      checkAuth({});
    });
    test.throws(function() {
      checkAuth('asdf');
    });
    test.throws(function() {
      dcheckAuth('123');
    });
    test.done();
  },
};
