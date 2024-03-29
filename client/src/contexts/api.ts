import { User } from "@prisma/client";
import {createContext} from "react";

type Method = "get" | "post" | "put" | "delete";
export class Api {
    public setToken:React.Dispatch<React.SetStateAction<string>>;
    public constructor (setToken:React.Dispatch<React.SetStateAction<string>>) {
        this.setToken = setToken
    }
    private makeRequest = async (url: string, method: Method, body: Record<string, any> = {}) => {
        const options: RequestInit= {
            method,
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`
            }
        }
        if (method === 'post' || method === 'put') {
            options.body = JSON.stringify(body);
        }
        const result = await fetch(import.meta.env.VITE_SERVER_URL+url, options)
        if (result.status === 401) {
            this.setToken("")
            window.localStorage.removeItem("token")         
        }
        return result.json();
    }

    get(url:string) {
        return this.makeRequest(url, 'get');
    }
    post(url:string, body: Record<string,any>) {
        return this.makeRequest(url, 'post', body);
    }
    put(url:string, body: Record<string,any>) {
        return this.makeRequest(url, 'put', body);
    }
    del(url: string) {
        return this.makeRequest(url, 'delete');
    }
}
// type ApiContext = {api: Api, user?:User, setUser:Function}
export const ApiContext = createContext<Api>(new Api(() => {}));
