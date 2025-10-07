type LinkProps = {
    className?: string;
    text: string;
    href: string;
};

//<a> link component
export default function Link(props: LinkProps){
    return (
        <a href={props.href} className={props.className}>{props.text}</a>
    )
}