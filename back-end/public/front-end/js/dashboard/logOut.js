import { API_URL } from '../index.js'

export const logOut = async () => {
    try {
        console.log('logOut')
        const response = await fetch(`${API_URL}/logout`)

        if (response.ok) {
            window.location.replace('/')
        }
    } catch (err) {
        console.log(err)
        toastHandler('Error al cerrar sesión', true)
    }
}