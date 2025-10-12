import { TbLogout } from "react-icons/tb";
import APIService from "../../services/api-service";
import { useNavigate } from "react-router-dom";
import { createToast } from "../../utilities/utilityFunctions";
import { PAGE_ROUTES } from "../../utilities/configVariables";
import { useContext } from "react";
import { SnipSnapContext } from "../../contexts/SnipSnapContext";

export default function Logout(){
    const navigate = useNavigate();
    const context = useContext(SnipSnapContext);

    //On logout call api logout and set context authenticated false. Api takes
    //care of expiring jwt and csfr cookies
    async function logoutClick(){
        const logoutResponse = await APIService.logout();

        if (logoutResponse.success){
            context.setAuthenticated(false);
            navigate(PAGE_ROUTES.accesspages.login, {replace: true})
        }
        else
            createToast(false, "There was a problem logging out.")
    }

    return (
        <div className="cursor-pointer duration-300 hover:-translate-y-1 hover:scale-105" onClick={() => logoutClick()}>
            <div className="flex justify-center items-center">
                <TbLogout title="Logout" className="text-3xl" />
            </div>
            <span className="hidden lg:flex">Logout</span>
        </div>
    )
}