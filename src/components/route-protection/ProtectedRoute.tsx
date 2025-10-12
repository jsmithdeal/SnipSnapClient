import { useContext, useEffect, type JSX } from "react";
import { SnipSnapContext } from "../../contexts/SnipSnapContext";
import { useNavigate } from "react-router-dom";
import APIService from "../../services/api-service";
import { PAGE_ROUTES } from "../../utilities/configVariables";

//Component that wraps components that require login to access. Ensures users
//is authenticated and sends them to login if not
export default function ProtectedRoute({ children }: { children: JSX.Element }){
    const context = useContext(SnipSnapContext);
    const navigate = useNavigate();

    //Async calls must be in useEffect within components
     useEffect(() => {
        const checkAuth = async () => {
            const authResponse = await APIService.checkAuth();

            if (!authResponse.success)
                navigate(PAGE_ROUTES.accesspages.login, { replace: true })
            else
                context.setAuthenticated(true);
        };

        if (!context.authenticated)
            checkAuth();
    }, [])

    return children;
}