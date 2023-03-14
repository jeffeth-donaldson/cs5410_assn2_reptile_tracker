import { Link } from "react-router-dom";
import {Outlet, useLocation} from "react-router-dom"

export const Root = () => {
    const location = useLocation();
    let name = "Home";
    if (location.pathname === "/login") {
        name = "Login";
    } else if (location.pathname == "/signup") {
        name = "Signup";
    }

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