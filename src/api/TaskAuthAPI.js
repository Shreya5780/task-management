import axios from 'axios';
import { getToken } from './GetAuthAPI';

const API_URL = 'http://localhost:8080';
const api = axios.create({
    baseURL: API_URL
});

export const addTask = async () => {

}

export const getAllTask = async () => {
    try {
        const token = getToken()
        console.log(token)
        const response = await api.get('api/tasks', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    }
    catch (error) {
        // handleAuthError(error);
        // console.log(error.response.data)
        // if(error.response.status === 409){
        //     return "Conflict";
        // }
        return error.response;
    }

}