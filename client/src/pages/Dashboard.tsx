import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { Reptiles } from "../components/Reptiles";
import { ScheduleView } from "../components/Schedule";
import { AuthContext } from "../contexts/auth"
import { useAuth } from "../hooks/useAuth"

export const Dashboard = () => {
    const setToken = useContext(AuthContext);
    const navigate = useNavigate();
    return(<>
    <h2>I'm on the Dashboard Page</h2>
    <ScheduleView />
    <Reptiles />
    {/* TODO: Add Create Reptile Page */}
    <button onClick={() =>{
        setToken("");
        navigate('/')
        }}>Log Out</button>
    </>)
}