import { Server, Socket } from 'socket.io'


const game=(io:Server,socket:Socket)=> {
    socket.emit("hi","haaaahhaha?!")
}

export default game;