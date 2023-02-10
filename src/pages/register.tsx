import React, { FormEvent, useEffect, useState } from "react"
import style1 from '../styles/login.module.css';
import {Container, FormControl, FormLabel, InputLabel, MenuItem, TextField,SelectChangeEvent, Button } from '@mui/material'
import {GetServerSideProps} from 'next'
import {styled} from '@mui/material/styles'
import {Select} from '@mui/material'
import { margin } from "@mui/system";

const SelectTag=styled(Select)(({theme})=>({
    margin:'3px',
    backgroundColor:'white',
    width:'100%',
    [theme.breakpoints.down('sm')]:{
        
    }
}))

const ContaitnerTag=styled(Container)(({theme})=>({
    // backgroundColor:'blue',
    [theme.breakpoints.up('sm')]:{
        width:'430px'
    },
    [theme.breakpoints.between('xs','sm')]:{
        width:'300px'
    },
    [theme.breakpoints.down('xs')]:{
        width:'100%',
    },
    // [theme.breakpoints.down('xs')]:{
    //     width:'1px'
    // },
}))
const TextFieldTag=styled(TextField)(({theme})=>({
    margin:'3px',
    backgroundColor:'white',
    borderRadius:'4px',
    width:'100%',
    [theme.breakpoints.down('sm')]:{

    }
}))

// const DivTag=styled()
export default function Register(){

    const [width,setWidth]=useState<number>(300)
    const [height,setHeight]=useState<number>(300)

    const [email,setEmail]=useState<string>('')
    const [name,setName]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const [gender,setGender]=useState<string>('')

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
                <TextFieldTag onChange={(e:any)=>(setEmail(e.target.value))} label="Email" size="small" />
                <TextFieldTag onChange={(e:any)=>(setName(e.target.value))} label="Username" size='small' />
                <FormControl fullWidth>
                    <InputLabel size="small" htmlFor="gender" style={{marginBottom:'25px'}}>
                        <div style={{marginTop:'3px'}}>Gender</div>
                    </InputLabel>
                    <SelectTag label="gender" value={gender} size="small" id="gender"
                    onChange={(e:any)=>(setGender(e.target.value))}>
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="male" >male</MenuItem>
                        <MenuItem value="female">female</MenuItem>
                        <MenuItem value="other">other</MenuItem>
                    </SelectTag>
                </FormControl>
                <TextFieldTag onChange={(e:any)=>(setPassword(e.target.value))} label="Password" size="small" />
                <Button onClick={(e:any)=>(register(e))} color="primary" variant="contained" fullWidth style={{margin:'3px'}}>register</Button>
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
