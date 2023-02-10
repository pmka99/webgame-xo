import next from "next";
import http from 'http';
import {Server} from 'socket.io'

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

// nextApp.prepare()
//     .then(()=>{
//         http.createServer(async(req:any,res)=>{
//             try {
//                 // Be sure to pass `true` as the second argument to `url.parse`.
//                 // This tells it to parse the query portion of the URL.
//                 const parsedUrl = parse(req.url, true)
//                 const { pathname, query } = parsedUrl
          
//                 if (pathname === '/a') {
//                   await nextApp.render(req, res, '/a', query)
//                 } else if (pathname === '/b') {
//                   await nextApp.render(req, res, '/b', query)
//                 } else {
//                   await handle(req, res, parsedUrl)
//                 }
//               } catch (err) {
//                 console.error('Error occurred handling', req.url, err)
//                 res.statusCode = 500
//                 res.end('internal server error')
//               }
//         }).listen(3000, (err?:any) => {
//             if (err) throw err
//             console.log(`> Ready on http://localhost:3000`)
//           })
//     })


import express,{Express,Request,Response} from 'express';

nextApp.prepare()
    .then(async()=>{
        const app : Express = express();
        const server : http.Server =http.createServer(app);
        
        const io = new Server(server);
        io.on('connection', (socket) => {
          console.log('a user connected');
        });

        
        app.all("*",(req:any,res:any)=>{
          return handle(req,res) 
        })
        
        server.listen(3000, (err?:any) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:3000`)
          })
    })