import React, { useState } from "react";
import '../css/form.css'
import { login, register } from "../api/GetAuthAPI";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({
        emailOrUsername: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(form);
        try {
            const response = await login(form);
            console.log(response);
             if(response.status === 200 || response.uid){
                setErrorMsg("")
                localStorage.setItem('token', response.data)
                navigate(`/`)
            }else if(response.data){
                
                const messages = Object.values(response.data);
                setErrorMsg(messages)
            }else{
                setErrorMsg("Login failed!")
            }

        } catch (error) {
            console.error('Error adding :', error);
            setErrorMsg(error?.response?.data?.message || "Login failed");
        }
        finally {
            setForm({
                emailOrUsername: "",
                password: ""
            })
        }
    };

    return (
        <div>
            <h3>Login Page</h3>
            <div id="register">
                <form onSubmit={handleSubmit} className="auth-form">
                  
                     <input
                        name="emailOrUsername"
                        type="text"
                        minLength={3}
                        title="Must have 3 character long"
                        value={form.emailOrUsername}
                        onChange={handleChange}
                        required
                        placeholder="Enter Username "
                    />
                    
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$"
                        title="Password must be at least 8 characters, contain one uppercase letter, and one special symbol"
                        onChange={handleChange}
                        required
                        placeholder="Enter Password Abc@1234"
                    />

                    <button type="submit" >Login</button>

                    {errorMsg && <h4 style={{color: "red"}}>Error  : {errorMsg} </h4> }
                </form>
            </div>
        </div>
    );
}

export default Login;