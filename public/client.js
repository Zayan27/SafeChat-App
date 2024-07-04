const socket = io()

let name_;

let textarea = document.querySelector('#textarea')

let messageArea = document.querySelector('.message_area')
do{
    name_ = prompt('please enter your name: ')
}while(!name_)

textarea.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

    // textarea.addEventListener('keydown',(k)=>{
    //     if(k.key === '+'){
    //         const text_enc = k.target.value;
    //         const pass = 'my-password'
    //         const encryption = CryptoJS.DES.encrypt(text_enc, pass).toString();
    //         sendMessage(k.target.encryption);
    //     }
    // })


const sendMessage = (message) =>{
    let msg ={
        user:name_,
        message:message
    }
    //append
    appendMessage(msg,'outgoing')
    textarea.value = ''

    //send to server

    socket.emit('message',msg)

}

const appendMessage = (msg,type) =>{
    let mainDiv = document.createElement('div')
    let classname  = type
    mainDiv.classList.add(classname, 'message')
    let markup = `<h4>${msg.user}</h4>
                <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
}

//recive
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
})



// const socket = io()
// let name;
// let textarea = document.querySelector('#textarea')
// let messageArea = document.querySelector('.message_area')
// do {
//     name = prompt('Please enter your name: ')
// } while(!name)

// textarea.addEventListener('keyup', (e) => {
//     if(e.key === 'Enter') {
//         sendMessage(e.target.value)
//     }
// })

// function sendMessage(message) {
//     let msg = {
//         user: name,
//         message: message.trim()
//     }
//     // Append 
//     appendMessage(msg, 'outgoing')
//     textarea.value = ''
//     scrollToBottom()

//     // Send to server 
//     socket.emit('message', msg)

// }

// function appendMessage(msg, type) {
//     let mainDiv = document.createElement('div')
//     let className = type
//     mainDiv.classList.add(className, 'message')

//     let markup = `
//         <h4>${msg.user}</h4>
//         <p>${msg.message}</p>
//     `
//     mainDiv.innerHTML = markup
//     messageArea.appendChild(mainDiv)
// }

// // Recieve messages 
// socket.on('message', (msg) => {
//     appendMessage(msg, 'incoming')
//     scrollToBottom()
// })

// function scrollToBottom() {
//     messageArea.scrollTop = messageArea.scrollHeight
// }