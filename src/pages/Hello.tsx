import axios from "axios";
import bodyParser from "body-parser";
import { GetServerSideProps } from "next";
import { NoFallbackError } from "next/dist/server/base-server";
import { useEffect } from "react";
import { Context } from "vm";
// import fetch from 'node-fetch'
var xx={};
const fu1=(x:any)=>{
    xx=x;
}

export default function Hello({response}:any){
    console.log(response)

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
