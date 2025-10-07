type MenuProps = {
    className?: string
}

//The desktop side menu component
export default function DesktopMenu(props: MenuProps){
    return (
        <div className={props.className}>
            Desktop Menu
        </div>
    )
}