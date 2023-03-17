import mongoose,{Model,Schema,model, Models, models} from "mongoose";
const mongoosePaginate= require("mongoose-paginate");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
import {NextApiRequest} from "next";

interface IUser{
    name:string
    email:string
    password:string
    gender:string
    winner:number
    looser:number
    games:number
    gameId:number
}
interface IUserMethods{
    comparePassword(password:string):any
}
interface UserModel extends Model<IUser, {}, IUserMethods>{
    checkToken(req:NextApiRequest,api_secret_key:string):object
    createToken(user:object,api_secret_key:string,expiresIn:string):string
    hashPassword(password:string):string
    checkVerifyToken(token:string,api_secret_key:string):IUser
}

// build schema
var userSchema= new Schema<IUser,UserModel,IUserMethods>({
    name : {type : String ,required : false},
    email : {type : String , required :true},
    password : {type : String , required :true },
    gender: {type: String, required:false},
    winner: {type: Number, required:true,default:0},
    looser: {type: Number, required:true,default:0},
    games: {type: Number, required:true,default:0},
    gameId:{type:Number,required:true,default:-1}
},{timestamps:true})

//write method and static method for new schema

userSchema.method('comparePassword',function comparePassword(password){
    return bcrypt.compareSync(password,this.password)
})

userSchema.static('createToken',async function createToken(user,api_secret_key,expiresIn){
    let {email,id}=user;
    return await jwt.sign({email,id},api_secret_key,{expiresIn:'2h'})
})

userSchema.static('checkToken',async function checkToken(req ,api_secret_key) {
    let token=req.cookies.token
    if(token){
        try {
            return await jwt.verify(token,api_secret_key)
        } catch (err) {
            throw new Error("Your token is expired , login again")
        }
    }
    else{
        return undefined;
    }
})

userSchema.static('checkVerifyToken',async function checkVerifyToken(token ,api_secret_key) {
        try {
            return await jwt.verify(token,api_secret_key)
        } catch (err) {
            throw new Error("Your token is expired , login again")
        }
})

userSchema.static('hashPassword',function hashPassword(password){
    let salt= bcrypt.genSaltSync(17);
    let hash= bcrypt.hashSync(password,salt);
    return hash;
})


// set mongoosepaginate as plugin for paginatethe result of response of api
userSchema.plugin(mongoosePaginate)

//export model "User" with use collection of 'user'

// var User
// try {
//     User=model<IUser,UserModel>('User',userSchema,'user')
// } catch (error) {
//     User=mongoose.models.User
// }

var User=(models.User || model<IUser,UserModel>('User',userSchema,'user')) as ReturnType<typeof model<IUser,UserModel>>

export {User}

// module.exports=User









