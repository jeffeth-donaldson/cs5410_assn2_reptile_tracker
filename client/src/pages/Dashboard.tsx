import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { Reptiles } from "../components/Reptiles";
import { ScheduleView } from "../components/Schedule";
import { AuthContext } from "../contexts/auth"
import { useAuth } from "../hooks/useAuth"
import '../App.css'

export const Dashboard = () => {
    const {token, setToken} = useAuth();
    const navigate = useNavigate();
    return(
    <div className="signupPage">
    <h2 className="filledBox">Dashboard</h2>
    <ScheduleView />
    <Reptiles />
    <div><button onClick={() => {navigate('/createreptile')}}>New Reptile</button></div>
    <button onClick={() =>{
        setToken("");
        navigate('/')
        }}>Log Out</button>
    </div>)
}