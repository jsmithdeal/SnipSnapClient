import { Outlet } from "react-router-dom"

type ContentProps = {
    className?: string
}

//The main content component inside snipsnap
export default function ContentWrapper(props: ContentProps){
    return (
        <div className={props.className}>
            <Outlet />
        </div>
    )
}