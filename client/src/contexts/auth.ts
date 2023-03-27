import { User } from "@prisma/client";
import {createContext} from "react";

type Auth = {
    setToken: (token:string)=>void,
    token: string
}
export const AuthContext = createContext<Auth>({setToken:(token) =>{},token:"token"})
