import express from 'express'
import morgan from 'morgan'
import config from './config/config.js'
import { connect } from './db/db.js'
import './models/sequelize/index.js'



const app = express()



app.use(express.json({ limit: "10MB" }))
//app.options('*', middlewares.cors)
//app.use(middlewares.cors)
app.use(morgan('dev'))

// Routes
app.get('/api', (req, res) => {
    res.send([{ msg: 'Hello World Damm son!!' }])
})

async function main() {
    const result = await connect()
    if (result) {
        await result.sync()
        app.listen(config.PORT, () => {
            console.log(`Server is running on http://127.0.0.1:3000`)
        })
    }
}

main()

