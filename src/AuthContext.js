

// to avoid manual refresh after logout or login to get correct header
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(localStorage.getItem('user'));

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const user = localStorage.getItem('user')
        setToken(storedToken);
        setUser(user)
    }, []);

    const login = (newToken, user) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', user)
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
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





