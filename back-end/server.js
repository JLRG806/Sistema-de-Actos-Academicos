import express from 'express'
import morgan from 'morgan'
import config from './config/config.js'
import { connect } from './db/db.js'
import routes from './routes/index.js'
import './models/sequelize/index.js'

const app = express()

app.use(express.json({ limit: "10MB" }))
//app.options('*', middlewares.cors)
//app.use(middlewares.cors)
app.use(morgan('dev'))


// Routes
app.use('/api', routes.rolesRoutes)
app.use('/api', routes.usersRoutes)
app.use('/api', routes.eventsRoutes)
app.use('/api', routes.notificationsRoutes)

// Start server
async function main() {
    const result = await connect()
    if (result) {
        //await result.sync({ alter: true })
        //await result.sync({ force: true })
        app.listen(config.PORT, () => {
            console.log(`Server is running on http://127.0.0.1:${config.PORT}`)
        })
    }
}

main()
