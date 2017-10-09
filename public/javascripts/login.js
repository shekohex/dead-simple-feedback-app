let username = document.getElementById('username')
let password = document.getElementById('password')
document.getElementById("login").addEventListener("click", event => {
    if(password.value === '' || username.value === '') {
        username.classList.add('is-danger')
        return
    }
    document.getElementById("login").classList.add('is-loading')
    let xhr = new XMLHttpRequest()
    let url = "login"
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("login").remove('is-loading')
                password.value = ''
                window.location.replace('/dashboard')
        }
        if (xhr.readyState === 4 && xhr.status === 401) {
            document.getElementById("login").classList.remove('is-loading')
            password.value = ''
            showError()
        }
    }
    const data = `username=${username.value}&password=${password.value}`
    xhr.send(data)
}, false)
username.onfocus = () => {
    password.classList.remove("is-danger")
    username.classList.remove("is-danger")
    document.getElementById('loginError').style.display = 'none'
}
function showError() {
    document.getElementById('loginError').style.display = 'block'
}
document.getElementById('closeError').addEventListener('click', () => {
    document.getElementById('loginError').style.display = 'none'
})