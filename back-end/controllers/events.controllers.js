import { Event } from "../models/sequelize/Event.js";
import { defaultResponse } from "../utils/index.js";
export const eventsController = {}

eventsController.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll()

        for (const event of events) {
            const users = await event.getUsers()
            event.dataValues.users = users
        }
        res.json(defaultResponse({ data: { events: events }, message: 'Events found' }))
    } catch (error) {
        console.log(error)
        res.status(500).json(defaultResponse({ errorMessage: 'Error getting events', errorStatus: true }))
    }
}

eventsController.getEvent = async (req, res) => {
    const { id } = req.params
    try {
        const event = await Event.findByPk(id)

        if (!event) {
            return res.status(404).json(defaultResponse({ errorMessage: 'Event not found', errorStatus: true }))
        }

        const userEvents = await event.getUsers()

        res.json(defaultResponse({ data: { event: event, users: userEvents }, message: 'Event found' }))
    } catch (error) {
        console.log(error)
        res.status(500).json(defaultResponse({ errorMessage: 'Error getting event', errorStatus: true }))
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

        newEvent.dataValues.users = userEvents

        res.json(defaultResponse({ data: { event: newEvent }, message: 'Event created' }))
    } catch (error) {
        console.log(error)
        res.status(500).json(defaultResponse({ errorMessage: 'Error creating event', errorStatus: true }))
    }
}

eventsController.updateEvent = async (req, res) => {

    const { id } = req.params
    const { title, description, start_date, end_date, location, status, userIdList } = req.body

    try {
        const event = await Event.findByPk(id)

        if (!event) {
            return res.status(404).json(defaultResponse({ errorMessage: 'Event not found', errorStatus: true }))
        }

        event.title = title
        event.description = description
        event.start_date = start_date
        event.end_date = end_date
        event.location = location
        event.status = status
        await event.save()

        let userEvents = await newEvent.addUsers(userIdList)
        userEvents = await newEvent.getUsers()

        newEvent.dataValues.users = userEvents

        res.json(defaultResponse({ data: { event: newEvent }, message: 'Event updated' }))
    } catch (error) {
        console.log(error)
        res.status(500).json(defaultResponse({ errorMessage: 'Error updating event', errorStatus: true }))
    }
}

eventsController.deleteEvent = async (req, res) => {
    const { id } = req.params

    try {
        const event = await Event.findByPk(id)

        if (!event) {
            return res.status(404).json(defaultResponse({ errorMessage: 'Event not found', errorStatus: true }))
        }

        await event.destroy()
        res.json(defaultResponse({ message: 'Event deleted' }))
    } catch (error) {
        res.status(500).json(defaultResponse({ errorMessage: 'Error deleting event', errorStatus: true }))
    }
}