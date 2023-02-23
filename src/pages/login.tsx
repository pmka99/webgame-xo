import { Button } from "@mui/material";
import { GetServerSideProps } from "next";
import {  FormEvent, useEffect, useState } from "react";
import { ContaitnerTag, TextFieldTag } from "../styles/form.style";

export default function Login(){
    const [width,setWidth]=useState<number>(300)
    const [height,setHeight]=useState<number>(300)
    const [email,setEmail]=useState<string>('')
    const [password,setPassword]=useState<string>('')

    useEffect(()=>{
        setWidth(innerWidth);
    },[])

    const login=async(e:FormEvent)=>{
        e.preventDefault();
        let data={
            query:`
                mutation($email: String!, $password: String!){
                    login(email: $email, password: $password){
                        token
                    }
                }
            `,
            variables:{
                email,
                password
            }
        }
        let res=await fetch('http://localhost:3000/api/graphql',{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(data)
        })
        let response=await res.json()
        console.log(response)
    }

    return(
        <div>
            <ContaitnerTag>
                <TextFieldTag inputProps={{style:{textAlign:'center'}}} onChange={(e)=>setEmail(e.target.value)} label="Email" size="small"></TextFieldTag>
                <TextFieldTag inputProps={{style:{textAlign:'center'}}} onChange={(e)=>setPassword(e.target.value)} label="Password" size="small"></TextFieldTag>
                <Button onClick={(e)=>login(e)} color="primary" variant="contained" fullWidth style={{margin:'3px'}}>login</Button>
            </ContaitnerTag>
        </div>
    )
}

export const getServerSideProps:GetServerSideProps=async()=> {
    return{
        props:{
            
        }
    }

}
