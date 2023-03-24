import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { useApi } from "../hooks/useApi";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const api = useApi();
    const navigate = useNavigate();
    const setToken = useContext(AuthContext)
    const signup = async () => {
        const resultBody = await api.post('/users', {email,password,firstName,lastName})
        if (resultBody.error) {
            console.log(resultBody.error)
        }
        if (resultBody.token) {
            setToken(resultBody.token)
            navigate("/dashboard", {replace: true})
        }
    }
    return (
        <>
        <h2>Sign up</h2>
        <form className="signup">
            <label>Email:<input type={"email"} value={email} onChange={e => setEmail(e.target.value)} /></label>
            <label>Password: <input type={"password"} value={password} onChange={e => setPassword(e.target.value)} /></label>
            <label>First Name: <input type={"text"} value={firstName} onChange={e => setFirstName(e.target.value)} /></label>
            <label>Last Name: <input type={"text"} value={lastName} onChange={e => setLastName(e.target.value)} /></label>
        </form>
        <button onClick={signup}>Sign up</button>
        <div>Already have an Account? <Link to={'/login'}>Log in</Link></div>
        </>
    )

}