import { Context } from 'vm';
// import User from './model/user'
import {Resolvers} from '../generated/graphql'
const User=require('./model/user')

const resolvers:Resolvers = {
    Query: {
      products: () => {
        return products;
      },
      hello:()=>"Hi mohmmad"
    },
    Mutation:{
      login:async(parent,{email,password},{api_secret_key})=>{
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
        let token =await User.createToken(user,api_secret_key,'3h')
        return {token}
      },
      register:async(parent,{name,email,password},{api_secret_key})=>{
        let user=await User.create({
          email,
          name,
          password: User.hashPassword(password)
        })
        return{ token: User.createToken(user,api_secret_key,'2h') }
        // return {token:"dgfhjk2"}
      }
    }
}

const products = [
    {
      id: 1,
      name: 'Cookie',
      price: 300,
    },
    {
      id: 2,
      name: 'Brownie',
      price: 350,
    },
  ];
  

export default resolvers;