import { env } from '@/project/configurations/environment'
import * as promise from 'bluebird'
import pgPromise from 'pg-promise'

const initOptions = {
  promiseLib: promise
}

const pgp = pgPromise(initOptions)
const db = pgp(env.pgDatabaseConfig.connectionString)

export { db }
