import type { IconType } from "react-icons";
import { Link } from "react-router-dom";

type MenuItemProps = {
    outterWrapperClassName?: string;
    linkWrapperClassName?: string;
    linkTo: string;
    linkText: string;
    iconWrapperClassName?: string;
    iconClassName?: string;
    linkClassName?: string;
    icon?: IconType;
}

//Menu items for mobile and desktop menus
export default function MenuItem(props: MenuItemProps){
    return (
        <div className={props.outterWrapperClassName}>
            <div className={props.iconWrapperClassName}>
                {props.icon && <props.icon />}
            </div>
            <div className={props.linkWrapperClassName}>
                <Link to={props.linkTo} className={props.linkClassName}>{props.linkText}</Link>
            </div>
        </div>
    )
}