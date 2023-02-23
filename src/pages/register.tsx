import React, { FormEvent, useEffect, useState } from "react"
import {GetServerSideProps} from 'next';
import { SelectTag,TextFieldTag,ContaitnerTag } from "../styles/form.style";
import { Button, FormControl, FormLabel, InputLabel, MenuItem } from "@mui/material";

export default function Register(){
    const [width,setWidth]=useState<number>(300)
    const [height,setHeight]=useState<number>(300)

    const [email,setEmail]=useState<string>('')
    const [name,setName]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const [gender,setGender]=useState<string|unknown>('')

    useEffect(()=>{
        setWidth(innerWidth);
        // console.log();
    },[])
    
    
    const register=async(e:any)=>{
        e.preventDefault();
        console.log(name,email,password)
        let data={
             query:`
                mutation($email: String!, $name: String!, $password: String!){
                    register(email: $email, name: $name, password: $password) {
                        token
                    }
                }
            `,
            variables:{
                email,
                name,
                password
            }
        }                    
        let res= await fetch('http://localhost:3000/api/graphql',{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(data)
        })
        let response= await res.json()
        console.log(response)
    }

    return(
        <div>
            <ContaitnerTag>
                <FormLabel style={{fontWeight:'bold',color:'red'}}>Register</FormLabel>
                <TextFieldTag inputProps={{style:{textAlign:'center'}}} onChange={(e)=>setEmail(e.target.value)} label="Email" size="small" />
                <TextFieldTag inputProps={{style:{textAlign:'center'}}} onChange={(e)=>setName(e.target.value)} label="Username" size='small' />
                <FormControl fullWidth>
                    <InputLabel size="small" htmlFor="gender" style={{marginBottom:'25px'}}>
                        <div style={{marginTop:'3px'}}>Gender</div>
                    </InputLabel>
                    <SelectTag label="gender" value={gender} size="small" id="gender"
                    onChange={(e)=>setGender(e.target.value)}>
                        <MenuItem style={{margin:'auto'}} value=""><em style={{margin:'auto',textAlign:'center'}}>None</em></MenuItem>
                        <MenuItem value="male" ><div style={{margin:'auto',textAlign:'center'}}>male</div></MenuItem>
                        <MenuItem value="female"><div style={{margin:'auto',textAlign:'center'}}>female</div></MenuItem>
                        <MenuItem value="other"><div style={{margin:'auto',textAlign:'center'}}>other</div></MenuItem>
                    </SelectTag>
                </FormControl>
                <TextFieldTag inputProps={{style:{textAlign:'center'}}} onChange={(e)=>setPassword(e.target.value)} label="Password" size="small" />
                <Button onClick={(e)=>register(e)} color="primary" variant="contained" fullWidth style={{margin:'3px'}}>register</Button>
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
