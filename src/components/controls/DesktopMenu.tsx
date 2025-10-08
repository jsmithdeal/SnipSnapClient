type MenuProps = {
    className?: string
    onClick?:  (e: React.MouseEvent<HTMLInputElement>) => void;
}

//The desktop side menu component
export default function DesktopMenu(props: MenuProps){
    return (
        <div className={props.className} onClick={props.onClick}>
            asdf<br/>
                                    asdf<br/>
                                    asdf<br/>
                                    asdf<br/>
                                    asdf<br/>
                                    asdf<br/>
                                    asdf<br/>
                                    asdf<br/>
                                    asdf<br/>
        </div>
    )
}