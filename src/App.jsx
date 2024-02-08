
import './App.css'
import { Herosection } from './pages/Herosection'
import { LoginPage } from './pages/Loginpage'
import { SignupPage } from './pages/Signuppage'
import {Route,Routes} from "react-router-dom";

function App() {
  

  return (
    <>
        <Routes>

          <Route path="/" element={<SignupPage/> } />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/dashboard" element={<Herosection/>}/>

        </Routes>
    </>
  )
}

export default App
