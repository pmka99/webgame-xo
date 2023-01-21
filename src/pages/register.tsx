import { useEffect, useState } from "react"
import style1 from '../styles/login.module.css'
import {GetServerSideProps} from 'next'

export default function refister(){

    const [width,setWidth]=useState<number>(300)
    const [height,setHeight]=useState<number>(300)

    useEffect(()=>{
        setWidth(innerWidth);
        
    },[])

    return(
        <div className={style1.login}>
            <div className={style1.loginDivMain}>
                <div className={style1.loginDiv2}>
                    <form className={style1.loginForm}>
                        <h4>register</h4>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">Enter Your Email :</label>
                            <input className="form-control" type="email" name="email" id="" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="username">Enter Your Username :</label>
                            <input className="form-control" type="text" name="username" id="" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="pass">Enter Your Password :</label>
                            <input className="form-control" type="password" name="pass" id="" />
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
