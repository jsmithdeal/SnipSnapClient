type InputProps = {
    placeholder?: string;
    className?: string;
    value?: string;
    idAndName?: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    type: string;
};

//Input control component
export default function Input(props: InputProps){
    return (
        <input onKeyDown={props.onKeyDown} id={props.idAndName} onChange={props.onChange} onClick={props.onClick} name={props.idAndName} type={props.type} disabled={props.disabled} value={props.value} className={`px-3 py-2 rounded-md ${props?.className}`} placeholder={props.placeholder} required={props.required}/>
    )
}