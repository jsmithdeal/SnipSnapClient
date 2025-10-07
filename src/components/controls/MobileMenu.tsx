import Link from "./Link"

type MenuProps = {
    className?: string
}

//Slide down mobile menu component
export default function MobileMenu(props: MenuProps){
    return (
        <div className={props.className}>
            <Link href="" className="text-amber-600 text-2xl mt-10" text="Snips" />
        </div>
    )
}