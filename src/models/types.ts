
type CanvasPreparing=(canvas:HTMLCanvasElement,canvasSize:number)=>void

type CanvasClick=(canvas:HTMLCanvasElement,canvasSize:number,user:number,houseNumber:number,image:CanvasImageSource)=>void 

type ClickedPoint={
    x:number
    y:number
}

type CanvasHouseNumber=(canvasSize:number,clickedPoint:ClickedPoint)=>number

type CanvasGetCoordinates=(canvasSize:number,houseNumber:number)=>ClickedPoint


export type {CanvasClick,CanvasPreparing,CanvasHouseNumber,ClickedPoint,CanvasGetCoordinates}