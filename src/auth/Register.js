import React, { useState } from "react";
import '../css/form.css'
import { register } from "../api/GetAuthAPI";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {toast} from 'react-toastify'


function Register() {
    const [form, setForm] = useState({
        email: "",
        username: "",
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

    const [showPopup, setShowPopup] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await register(form);
            console.log(response);
            if (response.status === 200 || response.uid) {
                setErrorMsg("")
                setShowPopup(true)

                setTimeout(() => {
                    setShowPopup(false)
                    navigate(`/login`)
                }, 1000)
                

            } else if (response.data) {

                const messages = Object.values(response.data);
                setErrorMsg(messages)
            } else {
                setErrorMsg("Register failed!")
            }



        } catch (error) {
            setErrorMsg(error?.response?.data?.message || "Registration failed");
        }
        finally {
            setForm({
                email: "",
                username: "",
                password: ""
            })
        }
    };



    return (
        <div>
            <h3>Register Page</h3>
            <div id="register">
                <form onSubmit={handleSubmit} className="auth-form" >
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter Email "
                    />
                    <input
                        name="username"
                        type="text"
                        minLength={3}
                        title="Must have 3 character long"
                        value={form.username}
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

                    <button type="submit" >Register</button>

                    {errorMsg && <h4 style={{ color: "red" }}>{errorMsg} </h4>}

                </form>

                {showPopup && (
                    <Popup open={true} closeOnDocumentClick={false}>
                        <div style={{ padding: "20px", textAlign: "center" }}>
                            <h4>Registration Successful!</h4>
                            <p>Redirecting to login...</p>
                            <div className="spinner"></div>

                        </div>
                    </Popup>
                )}
            </div>
        </div>
    );
}

export default Register;