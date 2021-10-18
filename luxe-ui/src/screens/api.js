import axios from "axios";

export const API_URL = '${process.env.REACT_APP_API_ROOT}'

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json"
    }
});

 export default class ApiService{
     static saveStripeInfo(data={}){
         return api.post(`${API_URL}/v1/payments/save-stripe-info/`, data)
     }
 }