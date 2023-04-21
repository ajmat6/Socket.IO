const socket = io("http://localhost:8000",{transports: ['websocket']});
const form = document.getElementById('myForm');
const messageInput = document.getElementById('messageInput');
const container = document.querySelector('.container');

const personName = prompt("Enter your name to enter into the Chat");

socket.emit('new-user-joined', personName);