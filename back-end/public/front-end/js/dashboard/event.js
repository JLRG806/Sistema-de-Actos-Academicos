import { API_URL } from '../index.js'
import { toastHandler } from '../utils/utils.js'
import { main } from './index.js'

const searchEvents = (eventList, eventTitle) => {
    let filteredEvents = []

    if (!eventTitle) {
        filteredEvents = [...eventList]
    } else {
        filteredEvents = [...eventList].filter(event => {
            return event.title.toLowerCase().includes(eventTitle.toLowerCase())
        })
    }

    const eventTableBody = document.querySelector('#eventTable tbody')
    eventTableBody.innerHTML = ''

    filteredEvents.forEach(event => {
        const row = document.createElement('tr')
        row.innerHTML = `
    <td>${event.id}</td>
    <td>${event.title}</td>
    <td>${event.description}</td>
    <td>${event.start_date} - ${event.end_date}</td>
    <td>${event.location}</td>
    <td>${event.status}</td>
    <td>${event.users.map(user => user.fullName).join(', ')}</td>
    <td><button class="btn btn-outline-danger" onclick="deleteEvent(${event.id})">Eliminar</button></td>
  `
        eventTableBody.appendChild(row)
    })
    return filteredEvents
}

const loadEvents = async () => {
    try {

        const response = await fetch(`${API_URL}/events`, {
            credentials: 'include'
        })

        if (!response.ok) {
            window.location.replace('/')
        }

        const events = await response.json()
        const eventTableBody = document.querySelector('#eventTable tbody')
        eventTableBody.innerHTML = ''

        events.data.events.forEach(event => {
            const row = document.createElement('tr')
            row.innerHTML = `
    <td>${event.id}</td>
    <td>${event.title}</td>
    <td>${event.description}</td>
    <td>${event.start_date} - ${event.end_date}</td>
    <td>${event.location}</td>
    <td>${event.status}</td>
    <td>${event.users.map(user => user.fullName).join(', ')}</td>
    <td><button class="btn btn-outline-danger" onclick="deleteEvent(${event.id})">Eliminar</button></td>
  `
            eventTableBody.appendChild(row)
        })

        return events.data.events
    } catch (err) {
        console.log(err)
        toastHandler('Error al cargar eventos', true)
    }
}
const getRoles = async () => {
    try {
        const response = await fetch(`${API_URL}/roles`, {
            credentials: 'include'
        })
        const data = await response.json()
        const rolesList = data.data.roles
        const roleSelect = document.getElementById('roleId')

        rolesList.forEach(role => {
            let opt = document.createElement('option')
            opt.value = role.id
            opt.innerHTML = role.name
            roleSelect.appendChild(opt)
        })
    } catch (err) {
        console.log(err)
        toastHandler('Error al cargar roles', true)
    }
}

const createEvent = async (event) => {
    event.preventDefault()

    const title = document.getElementById('eventTitle').value
    const description = document.getElementById('eventDescription').value
    const start_date = document.getElementById('eventStartDate').value
    const end_date = document.getElementById('eventEndDate').value
    const location = document.getElementById('eventLocation').value
    const status = document.getElementById('eventStatus').value
    const userIdList = Array.from(document.getElementById('userIdList').selectedOptions).map(option => option.value)

    if (userIdList.length === 0) {
        toastHandler('Seleccione al menos un usuario', true)
        return
    }

    try {
        const response = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ title, description, start_date, end_date, location, status, userIdList })
        })

        if (response.ok) {
            toastHandler('Evento agregado con éxito', false)
            main()
        }
    } catch (err) {
        toastHandler('Error al agregar evento', true)
    }
}

const deleteEvent = async (eventId) => {
    try {
        const response = await fetch(`${API_URL}/events/${eventId}`,
            {
                method: 'DELETE',
                credentials: 'include'
            })

        if (response.ok) {
            toastHandler('Evento eliminado con éxito', false)
            loadEvents()
        }
    } catch (err) {
        console.log(err)
        toastHandler('Error al eliminar evento', true)
    }
}

export {
    searchEvents,
    loadEvents,
    getRoles,
    createEvent,
    deleteEvent
}