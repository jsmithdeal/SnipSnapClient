import { Bounce, toast } from "react-toastify";

//Create toast helper. Have to call toast.xxx in some situationsd where callbacks are needed
export function createToast(success: boolean, message?: string){
    if (success){
        toast.success(message, {
            autoClose: 5000,
            theme: "dark",
            transition: Bounce,
        });
    }
    else {
        toast.error(message, {
            autoClose: 5000,
            theme: "dark",
            transition: Bounce,
        });
    }
}