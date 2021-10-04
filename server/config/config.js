module.exports = {
  development: {
    username: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.HOST,
    port: Number(process.env.POSTGRES_PORT),
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
