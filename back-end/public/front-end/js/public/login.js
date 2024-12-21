import { API_URL } from "../index.js"
import { toastHandler } from "../utils/utils.js"

document.getElementById('loginForm').addEventListener('submit', loginUser);

async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let message = ''
    try {
        const response = await fetch(API_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        console.log(response);

        if (response.ok) {
            message =  'Inicio de sesión exitoso, redirigiendo al dashboard...';
            toastHandler(message, false)
            setTimeout(() => {
                window.location.href = '/views/dashboard/index.html';
            }, 1000);
        } else {
            const data = await response.json();
            message = data.error.message || 'Usuario o contraseña incorrectos';
            toastHandler(message, true)
        }
    } catch (err) {
        console.log(err.message);
        message = 'Error al conectar con el servidor, intentelo mas tarde.';
        toastHandler(message, true)
    }
}