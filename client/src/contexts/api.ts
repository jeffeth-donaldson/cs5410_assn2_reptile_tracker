import {createContext} from "react";

type Method = "get" | "post" | "put" | "delete";
export class Api {
    public token:string = "";
    private makeRequest = async (url: string, method: Method, body: Record<string, any> = {}) => {
        const options: RequestInit= {
            method,
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        }
        if (method === 'post' || method === 'put') {
            options.body = JSON.stringify(body);
        }
        const result = await fetch(url, options)
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
export const ApiContext = createContext<Api>(new Api());
