import { Notification } from '../models/sequelize/Notification.js';
export const notificationsController = {}

notificationsController.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll()
        res.json(notifications)
    } catch (error) {
        res.status(500).json({ message: "Error getting notifications" })
    }
}

notificationsController.getNotification = async (req, res) => {
    const { id } = req.params
    try {
        const notification = await Notification.findByPk(id)

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" })
        }

        res.json(notification)
    } catch (error) {
        res.status(500).json({ message: "Error getting notification" })
    }
}

notificationsController.createNotification = async (req, res) => {
    const { title, description, userId } = req.body

    try {
        const newNotification = await Notification.create({
            title,
            description,
            userId
        })

        res.json(newNotification)
    } catch (error) {
        res.status(500).json({ message: "Error creating notification" })
    }
}

notificationsController.updateNotification = async (req, res) => {

    const { id } = req.params
    const { title, description, userId } = req.body

    try {
        const notification = await Notification.findByPk(id)

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" })
        }

        notification.title = title
        notification.description = description
        notification.userId = userId
        await notification.save()

        res.json(notification)  
    } catch (error) {
        res.status(500).json({ message: "Error updating notification" })
    }
}

notificationsController.deleteNotification = async (req, res) => {
    const { id } = req.params

    try {
        const notification = await Notification.findByPk(id)

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" })
        }

        await notification.destroy()

        res.json({ message: "Notification deleted" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting notification" })
    }
}