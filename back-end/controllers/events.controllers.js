import { Event } from "../models/sequelize/Event.js";
import { UserEvents } from "../models/sequelize/UserEvents.js";
import { User } from "../models/sequelize/User.js";
export const eventsController = {}

eventsController.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll()
        res.json(events)
    } catch (error) {
        res.status(500).json({ message: "Error getting events" })
    }
}

eventsController.getEvent = async (req, res) => {
    const { id } = req.params
    try {
        const event = await Event.findByPk(id)

        if (!event) {
            return res.status(404).json({ message: "Event not found" })
        }

        const userEvents = await event.getUsers()

        res.json({ event: event, users: userEvents })
    } catch (error) {
        console.log(error) 
        res.status(500).json({ message: "Error getting event" })
    }
}

eventsController.createEvent = async (req, res) => {
    const { title, description, start_date, end_date, location, status, userIdList } = req.body

    try {
        const newEvent = await Event.create({
            title,
            description,
            start_date,
            end_date,
            location,
            status
        })

        await newEvent.addUsers(userIdList)
        await newEvent.save()
        
        const userEvents = await newEvent.getUsers()

        res.json({ event: newEvent, users: userEvents })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating event" })
    }
}

eventsController.updateEvent = async (req, res) => {

    const { id } = req.params
    const { title, description, start_date, end_date, location, status, userId } = req.body

    try {
        const event = await Event.findByPk(id)

        if (!event) {
            return res.status(404).json({ message: "Event not found" })
        }

        event.title = title
        event.description = description
        event.start_date = start_date
        event.end_date = end_date
        event.location = location
        event.status = status
        event.userId = userId
        await event.save()

        res.json(event)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error updating event" })
    }
}

eventsController.deleteEvent = async (req, res) => {
    const { id } = req.params

    try {
        const event = await Event.findByPk(id)

        if (!event) {
            return res.status(404).json({ message: "Event not found" })
        }

        await event.destroy()
        res.json({ message: "Event deleted" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting event" })
    }
}