import { Sequelize } from 'sequelize'
import config from '../config/config.js'

export const sequelize = new Sequelize(config.db.postgres.DATABASE_URL)

export async function connect() {

    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        config.db.postgres.client = sequelize
        return sequelize
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        return false
    }
}