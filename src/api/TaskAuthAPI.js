import axios from 'axios';
import { getToken } from './GetAuthAPI';

const API_URL = 'http://localhost:8080';
const api = axios.create({
    baseURL: API_URL
});

export const addTaskApi = async (taskData) => {
      try {
        const response = await api.post('api/tasks', taskData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response;
    } catch (error) {
        // handleAuthError(error);
        return error.response;
    }
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

export const updateTaskApi = async (taskData) => {
      try {
        console.log(taskData)
        const response = await api.put(`api/tasks/${taskData.tid}`, taskData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response;
    } catch (error) {
        // handleAuthError(error);
        return error.response;
    }
}

export const updateTaskStatusApi = async (taskId, status) => {
      try {
        console.log(status)
        const response = await api.patch(`api/tasks/${taskId}/status`, {status: status}, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response;
    } catch (error) {
        // handleAuthError(error);
        return error.response;
    }
}

export const deleteTaskApi = async (taskId) => {
      try {
        console.log("delete taskkkkkkk  ", taskId)
        const response = await api.delete(`api/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response;
    } catch (error) {
        // handleAuthError(error);
        return error.response;
    }
}