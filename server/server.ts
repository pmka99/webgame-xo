import next from "next";  
import http from 'http';                        
import {Server, Socket} from 'socket.io';     

const hostname = 'localhost'
const port = 3000

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev, hostname, port })
const handle = nextApp.getRequestHandler()

import game from "./socket/socket.io";
import express,{Express,Request,Response} from 'express';

const app : Express = express();  
const server : http.Server =http.createServer(app); 
nextApp.prepare()
    .then(async()=>{  
        app.all("*",(req:any,res:any)=>{  
          return handle(req,res)            
        }) 
        
        const io = new Server(server);  
        io.on('connection', (socket) => { 
          console.log('a user connected');  
          game(io,socket)                     
        })  

        server.listen(3000, (err?:any) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:3000`)
          })
    })
export default app;

