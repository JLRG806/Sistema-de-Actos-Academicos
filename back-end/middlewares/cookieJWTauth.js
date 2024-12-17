import jwt from 'jsonwebtoken'
import { isAdministrator, defaultResponse } from '../utils/index.js'

export const cookieJWTauthUser = async (req, res, next) => {

    try {
        const token = req.cookies.token
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
        if (!token) {

            return res.status(401).json(defaultResponse({ errorMessage: 'Unauthorized', errorStatus: true }))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        const isAdmin = isAdministrator(decoded.email, decoded.password)
        if (!isAdmin) {
            return res.status(401).json(defaultResponse({ errorMessage: 'Unauthorized', errorStatus: true }))
        }

        req.userData = decoded
        next()
    } catch (error) {
        //res.clearCookie('token')
        return res.status(401).json(defaultResponse({ errorMessage: 'Unauthorized', errorStatus: true }))
    }
}

export const createJWT = async (res, email, password) => {
    const token = jwt.sign({ email: email, password: password }, process.env.JWT_SECRET, { expiresIn: '5m' })
    res.cookie('token', token, { httpOnly: true, secure: true })
    return token
}

export const deleteJWT = async (res) => {
    res.clearCookie('token')
}