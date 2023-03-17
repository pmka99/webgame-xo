import { CanvasClick, CanvasHouseNumber, CanvasPreparing, CanvasGetCoordinates} from "../../models/types";
import apple from '../../images/apple.png'
import pear from '../../images/pear.png'

const preparing:CanvasPreparing=(canvas,canvasSize)=>{
    // tableSize
    const s=canvasSize;
    let ctx= canvas.getContext("2d");
    if(ctx){
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        for(let i=0;i<=6;i++){
            //
            ctx.moveTo(Math.ceil((s/6)*i), 0);
            ctx.lineTo(Math.ceil((s/6)*i), s);
            //
            ctx.moveTo(0,Math.ceil((s/6)*i));
            ctx.lineTo(s, Math.ceil((s/6)*i));
        }
        
        ctx.stroke(); // Draw it
    }
}

const tikClick:CanvasClick=(canvas,canvasSize,user,houseNumber,image)=>{
    const s=canvasSize
    let ctx= canvas.getContext("2d")
    let {x,y}=getCoordinates(canvasSize,houseNumber)


    if(ctx){
        ctx.drawImage(image,x,y,((s/6)-2),((s/6)-2))
    }
        
}


const getHouseNumber:CanvasHouseNumber=(canvasSize,clickedPoint)=>{
    const s=canvasSize;
    let x=clickedPoint.x
    let y=clickedPoint.y
    let x1=Math.floor(x/(s/6))
    let y1=Math.floor(y/(s/6))
    let houseNumber=(y1*6)+x1;
    return houseNumber;
}

const getCoordinates:CanvasGetCoordinates =(canvasSize,houseNumber)=>{
    const s=canvasSize;
    let y=Math.floor(houseNumber/6) 
    let x=houseNumber%6;
    x=((s/6)*x)+1
    y=((s/6)*y)+1
    return {x,y}
}


export {preparing,tikClick,getHouseNumber}