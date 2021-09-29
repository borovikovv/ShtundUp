const fs = require('fs');
const { ConfigService } = require('@nestjs/config');
const configure = new ConfigService();

module.exports = {
  development: {
    username: configure.get("POSTGRES_NAME"),
    password: configure.get("POSTGRES_PASSWORD"),
    database: configure.get("POSTGRES_DB"),
    host: configure.get("HOST"),
    port: Number(configure.get("POSTGRES_PORT")),
    dialect: 'postgres'
  }
//   development: {
//     username: "olexii",
//     password: "SudoPass7573User",
//     database: "shtundup",
//     host: "127.0.0.1",
//     port: 5432,
//     dialect: 'postgres'
//   }
};
