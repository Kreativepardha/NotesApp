import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'




export const SignupPage = () => {
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate()

const handleSignup = async(e) =>{
    e.preventDefault();
    try{
        const response = await axios.post("https://notesapp-gts2.onrender.com/api/user/signup",{
            username,
            email,
            password
        });
        localStorage.setItem("token",response.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        navigate("/login")
        console.log(response.data.token)

    }catch(error){
        if(error.response && error.response.status ===409) setError("User already existss, please choose a different email")

 console.error(error);
    }

    }  


    return (
        <div className="flex justify-center items-center signbody flex-col h-screen">
            <div className="signhead">
                <h2>Sign Up</h2>
                <form id="signupForm">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="s username" name="username" value={username} required onChange={(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="s email"  name="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="s password" name="password" value={password} required onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" onClick={handleSignup}>Sign Up</button>
                    <div className="cursor-pointer tag" onClick={()=>{
                        navigate("/login")
                    }} >Already have an acc?</div>
                </form>
            </div>
        </div>
    );
};
