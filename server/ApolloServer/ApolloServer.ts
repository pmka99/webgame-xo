import { ApolloServer } from "@apollo/server";  
import startServerAndCreateNextHandler from "./server.config";
import mongoose from "mongoose";

// import schema{resolvers,typeDefs}
import resolvers from "./resolvers";
import {readFileSync} from 'fs';
const typeDefs=readFileSync('./server/ApolloServer/schema.graphql',{encoding:'utf-8'})

import {User} from '../model/user'


// DB connection
// mongoose.set('strictQuery', false)
// mongoose.connect('mongodb://127.0.0.1:27017/test')
// .then(()=>console.log("connect to db"))
// .catch((err)=>console.log(err))
// mongoose.Promise= global.Promise;

interface MyContext {
    token?: String;
}

const Apollo=new ApolloServer({
  typeDefs,
  resolvers
})

const handler=startServerAndCreateNextHandler(Apollo, {
  context: async (req,res) => {
    console.log(req.cookies) 
    let api_secret_key = "aH454E#GT#$Tggf@E" ;
    let user= await User.checkToken(req , api_secret_key)
    return { user,api_secret_key,res}
  }
});
export default handler;

