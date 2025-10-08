type MenuProps = {
    className?: string
}

//Slide down mobile menu component
export default function MobileMenu(props: MenuProps){
    return (
        <div className={props.className}>
            Mobile Menu
        </div>
    )
}