import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.SERVER_PORT || 5000,
    db: {
        postgres: {
            options: {
                user: process.env.PG_USER,
                host: process.env.PG_HOST,
                database: process.env.PG_DB,
                password: process.env.PG_PASSW,
                port: process.env.PG_PORT,
                dialect: 'postgres',
            },
            client: null
        }

    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    },
    admin: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSW
    }
}