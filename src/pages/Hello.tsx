import { Button, MenuItem, Select, TextField } from "@mui/material";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import {io}from 'socket.io-client';


var xx={};
const fu1=(x:any)=>{
    xx=x;
}

const socket=io()


export default function Hello(){
    const [message,setmessage]=useState<string>('')
    const [receiveMessage,setReceivemessage]=useState<string>('receiveMessage')
    const [socketId,setSocketId]=useState<string>('')
    const [roomId,setRoomId]=useState<string>('')
    const [serverSocketId,setServerSocketId]=useState<string>('')
    const [privateMessage,setPrivateMessage]=useState<string>("false")

    
    useEffect(()=>{

        socket.on("give message",(arg)=>{
            setReceivemessage(arg)
        })
        setSocketId(socket.id)
        setServerSocketId(socket.id)
    },[socket])
    
    const sendMessage=()=>{
        socket.emit('send message',{roomId,message,privateMessage})
    }
    const joinToRoom=()=>{
        setPrivateMessage("true")
        socket.emit("join to room",{roomId})
    }
    const createToken=()=>{
        socket.emit('createToken',"test1")
    }
    const test=()=>{
        socket.emit("test","")
    }

    return(
        <>  
            <TextField onChange={(e)=>setRoomId(e.target.value)} label="room Id" value={roomId}></TextField>
            <TextField label="soket Id" value={serverSocketId}></TextField>
            <TextField label="message" onChange={(e)=>setmessage(e.target.value)}></TextField>
            <Select value={privateMessage} onChange={(e)=>{setPrivateMessage(e.target.value)}}>
                <MenuItem value="false">false</MenuItem>
                <MenuItem value="true">true</MenuItem>
            </Select>
            <Button variant="contained" onClick={()=>joinToRoom()}>join room</Button>
            <Button variant="contained" onClick={()=>sendMessage()}>send message</Button>
            <Button variant="contained" onClick={()=>sendMessage()}>create token</Button>
            <button onClick={()=>test()}>Test</button>
            <hr></hr>
            {/* <h5>socketId:</h5> */}
            <h4 style={{color:"red"}}>{socketId}</h4>
            <h4 style={{color:"blue"}}>{receiveMessage}</h4>
        </>
    )
}                   
export const getServerSideProps:GetServerSideProps=async()=>{
    // let data={
    //     query:`
    //         query{
    //             hello
    //         }
    //     `
    // };
    // let res=await fetch('http://localhost:3000/api/graphql',
    //     {
    //         method:'POST',
    //         headers:{"Content-Type":"application/json"},
    //         body:JSON.stringify(data)
    //     }
    // ).then(res1=>res1.json())
    // .then(res1=>fu1(res1))
    // // let res=await fetch('http://localhost:3000/api/graphql',data)
    // let response= "await res.data"
    
    

    return{
        props:{
            
       }
    }
}
