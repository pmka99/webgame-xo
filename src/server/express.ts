import express,{ Express,Request,Response } from "express";
import next from "next";

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(async()=>{
        const server:Express= express();

        server.get('/sa',(req,res)=>{
            res.end("example '/sa'")
        })

        server.get('*',(req:Request,res:Response)=>{
            return handle(req,res)
        })
        
        server.listen(3000,(err?:any) =>{
            if(err) throw err;
            console.log("server is running....")
        })
    })
    .catch(err=>{console.log(err),
            process.exit(1)
        })
        