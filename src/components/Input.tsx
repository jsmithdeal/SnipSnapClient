type InputProps = {
    placeholder?: string;
    className?: string;
    value?: string;
    idAndName?: string;
    label?: string;
    labelClassName?: string;
    form?: string;
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
        <>
            { 
                props.label && 
                <label className={props.labelClassName} htmlFor={props.idAndName}>{props.label}</label>
            }
            <input form={props.form} onKeyDown={props.onKeyDown} id={props.idAndName} onChange={props.onChange} onClick={props.onClick} name={props.idAndName} type={props.type} disabled={props.disabled} value={props.value} className={`px-3 py-2 rounded-md ${(props.type != "button" && props.type != "submit") && "border-2 border-zinc-300 bg-white"} ${props?.className}`} placeholder={props.placeholder} required={props.required}/>
        </>
    )
}