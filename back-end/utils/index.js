import config from '../config/config.js'

// Javadoc style comments
/**
 * Check if the user is an administrator
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @returns {boolean} - True if the user is an administrator, false otherwise
 */
export const isAdministrator = (email, password) => {
    const adminEmail = config.admin.email
    const adminPassword = config.admin.password
    if (email === adminEmail && password === adminPassword) {
        return true
    }
    return false
}

// Javadoc style comments
/**
 * Generates a standardized response object.
 *
 * @param {Object} params - The parameters for the response.
 * @param {*} [params.data=null] - The data payload for the response.
 * @param {string} [params.message=''] - A general success or informational message.
 * @param {string} [params.errorMessage=''] - A message describing an error.
 * @param {boolean} [params.errorStatus=false] - Indicates if an error occurred.
 * @returns {Object} The standardized response object.
 * @returns {Object} error - The error details.
 * @returns {string} error.message - The error message.
 * @returns {boolean} error.status - The error status.
 * @returns {*} data - The data payload.
 * @returns {string} message - The general message.
 */
export const defaultResponse = ({ data = null, message = '', errorMessage = '', errorStatus = false }) => {
    return {
        error: {
            message: errorMessage,
            status: errorStatus
        },
        data: data,
        message: message
    }
}

export const redirectOnUnauthorized = (res) => {
    return res.redirect('/')
}