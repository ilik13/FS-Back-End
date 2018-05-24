const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db_users.json');
const db = low(adapter);

db.defaults({ users: [] })
  .write();

module.exports = db;
