type ContentProps = {
    className?: string
}

//The main content component inside snipsnap
export default function ContentWrapper(props: ContentProps){
    return (
        <div className={props.className}>
            Content
        </div>
    )
}