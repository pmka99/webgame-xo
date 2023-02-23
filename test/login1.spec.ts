// import app from '../server/server'

import chai from 'chai';
import chaiHttp from 'chai-http';
const assert=chai.assert;
const expect=chai.expect;
const should=chai.should();
chai.use(chaiHttp);


var token1="";


describe("login",()=>{
    it("login to server",done=>{
        let data={
            query:`
                mutation($email: String!, $password: String!){
                    login(email: $email, password: $password){
                        token
                    }
                }
            `,
            variables:{
                email:"pmka@gmail.com",
                password:"123456"
            }
        }
        chai.request("http://localhost:3000")
            .post('/api/graphql')
            .send(data)
            // .then((res:any)=>{
            //     console.log(res.body)
            //     res.body.should.be.a('string')
            //     done()
            // })  
            .end((err:any,res:any)=>{
                // console.log(res.body)
                res.body.data.should.be.a('object')
                token1=res.body.data.login.token.toString() 
                // console.log(res.body.data.login.token)
                done()
            })
    }).timeout(50000)
    it("verify token to server",done=>{
        let data1={
            query:`
                query($token: String!){
                    checkVerifyToken(token: $token){
                        email
                        id
                    }
                }
            `,
            variables:{
                token:token1
            }
        }
        chai.request("http://localhost:3000")
            .post('/api/graphql')
            .send(data1)
            .end((err:any,res:any)=>{
                console.log(res.body.data)
                res.body.data.should.be.a('object')
                done()
            })
    }).timeout(50000)
    
})



