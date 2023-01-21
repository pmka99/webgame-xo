import { GetServerSideProps } from "next";
import { Context } from "vm";

export default function Hello({response}:Context){
    console.log(response)
    return(
        <>  
            {response.data.hello}
            <hr></hr>
            <h2>This is welcomming page</h2>
        </>
    )
}                   
export const getServerSideProps:GetServerSideProps=async(context:Context)=>{
    let data={
        query:`
            query{
                hello
            }
        `
    }
    let res=await fetch('http://localhost:3000/api/graphql',
        {
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify(data)
        }
    )
    let response= await res.json();


    return{
        props:{
            response
        }
    }
}
