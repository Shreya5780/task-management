import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Register from './auth/Register';
import Login from './auth/Login';
import Profile from './auth/Profile';
import AddTask from './task/AddTask';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/register' element={<Register />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/profile' element={<Profile />} ></Route>
          <Route path='/add/task' element={<AddTask />} ></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
