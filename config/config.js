module.exports = {
  development: {
    username: "root",
    password: null,
    database: "ad_service",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "ad_service",
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: false
  }
}
