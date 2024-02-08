import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const LoginPage = () => {
    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

const handleLogin = async(e)=>{
    e.preventDefault();
try{
        const response = await axios.post("http://localhost:4000/api/user/login",{
            email,
            password
        });
        const token = response.data.token;

        localStorage.setItem("token",token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const userId= response.data.userId;
        
        navigate("/dashboard")
        console.log(token)
    }catch(error){
        if(error.response && error.response.status === 401 ) setError("Invalid email or password")
        console.error(error)
        }

    
}

    return (
        <div   className='bg-cyan-900 h-screen w-screen flex justify-center items-center' >

        <div className="wrapper">
            <form action="">
                <h1>Login</h1>
                <div className="input-box">


                    <input type="text" placeholder="Username" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <i className='bx bxs-user-circle'></i>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <a href="#">Forgot password?</a>
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                <button type="submit" className="btn" 
                    onClick={handleLogin}
                >Login</button>
                <div className="register-link">

                <div className="cursor-pointer" onClick={()=>{
                        navigate("/")
                    }} >Don't have an account? Signup </div>
                  
                </div>
            </form>
        </div>
        </div>
    );
};
