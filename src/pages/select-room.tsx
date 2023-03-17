import { Button, Grid } from "@mui/material"
import axios from "axios"

import Link from "next/link"
import router, { useRouter } from "next/router"
import { FormEvent, useEffect, useRef, useState } from "react"
import { ContaitnerTag, TextFieldTag } from "../styles/form.style"
import game from "./game"
import api from '../axios-config/api-config'


export default function SelectRoom(){

    const router=useRouter();

    const [room,setRoom]=useState<number>(1)
    const [state,setState]=useState<boolean>(false)

    useEffect(()=>{

        
    },[])



    const createGame=async(e:FormEvent)=>{
        e.preventDefault();
        let response=await api.post('',{
            query:`
                mutation{
                    createGame
                }
            `,
        })
        if(response.data.data==null){
            router.push("/login")
        }else{
            router.push("/game")
        }
        console.log(response.data)
    }

    const loginToRoom=async(e:FormEvent)=>{
        e.preventDefault();
        let response=await api.post('',{
            query:`
                mutation($idRoom: Int!){
                    loginGame(idRoom: $idRoom)
                }
            `,
            variables:{
                idRoom:room
            }
        })
        if(response.data.data==null){
            router.push("/login")
        }else{
            router.push("/game")
        }
        console.log(response.data)
    }
    return(
        <>
            <ContaitnerTag style={{textAlign:'center'}}>
                {
                    state===false
                        ?   
                            <Grid container>
                                <Grid item sm={7} xs={6} style={{borderRight:'solid',paddingRight:'10px'}}>
                                    <h2>Login to existing game</h2>
                                    <Button onClick={(e)=>setState(true)} color="primary" variant="contained" fullWidth style={{margin:'3px'}}>Login</Button>
                                </Grid>
                                <Grid item sm={5} xs={4} style={{paddingLeft:'10px'}}>
                                    <h2>Create a new game</h2>    
                                    <Button onClick={(e)=>createGame(e)} color="primary" variant="contained" fullWidth style={{margin:'3px'}}>Create</Button>
                                </Grid>
                            </Grid>

                        :   
                            <>
                                <TextFieldTag type="number" inputProps={{style:{textAlign:'center'}}} onChange={(e)=>setRoom(Number(e.target.value))} label="room id" size="small"></TextFieldTag>
                                <Button onClick={(e)=>loginToRoom(e)} color="primary" variant="contained" fullWidth style={{margin:'3px'}}>Login</Button>
                                <Button onClick={(e)=>setState(false)} color="primary" variant="contained" fullWidth style={{margin:'3px'}}>Return</Button>
                            </>   
                }      
            </ContaitnerTag>
        </>
    )
}