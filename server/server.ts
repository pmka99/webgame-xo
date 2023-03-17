import next from "next";  
import http from 'http';                        
import {Server, Socket} from 'socket.io';
import session,{Session} from 'express-session'


// declare module "http" {
//     interface IncomingMessage {
//         session: Session & {
//             authenticated: boolean
//         }
//     }
// }





const hostname = 'localhost'
const port = 3000

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev, hostname, port })
const handle = nextApp.getRequestHandler()

import game from "./socket/socket.io";
import express,{Express,Request,Response,NextFunction} from 'express';
import mongoose from "mongoose";

mongoose.set('strictQuery', false) 
mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=>console.log("connect to db"))
.catch((err)=>console.log(err))
mongoose.Promise= global.Promise;


const app : Express = express();  
const server : http.Server =http.createServer(app); 
nextApp.prepare()
    .then(async()=>{ 
      
        app.all("*",(req:any,res:any)=>{  
          return handle(req,res)            
        }) 
        
        const io = new Server(server);  

        io.on('connection', (socket) => {
          console.log(socket.id)  
          game(io,socket)                     
        })
        const dashboardIo=io.of("/dashboard")
    
        server.listen(3000, (err?:any) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:3000`)
          })
    })
export default app;
const api_secret_key = "aH454E#GT#$Tggf@E" ;

function fetchSession(req: http.IncomingMessage) {
  throw new Error("Function not implemented.");
}
// export {api_secret_key};
