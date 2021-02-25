
import axios from 'axios';
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
let baseURL = 'http://localhost:3000/'

const $http = axios.create({
    baseURL,
})

axios.interceptors.response.use(response => {
   return response;
  },error => {
       if (error.response.status==404) {
        Toast(error.response.data.message);
       } else {
        Toast("服务器异常");
       }
       return Promise.reject(error);
  }
);

export const get = (url,params)=>{
    params = params || {};
    return new Promise((resolve,reject)=>{
        $http.get(url,{
            params,
        }).then(res=>{
             resolve(res.data);
        }).catch(error=>{
            Toast("服务器异常");  
        })
    })
}

export const post = (url,params)=>{
    params = params || {};
    return new Promise((resolve,reject)=>{
        $http.post(url,params).then(res=>{
            resolve(res.data);
        }).catch(error=>{
            Toast("服务器异常");  
        })
    })
}