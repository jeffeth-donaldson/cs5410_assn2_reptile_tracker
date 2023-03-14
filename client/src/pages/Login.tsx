import { useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const api = useApi();
    return (
        <>
        <h2>Log In</h2>
        <div>
            <label>Email:<input type={"email"} value={email} onChange={e => setEmail(e.target.value)} /></label>
            <label>Password: <input type={"password"} value={password} onChange={e => setPassword(e.target.value)} /></label>
        </div>
        <button onClick={() => api.post('/token', {email,password})}>Log in</button>
        <div>Need an Account? <Link to="/signup">Sign up.</Link></div>
        </>
    )
}