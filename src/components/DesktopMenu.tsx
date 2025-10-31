import { RiScissorsCutLine } from "react-icons/ri";
import { RiUserSettingsLine } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
import MenuItem from "./MenuItem";
import { PAGE_ROUTES } from "../utilities/configVariables";

type MenuProps = {
    className?: string
    onClick?:  (e: React.MouseEvent<HTMLInputElement>) => void;
}

//The desktop side menu component
export default function DesktopMenu(props: MenuProps){
    return (
        <div className={props.className} onClick={props.onClick}>
            <MenuItem icon={RiScissorsCutLine} iconWrapperClassName="inline-flex items-center pe-1" linkTo={PAGE_ROUTES.userpages.snips} linkText="Snips" 
                linkWrapperClassName="inline-flex" outterWrapperClassName="text-zinc-900 brand-font flex items-center text-xl duration-300 hover:-translate-y-1 hover:scale-105 pe-7" />

            <MenuItem icon={FiUserPlus} iconWrapperClassName="inline-flex items-center pe-1" linkTo={PAGE_ROUTES.userpages.sharedwithme} linkText="Shared With Me" 
                linkWrapperClassName="inline-flex" outterWrapperClassName="text-zinc-900 brand-font flex items-center text-xl duration-300 hover:-translate-y-1 hover:scale-105 pe-7" />
            
            <MenuItem icon={RiUserSettingsLine} iconWrapperClassName="inline-flex items-center pe-1" linkTo={PAGE_ROUTES.userpages.settings} linkText="Settings" 
                linkWrapperClassName="inline-flex" outterWrapperClassName="text-zinc-900 brand-font flex items-center text-xl duration-300 hover:-translate-y-1 hover:scale-105" />
        </div>
    )
}