//Node Server which will handle socket io connections

const io = require('socket.io')(8000);//8000 is port no
const users = {};

//socket.io server will listen to the incoming events:
// io.on is a socket.io instance . It will listen to the different users connections
//socket.on will listen to the events related to a particular connection(user).
//socket.id is a new id for each connection.
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("New user ", name);
        users[socket.id] = name; //passing a key to a user in the form of name of the user joined.
        socket.broadcast.emit('user-joined', name); //Sending message of new user-joined to all the already present users.
    });

    socket.on('send', mess => {
        socket.broadcast.emit('receive', {message: mess, name: users[socket.id]})
    });

    socket.on('disconnect', mess => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})