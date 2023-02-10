import { GetServerSideProps } from "next";
import path from "path";
import { useEffect } from "react";
// import socketIoClient,{io}from 'socket.io-client';
// import SocketIOClient from 'socket.io-client'

var xx={};
const fu1=(x:any)=>{
    xx=x;
}

export default function Hello({response}:any){
    console.log(response)

    useEffect(()=>{
        // useSocket();
    },[])

    // const useSocket=async()=>{
    //         const socket=io();
    //         socket.on("connect",()=>{
    //             socket.emit("hello",{ar:"addsfsdfsdf"})
    //         })
    //     }
        
        
        // socket.on("connection",()=>console.log("connectedddddd"))
        // socket.on("hello",(args:string)=>console.log(args))
        // console.log("sadasd")
    

    return(
        <>  
            {response.data.hello}
            <hr></hr>
            <h2>This is welcomming page</h2>
        </>
    )
}                   
export const getServerSideProps:GetServerSideProps=async()=>{
    let data={
        query:`
            query{
                hello
            }
        `
    };
    let res=await fetch('http://localhost:3000/api/graphql',
        {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }
    ).then(res1=>res1.json())
    .then(res1=>fu1(res1))
    // let res=await fetch('http://localhost:3000/api/graphql',data)
    let response= "await res.data"
    
    

    return{
        props:{
            response:xx
       }
    }
}
