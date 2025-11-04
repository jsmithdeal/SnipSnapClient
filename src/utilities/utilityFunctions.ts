import { Bounce, toast } from "react-toastify";

//Create toast helper. Have to call toast.xxx in some situationsd where callbacks are needed
export function createToast(success: boolean, message?: string, time?: number){
    if (success){
        toast.success(message, {
            autoClose: time ? time : 2500,
            theme: "dark",
            transition: Bounce,
            pauseOnHover: false
        });
    }
    else {
        toast.error(message, {
            autoClose: time ? time : 2500,
            theme: "dark",
            transition: Bounce
        });
    }
}