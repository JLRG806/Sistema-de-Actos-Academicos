import { searchUsers, loadUsers, createUser, deleteUser } from './user.js'
import { searchEvents, loadEvents, getRoles, createEvent, deleteEvent } from './event.js'
import { logOut } from './logOut.js'

let USER_LIST = []
let EVENT_LIST = []

// Función para cerrar sesión
window.logOut = logOut

// Cargar roles
getRoles()
// Función para mostrar secciones
function showSection(sectionId) {
    document.getElementById('usuarios').style.display = 'none'
    document.getElementById('eventos').style.display = 'none'
    document.getElementById(sectionId).style.display = 'block'
}
window.showSection = showSection

/**
 * CRUD Usuarios
 */
//Create
document.getElementById('userForm').addEventListener('submit', createUser)
// Read
window.loadUsers = loadUsers
// Search
document.getElementById('searchUsers').addEventListener('input', (e) => {
    console.log('searchUsers')
    const searchValue = document.getElementById('searchUsers').value
    const filteredUsers = searchUsers(USER_LIST, searchValue)
})
// Update
//window.updateUser = updateUser
// Delete
window.deleteUser = deleteUser

/**
 * CRUD Eventos
 */
//Create
document.getElementById('eventForm').addEventListener('submit', createEvent)
// Update
//window.updateEvent = updateEvent
// Read
window.loadEvents = loadEvents
// Search
document.getElementById('searchEvents').addEventListener('input', (e) => {
    console.log('searchEvents')
    const searchValue = document.getElementById('searchEvents').value
    const filteredEvents = searchEvents(EVENT_LIST, searchValue)
})
// Delete
window.deleteEvent = deleteEvent

// Función principal
export async function main() {
    USER_LIST = await loadUsers()
    EVENT_LIST = await loadEvents()
}
main()