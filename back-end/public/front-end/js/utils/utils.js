export const toastHandler = (message, isError) => {
    const toastBox = document.getElementById('toastBox')
    const toastBody = document.getElementById('toastMessage')
    let backgroundColor = ''

    if (isError) {
        backgroundColor = 'bg-danger'
        toastBody.innerHTML = message
        toastBox.classList.add(backgroundColor)
        toastBox.classList.remove('hide')
        toastBox.classList.add('show')
    } else {
        backgroundColor = 'bg-success'
        toastBody.innerHTML = message
        toastBox.classList.add(backgroundColor)
        toastBox.classList.remove('hide')
        toastBox.classList.add('show')
    }

    setTimeout(() => {
        toastBox.classList.remove(backgroundColor)
        toastBox.classList.remove('show')
        toastBox.classList.add('hide')
    }, 7000)
}