import { useContext, type JSX } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";

//Component that wraps components that require login to access. Ensures users
//is authenticated and sends them to login if not
export default function ProtectedRoute({ children }: { children: JSX.Element }){
    const context = useContext(UserContext);

    if (context == null || !context.authenticated){
        return <Navigate to="/login" replace />
    }
    //todo: check for csfr in cookies whether expired. If found and valid, re-get context info (persist across refreshes)
    
    return children;
}