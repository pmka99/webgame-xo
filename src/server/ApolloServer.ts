import { ApolloServer } from "@apollo/server";  
import {expressMiddleware} from "@apollo/server/express4";
import cors from 'cors';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import express from 'express';
import bodyParser from "body-parser";
import resolvers from "./resolvers";
import {readFileSync} from 'fs';
const typeDefs=readFileSync('./src/server/schema.graphql',{encoding:'utf-8'})
import startServerAndCreateNextHandler from "./server.config";
import {NextApiHandler} from 'next'

import User from './model/user';

console.log(User)

interface MyContext {
    token?: String;
}

const Apollo=new ApolloServer({
  typeDefs,
  resolvers
})

const handler=startServerAndCreateNextHandler(Apollo, {
  context: async (req,res) => {
    let api_secret_key = "aH454E#GT#$Tggf@E" ;
    let user= await User.checkToken(req , api_secret_key)
    return {user , api_secret_key}
  }
});
export default handler;

