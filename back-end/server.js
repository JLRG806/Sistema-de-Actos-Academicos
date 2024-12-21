import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import config from './config/config.js'
import { connect } from './db/db.js'
import routes from './routes/index.js'
import './models/sequelize/index.js'

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json({ limit: "10MB" }))
app.use(cors({credentials: true, origin: `http://127.0.0.1:${config.PORT}`}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Static files
app.use('/', express.static(`${process.cwd()}/public/front-end/`));
app.use('/', express.static(`${process.cwd()}/public/front-end/views`));

// Set Cache Control
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})

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
console.log(`${process.cwd()}/public/`)
