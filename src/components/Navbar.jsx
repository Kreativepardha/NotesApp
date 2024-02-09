import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export const Navbar = ()=>{

    const navigate = useNavigate()
    const handleLogout = () =>{

        localStorage.removeItem("token");

        delete axios.defaults.headers.common['Authorization'];
        navigate("/")
    }
    return <div>
        <div className="Nav-field h-19 bg-yellow-400 flex ">
            
                <span className="w-4 text-center p-2 m-2">home</span>
                <span className="w-4 text-center p-2 m-2 ml-9 cursor-pointer text-rose-700">Notes</span>
                <span className="w-4 text-center p-2 m-2 ml-9 cursor-pointer hover:text-pink-500" onClick={handleLogout}>logout</span>
        </div>
    </div>
}
