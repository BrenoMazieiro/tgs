module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    }
  },
}