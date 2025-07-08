import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import Register from './auth/Register';
import Login from './auth/Login';
import Profile from './auth/Profile';
import AddTask from './task/AddTask';
import { getToken } from './api/GetAuthAPI';
import {ProtectedRoute, RefreshHandler } from './ProtectedRoute';
import { useState } from 'react';
import Layout from './Layout';
import TaskDetail from './task/TaskDetail';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  return (
    <div className="App">
      
      <BrowserRouter>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Layout>

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/register' element={<Register />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/add/task" element={<ProtectedRoute element={<AddTask />} />} />
          <Route path="/task/info/:id" element={<ProtectedRoute element={<TaskDetail />} />} />

        </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
