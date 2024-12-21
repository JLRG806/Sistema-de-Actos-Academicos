import { API_URL } from "../index.js"
import { toastHandler } from "../utils/utils.js"

const getRoles = async () => {
    try {
        const response = await fetch(`${API_URL}/roles`)
        const data = await response.json()
        const rolesList = data.data.roles
        const roleSelect = document.getElementById('roleId')

        rolesList.forEach(role => {
            let opt = document.createElement('option');
            opt.value = role.id;
            opt.innerHTML = role.name;
            roleSelect.appendChild(opt);
        });
    } catch (err) {
        console.log(err)
    }
}
getRoles()

document.getElementById('registerForm').addEventListener('submit', createUser);
async function createUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const fullName = document.getElementById('fullName').value;
    const password = document.getElementById('password').value;
    const roleId = document.getElementById('roleId').value;

    console.log(Number.isInteger())

    if (!Number.isInteger(parseInt(roleId))) {
        toastHandler('Elija un rol permitido.', true)
        return;
    }

    let message = ''
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, fullName, password, roleId })
        });

        if (response.ok) {
            const data = await response.json();
            message = data.message || 'Registro exitoso, redirigiendo al login...';
            toastHandler(message, false)
            setTimeout(() => {
                window.location.href = '/front-end/views/index.html';
            }, 2000);
        } else {
            const data = await response.json();
            message = data.error.message || 'Error en el registro';
            toastHandler(message, true)
        }
    } catch (err) {
        console.log(err);
        message = 'Error al conectar con el servidor, intentelo mas tarde.';
        toastHandler(message, true)
    }
}