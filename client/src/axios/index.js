import axios from 'axios';
// const baseURL  = 'http://localhost:3000/api';
const baseURL  = 'http://localhost:3000/api';
const instance = axios.create({
  withCredentials:true,    
  baseURL: baseURL,
  headers:{
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
  }
});

export default instance;