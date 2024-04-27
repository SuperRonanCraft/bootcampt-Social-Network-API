const { connect, connection } = require("mongoose");

const connectionString = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`;

connect(connectionString);

module.exports = connection;
