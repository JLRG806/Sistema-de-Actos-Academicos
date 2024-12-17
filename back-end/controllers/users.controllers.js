import { User } from '../models/sequelize/User.js'
import argon2 from 'argon2'
import { defaultResponse } from '../utils/index.js'

export const usersController = {}

usersController.login = async (req, res) => {

    try {
        const { email, password } = req.body

        if (isAdministrator) {

            defaultResponse.message = 'Logged in as administrator'
            
            return res.json(defaultResponse({ message: 'Logged in as administrator' }))
        }

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            defaultResponse.error.message = 'User not found'
            defaultResponse.error.status = true
            return res.status(404).json(defaultResponse)
        }

        if (await argon2.verify(user.password, password)) {
            return res.senStatus(200)
        } else {
            return res.status(401).json(defaultResponse({ errorMessage: 'Invalid password', errorStatus: true }))
        }
    } catch (error) {
        return res.status(500).json(defaultResponse({ errorMessage: 'Error logging in', errorStatus: true }))
    }

}

usersController.register = async (req, res) => {
    try {
        const { email, fullName, password } = req.body

        const hashedPassword = await argon2.hash(password)

        const newUser = await User.create({
            email,
            fullName,
            password: hashedPassword,
            roleId: 2
        })

        return res.senStatus(201)
    } catch (error) {
        console.log(error)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json(defaultResponse({ errorMessage: 'Email already exists', errorStatus: true }))
        }


        return res.status(500).json(defaultResponse({ errorMessage: 'Error creating user', errorStatus: true }))
    }
}

usersController.getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(defaultResponse({ data: { users: users }, message: 'Users found' }))
    } catch (error) {
        res.status(500).json(defaultResponse({ errorMessage: 'Error getting users', errorStatus: true }))
    }
}

usersController.getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json(defaultResponse({ errorMessage: 'User not found', errorStatus: true }))
        }

        res.json(defaultResponse({ data: { user: user }, message: 'User found' }))
    } catch (error) {
        res.status(500).json(defaultResponse({ errorMessage: 'Error getting user', errorStatus: true }))
    }
}

usersController.createUser = async (req, res) => {
    const { email, fullName, password, roleId } = req.body

    try {
        const hashedPassword = await argon2.hash(password)

        const newUser = await User.create({
            email,
            fullName,
            password: hashedPassword,
            roleId
        })

        res.json(defaultResponse({ data: { user: newUser }, message: 'User created' }))
    } catch (error) {
        console.log(error)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json(defaultResponse({ errorMessage: 'Email already exists', errorStatus: true }))
        }

        res.status(500).json(defaultResponse({ errorMessage: 'Error creating user', errorStatus: true })
        )
    }
}

usersController.updateUser = async (req, res) => {

    const { id } = req.params
    const { email, fullName, password, roleId } = req.body

    try {
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json(defaultResponse({ errorMessage: 'User not found', errorStatus: true }))
        }

        user.email = email
        user.fullName = fullName
        user.password = password
        user.roleId = roleId

        await user.save()

        res.json(defaultResponse({ data: { user: user }, message: 'User updated' }))
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json(defaultResponse({ errorMessage: 'Email already exists', errorStatus: true }))
        }

        res.status(500).json(defaultResponse({ errorMessage: 'Error updating user', errorStatus: true }))
    }

}

usersController.deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json(defaultResponse({ errorMessage: 'User not found', errorStatus: true }))
        }

        await user.destroy()

        res.json(defaultResponse({ message: 'User deleted' }))
    } catch (error) {
        res.status(500).json(defaultResponse({ errorMessage: 'Error deleting user', errorStatus: true }))
    }
}