 const config = require("../../../knexfile");
 const knexfile = require("knex");

 const connection = knexfile.knex(config.development);

 module.exports = connection;