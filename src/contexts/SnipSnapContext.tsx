import { createContext, useState, type ReactNode } from "react"

//The type to be stored in context
type SnipSnapContextType = {
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

//Default type
const defaultType: SnipSnapContextType = {
    authenticated: false,
    setAuthenticated: () => {}
}

//Create the context
export const SnipSnapContext = createContext<SnipSnapContextType>(defaultType);

//Creates a react context provider used to store data
export default function SnipSnapContextProvider({ children }: { children: ReactNode }){
    //State setters are created for updating context
    const [authenticated, setAuthenticated] = useState(false);

    //Context object created with current values and state functions for updating them
    const snipsnapContextValue: SnipSnapContextType = {
        authenticated,
        setAuthenticated
    };

    return (
        //Pass the contextvalue to the provider
        <SnipSnapContext.Provider value={snipsnapContextValue}>
            {children}
        </SnipSnapContext.Provider>
    )
}