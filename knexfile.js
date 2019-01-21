// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/accounts.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: "dbMigrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
