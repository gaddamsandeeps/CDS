var SessionStore = require('express-mysql-session'),
    config = require('./config');

module.exports = new SessionStore(config.db);
