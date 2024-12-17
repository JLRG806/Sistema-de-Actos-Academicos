import jwt from 'jsonwebtoken'
import { isAdministrator, defaultResponse } from '../utils/index.js'
import config from '../config/config.js'

export const cookieJWTauthUser = async (req, res, next) => {

    try {
        const token = req.req.cookies.token
        if (!token) {
            return res.status(401).json(defaultResponse({ errorMessage: 'Unauthorized', status: true }))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json(defaultResponse({ errorMessage: 'Unauthorized', status: true }))
        }

        console.log(decoded)
        req.userData = decoded
        next()
    } catch (error) {
        res.clearCookie('token')
        return res.status(401).json(defaultResponse({ errorMessage: 'Unauthorized', errorStatus: true }))
    }
}

export const cookieJWTauthAdmin = async (req, res, next) => {

    try {
        const token = req.cookies.token

        const email = req.body.email
        const password = req.body.password

        if (!token) {
            return res.status(401).json(defaultResponse({ errorMessage: 'Unauthorized', errorStatus: true }))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const isAdmin = isAdministrator(email, password)
        if (!isAdmin) {
            return res.status(401).json(defaultResponse({ errorMessage: 'Unauthorized', errorStatus: true }))
        }

        req.userData = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json(defaultResponse({ errorMessage: 'Unauthorized', errorStatus: true }))
    }
}

export const createJWT = (res, fullName, email) => {
    const token = jwt.sign({ fullName: fullName, email: email }, process.env.JWT_SECRET, { expiresIn: config.jwt.expiresIn })
    res.cookie('token', token, { httpOnly: true, secure: true })
    return token
}

export const deleteJWT = (res) => {
    res.clearCookie('token')
}