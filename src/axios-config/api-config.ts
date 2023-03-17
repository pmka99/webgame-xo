import axios from "axios";

const intance = axios.create({
    baseURL:'http://localhost:3000/api/graphql',
    headers:{'content-type':'application/json'},
})

intance.interceptors.response.use(function(response){
    return response;
},function(err){
    return Promise.reject(err);
})

intance.interceptors.request.use(function(config){
    return config
},function(err){
    return Promise.reject(err)
})
export default intance;