import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    db: {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT

    },
    jwt: {
        secret: process.env.JWT_SECRET
    },

}