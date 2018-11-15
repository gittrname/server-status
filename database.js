var config = require('config');
var NeDB = require('nedb');
// db
var db = new NeDB({
  filename: config.database,
  autoload: true
});

module.exports = db;
