import { MouseEvent, useEffect, useRef, useState } from "react"
import { getHouseNumber, preparing, tikClick } from "../components/game/preparing"
import { style,DivTag} from "../styles/canvas.style"
import {io} from 'socket.io-client'

import apple from '../images/apple.png'
import pear from '../images/pear.png'

const socket=io()
export default function game(){
    const [width,setWidth]=useState<number>(300)
    const [height,setHeight]=useState<number>(300)
    const [canvasSize,setCanvasSize]=useState<number>(width)
    const [join,setJoin]=useState<boolean>(false)

    const canvasRef=useRef(null)
    const appleRef=useRef(null)
    const pearRef=useRef(null)

    useEffect(()=>{
        var canvas=canvasRef.current;
        if(canvas){
            preparing(canvas,canvasSize)
        }
        setWidth(innerWidth);
        setHeight(innerHeight)
        if(width>=height){
            setCanvasSize(Math.ceil((height*(9/10))))
            // console.log(canvasSize)
        }else if(height<width){
            setCanvasSize(Math.ceil((width*(9/10))))
            // console.log(canvasSize)
        }
        socket.emit("join room")
    },[canvasSize])


    const click=(e:MouseEvent)=>{
        // console.log(e.nativeEvent.offsetX,e.nativeEvent.offsetY)
        var canvas=canvasRef.current;
        if(canvas){
            let houseNumber=getHouseNumber(canvasSize,{x:e.nativeEvent.offsetX,y:e.nativeEvent.offsetY})
            if(pearRef.current){
                tikClick(canvas,canvasSize,1,houseNumber,pearRef.current)
                // console.log("print image")
            }
            
        }
        
    }

    return(
        <>
            <DivTag>
                {
                    join===false
                        ?   "waiting to another user join"
                        :   <canvas onClick={(e)=>click(e)} ref={canvasRef} width={canvasSize} height={canvasSize} style={style}/>
   
                }
            </DivTag>
            <img src={apple.src} ref={appleRef} style={{visibility:'hidden'}} />
            <img src={pear.src} ref={pearRef} style={{visibility:'hidden'}} />
        </>
    )

}