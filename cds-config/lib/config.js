var _ = require('lodash');

var errors = require("./errors/error-messages.js");

// Load app configuration

// _.assign combines the two objects into a bigger object.
module.exports = _.assign(
    // configuration variables that will be the same across all environments
    require('./env/all.js'),
    // configuration variables that are environment specific
    require('./env/' + (process.env.NODE_ENV) + '.js') || {}
    //appends errors messages
    //require(__dirname + '/errors/error-messages.js')
);

exports = module.exports.errors = errors;
