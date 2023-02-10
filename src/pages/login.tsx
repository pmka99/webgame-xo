import { GetServerSideProps } from "next";
import {  FormEvent, useEffect, useState } from "react";
import style1 from '../styles/login.module.css';
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";


const InputButton=styled(Button)(({theme})=>({
    [theme.breakpoints.down('md')]:{
        marginLeft:theme.spacing(1),
    },
    
})) as typeof Button

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
            <div className={style1.login}>
                <div className={style1.loginDivMain}>
                    <div className={style1.loginDiv2}>
                        <form onSubmit={e=>login(e)} name="login" className={style1.loginForm}>
                            <h4>login</h4> 
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Enter Your Email :</label>
                                <input onChange={e=>setEmail(e.target.value)} className="form-control" type="email" name="email" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="pass">Enter Your Password :</label>
                                <input onChange={e=>setPassword(e.target.value)} className="form-control" type="password" name="pass" />
                            </div>
                            <input className="btn btn-primary" type="submit" value="login" />
                            <InputButton variant="contained" color="success">Login</InputButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export const getServerSideProps:GetServerSideProps=async()=> {
    return{
        props:{
            
        }
    }

}
