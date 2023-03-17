import { Console } from 'console';
import mongoose from 'mongoose';
import { Server, Socket } from 'socket.io'
const User=require('../model/user')
// import { api_secret_key } from '../server';
const api_secret_key = "aH454E#GT#$Tggf@E" ;
import cookie from 'cookie'

// // DB connection
// mongoose.set('strictQuery', false)
// mongoose.connect('mongodb://127.0.0.1:27017/test')
// .then(()=>console.log("connect to db"))
// .catch((err)=>console.log(err))
// mongoose.Promise= global.Promise;


const game=(io:Server,socket:Socket)=> {
    socket.emit("hi","haaaahhaha?!")
    socket.on("join to room",({roomId})=>{
        socket.join(roomId)
        console.log(`${socket.id} joned to ${roomId}`)
    })
    socket.emit("show server socket",socket.id)
    socket.on("send message",({message,roomId,privateMessage})=>{
        console.log({roomId,privateMessage})
        privateMessage =="true"
            ?   socket.to(roomId).emit("give message",message)
            :   socket.broadcast.emit("give message",message)
    })
    socket.on("join room",()=>{
        let token=socket.handshake.headers.cookie
        console.log(token)
    })
 
}

export default game;