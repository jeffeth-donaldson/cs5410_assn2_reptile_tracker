import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../contexts/api";

export const useAuth = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token") || "");


    useEffect(() => {
        window.localStorage.setItem("token", token);
    },[token]);
    
    return {token, setToken};
}