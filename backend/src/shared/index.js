import { knex, knexnest } from './database/postgres.js'
import * as core from './core/index.js'

const shared = {
  core,
  db: {
    knex,
    knexnest,
  },
}

export { shared }
