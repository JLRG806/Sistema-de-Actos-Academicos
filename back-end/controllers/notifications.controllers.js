import { Notification } from '../models/sequelize/Notification.js';
import { defaultResponse } from '../utils/index.js';
export const notificationsController = {}

notificationsController.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll()
        res.json(defaultResponse({ data: { notifications: notifications } }))
    } catch (error) {
        res.status(500).json(defaultResponse({ errorMessage: 'Error getting notifications', errorStatus: true }))
    }
}

notificationsController.getNotification = async (req, res) => {
    const { id } = req.params
    try {
        const notification = await Notification.findByPk(id)

        if (!notification) {
            return res.status(404).json(defaultResponse({ errorMessage: 'Notification not found', errorStatus: true }))
        }

        res.json(defaultResponse({ data: { notification: notification } }))
    } catch (error) {
        res.status(500).json(defaultResponse({ errorMessage: 'Error getting notification', errorStatus: true }))
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

        res.json(defaultResponse({ data: { notification: newNotification }, message: 'Notification created' }))
    } catch (error) {
        res.status(500).json(defaultResponse({ errorMessage: 'Error creating notification', errorStatus: true }))
    }
}

notificationsController.updateNotification = async (req, res) => {

    const { id } = req.params
    const { title, description, userId } = req.body

    try {
        const notification = await Notification.findByPk(id)

        if (!notification) {
            return res.status(404).json(defaultResponse({ errorMessage: 'Notification not found', errorStatus: true }))
        }

        notification.title = title
        notification.description = description
        notification.userId = userId
        await notification.save()

        res.json(defaultResponse({ data: { notification: notification }, message: 'Notification updated' }))
    } catch (error) {
        res.status(500).json(defaultResponse({ errorMessage: 'Error updating notification', errorStatus: true }))
    }
}

notificationsController.deleteNotification = async (req, res) => {
    const { id } = req.params

    try {
        const notification = await Notification.findByPk(id)

        if (!notification) {
            return res.status(404).json(defaultResponse({ errorMessage: 'Notification not found', errorStatus: true }))
        }

        await notification.destroy()

        res.json(defaultResponse({ message: 'Notification deleted' }))
    } catch (error) {
        res.status(500).json(defaultResponse({ errorMessage: 'Error deleting notification', errorStatus: true }))
    }
}