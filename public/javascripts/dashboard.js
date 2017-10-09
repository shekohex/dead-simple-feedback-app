document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
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
}
document.addEventListener('click', (event) => {
    let unRepliedMessage = findUpTag(event.target, '.un-replied-message')
    let messageId = unRepliedMessage.id
    let deleteMessage = findUpTag(event.target, '.delete-message')
    let replyMessage = findUpTag(event.target, '.reply-message')
    let sendReplyButton = findUpTag(event.target, '.send-reply')
    if (deleteMessage) {
        sendDeleteMessage(messageId)
    }
    if (replyMessage) {
        toggleDispaly('reply-to-'+messageId+'-text')
        toggleDispaly('reply-to-'+messageId+'-button')
    }
    if(sendReplyButton) {
        let text = document.getElementById('reply-to-'+messageId+'-text').value
        sendReply(messageId, text)
    }
})
function sendReply(id, replyText) {
    if(replyText === null) {
        document.getElementById('reply-to-'+id+'-text').classList.add('is-danger')
    } else {
        let replyText = document.getElementById('reply-to-'+id+'-text').value
        document.getElementById('reply-to-'+id+'-button').classList.add('is-loading')
        let xhr = new XMLHttpRequest()
        let url = "feedback/reply"
        xhr.open("POST", url, true)
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let json = JSON.parse(xhr.responseText)
                console.log(json)
                if(json.status) {
                    document.getElementById('reply-to-'+id+'-button').classList.remove('is-loading')
                    deleteRepliedMessage(id)
                    document.getElementById('replied').innerHTML = (parseInt(document.getElementById('replied').innerHTML) - 1).toString()
                    document.getElementById('total-messages').innerHTML = (parseInt(document.getElementById('total-messages').innerHTML) - 1).toString()
                }
            }
        }
        const data = JSON.stringify({ id, reply: replyText })
        xhr.send(data)
    }
}
function sendDeleteMessage(id) {
    let xhr = new XMLHttpRequest()
    let url = "feedback/delete"
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText)
            console.log(json)
            if (json.status) {
                deleteRepliedMessage(id)
                document.getElementById('total-messages').innerHTML = (parseInt(document.getElementById('total-messages').innerHTML) - 1).toString()
                document.getElementById('to-reply').innerHTML = (parseInt(document.getElementById('to-reply').innerHTML) - 1).toString()
                showDeleted()
            }
        }
    }
    const data = JSON.stringify({id})
    xhr.send(data)
}
function deleteRepliedMessage(id) {
    let element = document.getElementById(id)
    element.outerHTML = ""
}
function toggleDispaly(elementId) {
   if (document.getElementById(elementId).style.display === 'block'){
       document.getElementById(elementId).style.display = 'none'
   } else {
       document.getElementById(elementId).style.display = 'block'
   }
}
function showDeleted() {
    document.getElementById('deleted').style.display = 'block'
}
document.getElementById('close-deleted').addEventListener('click', () => {
    document.getElementById('deleted').style.display = 'none'
})
function findUpTag(el, selector) {
    if (el.matches(selector)) {
        return el
    }

    while (el.parentNode) {
        el = el.parentNode
        if (el.matches && el.matches(selector)) {
            return el
        }
    }
    return null
}
