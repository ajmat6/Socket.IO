const socket = io("http://localhost:8000",{transports: ['websocket']}); //it created a problem . Research about transports in socket.io
const form = document.getElementById('myForm');
const messageInput = document.getElementById('messageInput');
const container = document.querySelector('.container');

//Notification for the other user that someone has joined:
const append = (mess, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = mess;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    container.append(messageElement);
}

//Event listener on the submission of the form:
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const mess = messageInput.value;
    append(`You: ${mess}`, 'Right'); //This will show on the right side of the sender of the message
    socket.emit('send', mess);
    messageInput.value = "";
})

const personName = prompt("Enter your name to enter into the Chat");

socket.emit('new-user-joined', personName); //firing the event of user joining to my web socket server

socket.on('user-joined', (personName) => {
    append(`${personName} joined the chat`, 'Right');
});

socket.on('receive', (e) => {
    append(`${e.name}: ${e.message}`, 'Left') //e here is equal to the constraints you defined in the index.js. Therfore here name and message is written instead of personName and mess.
});

socket.on('left', name => {
    append(`${name} left the chat`, 'Left')
})