import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Outlet, useLocation} from "react-router-dom"
import { ApiContext } from "../contexts/api";
import { useAuth } from "../hooks/useAuth";

export const Root = () => {
    const {token, setToken} = useAuth();
    const location = useLocation();

    const navigate = useNavigate();
    useEffect(()=> {
        if(!token && location.pathname !== '/login' && location.pathname !== '/signup') {
            console.log(location.pathname);
            navigate("/",{replace:true}); // Prevents us from getting stuck in a loop
        } else if(location.pathname === "/") {
            navigate("/dashboard", {replace:true})
        }
        },[])

    return (
        <>
        <h1>Reptile Tracker</h1>
        {
            location.pathname === "/" && <>
                <p>
                    A web-based application for keeping track of your scaly friends. 
                    You can record your reptile's measurements as well as create schedules specific to each specimen.
                </p>
                <Link to="/login">Log in</Link>
                <Link to="/signup">Sign up</Link>
            </>
        }
        <Outlet />
        </>
    )
}