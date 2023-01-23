import mongoose,{Model,Schema,model} from "mongoose";
const mongoosePaginate= require("mongoose-paginate");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
import {NextApiRequest} from "next"

// DB connection
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/test')
.then(()=>console.log("connect to db"))
.catch((err)=>console.log(err))
mongoose.Promise= global.Promise;

interface IUser{
    name:string
    email:string
    password:string
}
interface IUserMethods{
    comparePassword(password:string):any
}
interface UserModel extends Model<IUser, {}, IUserMethods>{
    checkToken(req:NextApiRequest,api_secret_key:string):object
    createToken(user:object,api_secret_key:string,expiresIn:string):string
    hashPassword(password:string):string
}

// build schema
var userSchema= new Schema<IUser,UserModel,IUserMethods>({
    name : {type : String ,required : false},
    email : {type : String , required :true},
    password : {type : String , required :true}
},{timestamps:true})

//write method and static method for new schema

userSchema.method('comparePassword',function comparePassword(password){
    return bcrypt.compareSync(password,this.password)
})

userSchema.static('createToken',async function createToken(user,api_secret_key,expiresIn){
    let {email,id}=user;
    return await jwt.sign({email,id},api_secret_key,{expiresIn})
})

userSchema.static('checkToken',async function checkToken(req ,api_secret_key) {
    let token= req.headers['x-token'];
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

userSchema.static('hashPassword',function hashPassword(password){
    let salt= bcrypt.genSaltSync(17);
    let hash= bcrypt.hashSync(password,salt);
    return hash;
})

// set mongoosepaginate as plugin for paginatethe result of response of api
userSchema.plugin(mongoosePaginate)


//export model "User" with use collection of 'user'
let User;
try {
    User=model<IUser,UserModel>('User',userSchema,"user")
} catch (error) {
    // console.log(error)
    User=mongoose.models.User
}
module.exports= User;





