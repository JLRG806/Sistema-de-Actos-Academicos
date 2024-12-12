import {User} from '../models/sequelize/User.js'
export const usersController = {}

usersController.getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    }catch (error) {
        res.status(500).json({ message: "Error getting users" })
    }
}

usersController.getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.json(user)
    }catch (error) {
        res.status(500).json({ message: "Error getting user" })
    }
}

usersController.createUser = async (req, res) => {
    const { email, fullName, password, roleId } = req.body

    try {
        const newUser = await User.create({
            email,
            fullName,
            password,
            roleId
        })

        res.json(newUser)
    }catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: "Email already exists" })
        }

        res.status(500).json({ message: "Error creating user" })
    }
}

usersController.updateUser = async (req, res) => {

    const { id } = req.params
    const { email, fullName, password, roleId } = req.body

    try {
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        user.email = email
        user.fullName = fullName
        user.password = password
        user.roleId = roleId

        await user.save()

        res.json(user)
    }catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: "Email already exists" })
        }

        res.status(500).json({ message: "Error updating user" })
    }

}

usersController.deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        await user.destroy()

        res.json({ message: "User deleted" })
    }catch (error) {
        res.status(500).json({ message: "Error deleting user" })
    }
}