import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.SERVER_PORT || 5000,
    db: {
        postgres: {
            DATABASE_URL: process.env.DATABASE_URL,
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