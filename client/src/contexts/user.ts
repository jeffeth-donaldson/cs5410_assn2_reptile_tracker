import { User } from "@prisma/client";
import {createContext} from "react";


export const UserContext = createContext<User>(
    {
        id:-1, 
        firstName:"",
        lastName:"",
        email:"",
        passwordHash:"",
        createdAt:new Date(),
        updatedAt:new Date(),
    }
        )
    ;
