import axios from 'axios';

const API_URL = 'http://localhost:8080';
const api = axios.create({
    baseURL: API_URL
});

export const getToken = () => localStorage.getItem('token');
export const getUserId = () => localStorage.getItem('user')

export const register = async (user) => {
    try {
        const response = await api.post('api/auth/register', user);
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
};

export const loginApi = async (user) => {
    try {
        const response = await api.post('api/auth/login', user);
        return response;
    } catch (error) {
        // handleAuthError(error);
        return error.response;
    }
};

export const myProfile = async () => {
    try {
        const response = await api.get(`api/users/me?userId=${getUserId()}`, {
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

export const updateMyProfile = async (user) => {
    try {
        const token = getToken();
        console.log("tokennnn", token)
        console.log("tokennnn", user)
        console.log("tokennnn", getUserId())
        const response = await axios.put(`http://localhost:8080/api/users/me?userId=${getUserId()}`, {
            username: user.username,
            email: user.email,
            password: user.password
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response)
        return response;
    } catch (error) {
        // handleAuthError(error);
        return error.response;
    }
}

export const getAllUser = async () => {
    try {
        const response = await api.get('api/users/all', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        // handleAuthError(error);
        return [];
    }
}