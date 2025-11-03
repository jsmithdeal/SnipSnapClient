import { RiScissorsCutLine } from "react-icons/ri";
import { RiUserSettingsLine } from "react-icons/ri";
import MenuItem from "./MenuItem";
import { PAGE_ROUTES } from "../utilities/configVariables";
import { FiUserPlus } from "react-icons/fi";
import { TbFolderCode } from "react-icons/tb";

type MenuProps = {
    className?: string
    onClick?:  (e: React.MouseEvent<HTMLInputElement>) => void;
}

//Slide down mobile menu component
export default function MobileMenu(props: MenuProps){
    return (
        <div className={props.className}>
            <MenuItem icon={RiScissorsCutLine} iconWrapperClassName="inline-flex items-center pe-1" linkTo={PAGE_ROUTES.userpages.snips} linkText="Snips" 
                            linkWrapperClassName="inline-flex" outterWrapperClassName="text-amber-600 brand-font flex items-center text-3xl duration-300 hover:-translate-y-1 hover:scale-105 pe-5" />
                        
            <MenuItem icon={FiUserPlus} iconWrapperClassName="inline-flex items-center pe-1" linkTo={PAGE_ROUTES.userpages.sharedwithme} linkText="Shared With Me" 
                            linkWrapperClassName="inline-flex" outterWrapperClassName="mt-8 text-amber-600 brand-font flex items-center text-3xl duration-300 hover:-translate-y-1 hover:scale-105 pe-5" />

            <MenuItem icon={TbFolderCode} iconWrapperClassName="inline-flex items-center pe-1" linkTo={PAGE_ROUTES.userpages.collections} linkText="Collections" 
                            linkWrapperClassName="inline-flex" outterWrapperClassName="mt-8 text-amber-600 brand-font flex items-center text-3xl duration-300 hover:-translate-y-1 hover:scale-105 pe-5" />
            
            <MenuItem icon={RiUserSettingsLine} iconWrapperClassName="inline-flex items-center pe-1" linkTo={PAGE_ROUTES.userpages.settings} linkText="Settings" 
                linkWrapperClassName="inline-flex" outterWrapperClassName="mt-8 text-amber-600 brand-font flex items-center text-3xl duration-300 hover:-translate-y-1 hover:scale-105" />
        </div>
    )
}