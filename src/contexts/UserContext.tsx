import { createContext, useState, type ReactNode } from "react"
import type { UserResponse } from "../models/http/ResponseModels"

//The type to be stored in user context
type UserContextType = {
    user: UserResponse;
    authenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<UserResponse>>;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

//Create the context
export const UserContext = createContext<UserContextType | null>(null);

//Creates a react context provider used to store user data
export default function UserContextProvider({ children }: { children: ReactNode }){
    //State setters are created for updating context
    const [user, setUser] = useState<UserResponse>(
        { 
            userid: 0, 
            email: "", 
            firstname: "", 
            lastname: ""
        }
    );
    const [authenticated, setAuthenticated] = useState(false);

    //Context object created with current values and state functions for updating them
    const userContextValue: UserContextType = {
        user,
        authenticated,
        setUser,
        setAuthenticated
    };

    return (
        //Pass the contextvalue to the provider
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    )
}