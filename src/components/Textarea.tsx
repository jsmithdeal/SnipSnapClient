type TextareaProps = {
    placeholder?: string;
    className?: string;
    value?: string;
    idAndName?: string;
    label?: string;
    labelClassName?: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

//Textarea control component
export default function Textarea(props: TextareaProps){
    return (
        <>
            { 
                props.label && 
                <label className={props.labelClassName} htmlFor={props.idAndName}>{props.label}</label>
            }
            <textarea onKeyDown={props.onKeyDown} id={props.idAndName} onChange={props.onChange} name={props.idAndName} disabled={props.disabled} value={props.value} className={`px-3 py-2 rounded-md border-2 border-zinc-300 bg-white ${props?.className}`} placeholder={props.placeholder} required={props.required}></textarea>
        </>
    )
}