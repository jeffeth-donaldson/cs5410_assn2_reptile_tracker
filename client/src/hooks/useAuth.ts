import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../contexts/api";
import { AuthContext } from "../contexts/auth";

export const useAuth = () => {

    const auth = useContext(AuthContext);
    const setToken = (token:string) => {
        auth.setToken(token);
        window.localStorage.setItem("token", token)
    }
    
    return {token:auth.token, setToken};
}