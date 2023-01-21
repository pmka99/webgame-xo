import { Context } from 'vm';
import User from './model/user'

const resolvers = {
    Query: {
      products: () => {
        return products;
      },
      hello:()=>"Hi mohmmad"
    },
    Mutation:{
      login:async()=>{

        return{
          token:"dsfdf"
        }
      },
      register:()=>{
        return{
          token:"asdasd"
        }
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