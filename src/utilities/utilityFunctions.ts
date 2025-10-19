import { Bounce, toast } from "react-toastify";

//Create toast helper. Have to call toast.xxx in some situationsd where callbacks are needed
export function createToast(success: boolean, message?: string, time?: number){
    if (success){
        toast.success(message, {
            autoClose: time == undefined ? 5000 : time,
            theme: "dark",
            transition: Bounce,
            pauseOnHover: false
        });
    }
    else {
        toast.error(message, {
            autoClose: time == undefined ? 5000 : time,
            theme: "dark",
            transition: Bounce
        });
    }
}