import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/layout.css';
import { AuthContext } from './AuthContext';
import { myProfile } from './api/GetAuthAPI';

const Layout = ({ children }) => {
    const navigate = useNavigate();

    const { token, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

     const [profile, setProfile] = useState([]);

     const handleProfile = async (e) => {
            e.preventDefault();
            
            try {
                        const response = await myProfile();
                        console.log(response);
                         if(response.status === 200 || response.uid){
                            setProfile(response.data)
                            const data = response.data
                            // localStorage.setItem('token', response.data)
                            navigate(`/profile`, {state: {data}})
                        }else{
                            setProfile("Please Login again!")
                        }
            
                    } catch (error) {
                        console.error('Error adding :', error);
                        setProfile("Please Login again!")
                    }
                    
        }

    return (
        <div className="layout-container">
            <header id="main-header">
                <nav className="nav-bar">
                    <h1 className="site-title">Task Management</h1>
                    <ul className="nav-links">

                        {token ? (
                            <>
                                <li><Link to="/add/task" className="nav-link">Add Task</Link></li>
                                <li><Link to="/profile" onClick={handleProfile} className="nav-link">Profile</Link></li>
                                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" className="nav-link">Login</Link></li>
                                <li><Link to="/register" className="nav-link">Register</Link></li>
                            </>
                        )}

                    </ul>
                </nav>
            </header>

            <main className="main-content">{children}</main>

            {/* <footer id="main-footer">
                <p>© 2025 Task Management. All rights reserved.</p>
            </footer> */}
        </div>
    )
}

export default Layout