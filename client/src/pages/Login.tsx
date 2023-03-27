import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const api = useApi();
    const {token, setToken} = useAuth();
    const navigate = useNavigate();

    useEffect(()=> {
        if(token !== "") {
            navigate(-1) // We don't need to log in again
        }
        },[]);

    const Login = async () => {
        const resultBody = await api.post('/token', {email,password})
        if (resultBody.error) {
            console.log(resultBody.error)
        }
        if (resultBody.token) {
            setToken(resultBody.token)
            navigate("/dashboard", {replace: true})
            setError("");
        } else {
            setError(resultBody.message);
        }
    }
    return (
        <>
        <h2>Log In</h2>
        <div>
            <label>Email:<input type={"email"} value={email} onChange={e => setEmail(e.target.value)} /></label>
            <label>Password: <input type={"password"} value={password} onChange={e => setPassword(e.target.value)} /></label>
        </div>
        <div className="error">{error}</div>
        <button onClick={Login}>Log in</button>
        <div>Need an Account? <Link to="/signup">Sign up.</Link></div>
        </>
    )

}