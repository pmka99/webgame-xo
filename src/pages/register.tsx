import React, { useEffect, useState } from "react"
import style1 from '../styles/login.module.css'
import {GetServerSideProps} from 'next'


export default function Register(){

    const [width,setWidth]=useState<number>(300)
    const [height,setHeight]=useState<number>(300)

    const [email,setEmail]=useState<string>('')
    const [name,setName]=useState<string>('')
    const [password,setPassword]=useState<string>('')

    useEffect(()=>{
        setWidth(innerWidth);
        // console.log();
    },[])

    const submit=async(e:any)=>{
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
        <div className={style1.login}>
            <div className={style1.loginDivMain}>
                <div className={style1.loginDiv2}>
                    <form onSubmit={e=>submit(e)} className={style1.loginForm}>
                        <h4>register</h4>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">Enter Your Email :</label>
                            <input onChange={e=>setEmail(e.target.value)} className="form-control" type="email" name="email" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="username">Enter Your Username :</label>
                            <input onChange={e=>setName(e.target.value)} className="form-control" type="text" name="username" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="pass">Enter Your Password :</label>
                            <input onChange={e=>setPassword(e.target.value)} className="form-control" type="password" name="pass" required />
                        </div>
                            <input className="btn btn-primary" type="submit" value="register" />
                    </form>
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
