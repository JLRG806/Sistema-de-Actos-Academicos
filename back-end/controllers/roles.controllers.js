import { Role } from "../models/sequelize/Role.js";
export const rolesController = {}

rolesController.getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll()
        res.json(roles)
    } catch (error) {
        res.status(500).json({ message: "Error getting roles" })
    }
}

rolesController.getRole = async (req, res) => {
    const { id } = req.params
    
    try {
        const role = await Role.findByPk(id)

        if (!role) {
            return res.status(404).json({ message: "Role not found" })
        }

        res.json(role)
    } catch (error) {
        res.status(500).json({ message: "Error getting role" })
    }
}

rolesController.createRole = async (req, res) => {
    const { name } = req.body

    try {
        const newRole = await Role.create({ name })
        res.json(newRole)
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: "Role already exists" })
        }

        res.status(500).json({ message: "Error creating role" })
    }
}

rolesController.updateRole = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    try {
        const role = await Role.findByPk(id)

        if (!role) {
            return res.status(404).json({ message: "Role not found" })
        }

        role.name = name
        await role.save()

        res.json(role)
    } catch (error) {
        res.status(500).json({ message: "Error updating role" })
    }
}

rolesController.deleteRole = async (req, res) => {
    const { id } = req.params

    try {
        const role = await Role.findByPk(id)

        if (!role) {
            return res.status(404).json({ message: "Role not found" })
        }

        await role.destroy()

        res.json({ message: "Role deleted" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting role" })
    }
}