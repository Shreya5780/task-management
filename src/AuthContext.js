

// to avoid manual refresh after logout or login to get correct header
import React, { createContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(localStorage.getItem('user'));

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const user = localStorage.getItem('user')
        const logintime = localStorage.getItem('logintime')
        const diff = Date.now() - logintime
        if(storedToken && logintime){

            if(diff > 3600000){
                logout()
                
            }else{
                
                setToken(storedToken);
                setUser(user)
            }
        }else{
            setToken(null)
            setUser(null)
        }
        }, []);

    const login = (newToken, user) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', user);
        
        //auto logout after token expire
        localStorage.setItem('logintime', Date.now())

        setToken(newToken);
    };


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        localStorage.removeItem('logintime')
        setToken(null);
        setUser(null);
        
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


// // to avoid manual refresh after logout or login to get correct header
// import React, { createContext, useState, useEffect } from 'react';
// import {  useCookies } from 'react-cookie';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {

//     const [cookies, setCookie, removeCookie] = useCookies(['token', 'user'])

//     const token = cookies.token || null
//     const user = cookies.user || null

    
//     const login = (newToken, user) => {
//         setCookie('token', newToken, {path: "/", maxAge: 3600})
//         setCookie('user', user, {path: "/", maxAge: 3600})
//     };

//     const logout = () => {
//         removeCookie('token', {path: '/'})
//         removeCookie('user',  {path: '/'})
//     };

//     return (
//         <AuthContext.Provider value={{ token, user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };





