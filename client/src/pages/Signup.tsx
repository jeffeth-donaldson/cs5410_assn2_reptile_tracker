import { useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const api = useApi();
    return (
        <>
        <h2>Sign up</h2>
        <div className="form">
            <label>Email:<input type={"email"} value={email} onChange={e => setEmail(e.target.value)} /></label>
            <label>Password: <input type={"password"} value={password} onChange={e => setPassword(e.target.value)} /></label>
            <label>First Name: <input type={"text"} value={firstName} onChange={e => setFirstName(e.target.value)} /></label>
            <label>Last Name: <input type={"text"} value={lastName} onChange={e => setLastName(e.target.value)} /></label>
        </div>
        <button onClick={() => api.post('/users', {email,password,firstName,lastName})}>Sign up</button>
        <div>Already have an Account?<Link to={'/login'}>Log in</Link></div>
        </>
    )
}