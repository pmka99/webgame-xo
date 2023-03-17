// import User from './model/user'
// import { Token } from 'graphql';
import {Resolvers} from './generated/graphql'
// const User=require('../model/user')
// const Game=require('../model/game')
import {User} from '../model/user';
import { Game } from '../model/game';

const resolvers:Resolvers = {
    Query: {
      hello:()=>"Hi mohmmad",
      checkVerifyToken:async(parent,{token},{api_secret_key})=>{
        let user=await User.checkVerifyToken(token,api_secret_key)
        
        return user
      }
    },
    Mutation:{
      createGame:async(parent,{},{user})=>{ 
        console.log(user)
        if(!user){
          console.log("User Not Found")
          throw new Error("User Not Found!")
        }else{
          let myuser=await User.findById(user.id)
          if(myuser!.gameId==-1){
            let hoseNumber=[];
            for(let i=0;i<=35;i++){
              hoseNumber.push(0)
            }
            console.log(myuser)
            let time=15000; 
            let turn="A";
            let idnumber=Math.floor(Math.random()*100000)
            console.log(hoseNumber,user.id,idnumber)
            let game=await Game.create({idnumber,userA:user.id,hoseNumber,turn,time})
            console.log(game)
            return true  
          }else{
            throw new Error("You can't create game, you are in a game")
          }
        }    
      },
      loginGame:async(parent,{idRoom},{user})=>{
        if(!user){
          console.log("User Not Found")
          throw new Error("User Not Found!")
        }else{
          let myuser=await User.findById(user.id)
          if(myuser!.gameId==-1){
            let game=await Game.findOne({idnumber:idRoom})
            if(game!.userB==""){
              game=await Game.findOneAndUpdate({idnumber:idRoom},{userB:user.id})
            }
            console.log(game)
            return true;  
          }else{
            throw new Error("You can't create game, you are in a game")
          }
        }    
      },
      login:async(parent,{email,password},{api_secret_key,res})=>{
        let user= await User.findOne({email})
        if(!user){
          console.log("User Not Found")
          throw new Error("User Not Found!")
        }
        let isValid= await user.comparePassword(password)
        if(!isValid){
          console.log("Password is Wrong")
          throw new Error("Password is Wrong")
        }
        let token =await User.createToken(user,api_secret_key,'2h')
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge:7200000
        });
        return {token}
      },
      register:async(parent,{name,email,password},{api_secret_key,res})=>{
        let user=await User.create({
          email,
          name,
          password: User.hashPassword(password)
        })
        let token =await User.createToken(user,api_secret_key,'2h')
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge:7200000
        });
        return{ token }
      }
    }
}
  

export default resolvers;