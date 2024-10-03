import dotenv from 'dotenv'
dotenv.config()

export const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production'
export const PORT = process.env.PORT
export const API_VERSION = process.env.API_VERSION
export const CORS_ORIGIN = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN : '*'
export const LANGUAGE = process.env.LANGUAGE ? process.env.LANGUAGE : 'EN'

export const DBASE_URL = process.env.DBASE_URL ? process.env.DBASE_URL : 'postgresql://postgres:postgres@localhost:5432/postgres'
export const TZ = process.env.TZ ? process.env.TZ : 'America/Montevideo'

export const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : ''
export const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS)
