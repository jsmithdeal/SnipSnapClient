import { RiScissorsCutLine } from "react-icons/ri";
import MenuItem from "./MenuItem";

type MenuProps = {
    className?: string
    onClick?:  (e: React.MouseEvent<HTMLInputElement>) => void;
}

//The desktop side menu component
export default function DesktopMenu(props: MenuProps){
    return (
        <div className={props.className} onClick={props.onClick}>
            <MenuItem icon={RiScissorsCutLine} iconWrapperClassName="inline-flex items-center pe-1" linkTo="/userpages/snips" linkText="Snips" 
                linkWrapperClassName="inline-flex" outterWrapperClassName="text-white flex items-center text-xl duration-300 hover:-translate-y-1 hover:scale-110" />
        </div>
    )
}