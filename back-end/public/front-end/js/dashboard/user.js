import { API_URL } from '../index.js'
import { toastHandler } from '../utils/utils.js'
import { main } from './index.js'

const searchUsers = (userList, userFullName) => {
    let filteredUsers = []

    if (!userFullName) {
        filteredUsers = [...userList]
    } else {
        filteredUsers = [...userList].filter(user => {
            return user.fullName.toLowerCase().includes(userFullName.toLowerCase())
        })
    }
    
    const userTableBody = document.querySelector('#userTable tbody')
    userTableBody.innerHTML = ''
    const userIdList = document.getElementById('userIdList')
    userIdList.innerHTML = ''

    filteredUsers.forEach(user => {
        const row = document.createElement('tr')
        row.innerHTML = `
    <td>${user.id}</td>
    <td>${user.fullName}</td>
    <td>${user.email}</td>
    <td>${user.role.name}</td>
    <td><button class="btn btn-outline-danger" onclick="deleteUser(${user.id})">Eliminar</button></td>
  `
        userTableBody.appendChild(row)

        const option = document.createElement('option')
        option.value = user.id
        option.innerHTML = user.fullName
        userIdList.appendChild(option)
    })

    return filteredUsers
}

const loadUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            credentials: 'include'
        })

        if (!response.ok) {
            window.location.replace('/')
        }

        const users = await response.json()
        const userTableBody = document.querySelector('#userTable tbody')
        userTableBody.innerHTML = ''
        const userIdList = document.getElementById('userIdList')
        userIdList.innerHTML = ''

        users.data.users.forEach(user => {
            const row = document.createElement('tr')
            row.innerHTML = `
    <td>${user.id}</td>
    <td>${user.fullName}</td>
    <td>${user.email}</td>
    <td>${user.role.name}</td>
    <td><button class="btn btn-outline-danger" onclick="deleteUser(${user.id})">Eliminar</button></td>
  `
            userTableBody.appendChild(row)

            const option = document.createElement('option')
            option.value = user.id
            option.innerHTML = user.fullName
            userIdList.appendChild(option)
        })

        return users.data.users
    } catch (err) {
        console.log(err)
        toastHandler('Error al cargar usuarios', true)
    }
}

const createUser = async (event) => {
    event.preventDefault()

    const fullName = document.getElementById('fullName').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const roleId = document.getElementById('roleId').value

    console.log(Number.isInteger())

    if (!Number.isInteger(parseInt(roleId))) {
        toastHandler('Elija un rol permitido.', true)
        return
    }

    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ fullName, email, password, roleId })
        })

        const data = await response.json()

        if (response.ok) {
            toastHandler('Usuario agregado con éxito', false)
            main()
        }
        if (data.error.status) {
            toastHandler(data.error.message, true)
        }
    } catch (err) {
        toastHandler('Error al agregar usuario', true)
    }
}

const deleteUser = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`,
            { method: 'DELETE', credentials: 'include' })

        if (response.ok) {
            toastHandler('Usuario eliminado con éxito', false)
            loadUsers()
        }
    } catch (err) {
        toastHandler('Error al eliminar usuario', true)
    }
}

export {
    searchUsers,
    loadUsers,
    createUser,
    deleteUser
}