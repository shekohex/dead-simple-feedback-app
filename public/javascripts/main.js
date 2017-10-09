document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        console.log('done')
        let randomMessages = [
            'Say Hallo !',
            'Hay',
            'Ok ?',
            'Have a Message ?'
        ]
        let message = randomMessages[Math.floor(Math.random() * randomMessages.length)]
        let messageElement = document.getElementById('message')
        messageElement.placeholder = message
        const wow = new WOW(
            {
                boxClass: 'wow',      // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0,          // distance to the element when triggering the animation (default is 0)
                mobile: true,       // trigger animations on mobile devices (default is true)
                live: true,       // act on asynchronously loaded content (default is true)
                callback: function (box) {
                    // the callback is fired every time an animation is started
                    // the argument that is passed in is the DOM node being animated
                },
                scrollContainer: null // optional scroll container selector, otherwise use window
            }
        )
        wow.init();
        let times = document.getElementsByClassName('time')
        for(let i = 0; i < times.length; i++) {
            times[i].innerText = moment(times[i].innerText).fromNow()
            console.log(moment(times[i].innerText).fromNow())
        }
    }
    let lastMessageId = document.getElementById('last-message').value
    if(lastMessageId !== ''){
        document.getElementById('last-message').scrollIntoView()
    }
}
let messageText = document.getElementById('message')
document.getElementById("sendMessage").addEventListener("click", event => {
    console.log(messageText.value)
    if(messageText.value === '') {
        messageText.classList.add('is-danger')
        return
    }
    messageText.classList.add('is-loading')
    let xhr = new XMLHttpRequest()
    let url = "feedback/add"
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText)
            console.log(json)
            if(json.status) {
                messageText.classList.remove('is-loading')
                messageText.value = ''
                hideMessageArea()
                showThankYou()
            }

        }
    }
    const data = JSON.stringify({ message: messageText.value })
    xhr.send(data)
}, false)
messageText.onfocus = () => {
    messageText.classList.remove("is-danger")
}
function hideMessageArea() {
    document.getElementById('messageArea').style.display = 'none'
}
function showThankYou() {
    document.getElementById('thankYou').style.display = 'block'
}
document.getElementById('closeThankYou').addEventListener('click', () => {
    document.getElementById('messageArea').style.display = 'block'
    document.getElementById('thankYou').style.display = 'none'
})

