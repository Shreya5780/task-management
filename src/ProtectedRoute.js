import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { getToken } from "./api/GetAuthAPI"
import { useEffect } from "react";

export const ProtectedRoute =({element}) => {
    if(!getToken()){
        return <Navigate to="/login" />
    }
    return element;
}

export const RefreshHandler = ({ setIsAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/register'
            ) {
                navigate('/home', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])

    return (
        null
    )
}
