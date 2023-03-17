import mongoose,{Model,Schema,model, models} from "mongoose";
const mongoosePaginate= require("mongoose-paginate");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
import {NextApiRequest} from "next";

interface IGame{
    idnumber:number
    userA:string
    userB:string
    hoseNumber:number[]
    winA:[][]
    winB:[][]
    turn:string
    time:number
    pointA:number
    pointB:number
    result:string
}
interface IGameMethods{
    // comparePassword(password:string):any
}
interface GameModel extends Model<IGame, {}, IGameMethods>{
    // checkToken(req:NextApiRequest,api_secret_key:string):object
    // createToken(user:object,api_secret_key:string,expiresIn:string):string
    // hashPassword(password:string):string
}
 
// build schema
var gameSchema= new Schema<IGame,GameModel,IGameMethods>({
    idnumber : {type : Number ,required : true},
    userA : {type : String , required :true},
    userB : {type : String , required :true,default:"0"},
    hoseNumber : {type : [Number] , required :true},
    winA : {type : [Array] , required :true,default:[]},
    winB : {type : [Array] , required :true,default:[]},
    turn : {type : String , required :true},
    time : {type : Number , required :true},
    pointA : {type : Number , required :true,default:0},
    pointB : {type : Number , required :true,default:0},
    result : {type : String , required :false}
},{timestamps:true})



// var Game
// try {
//     Game=model<IGame,GameModel>('Game',gameSchema,'game')
// } catch (error) {
//     Game=mongoose.models.Game
// }

// if(mongoose.Collection.collectionName="game"){
//     console.log("oh no")
// }


// module.exports=Game;

const Game=(models.Game || model<IGame,GameModel>('Game',gameSchema,'game')) as ReturnType<typeof model<IGame,GameModel>>
export {Game};







