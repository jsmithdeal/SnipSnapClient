type SelectProps = {
    className?: string;
    idAndName?: string;
    label?: string;
    labelClassName?: string;
    form?: string;
    required?: boolean;
    disabled?: boolean;
    multiple?: boolean;
    size?: number;
    onSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: HTMLOptionElement[];
};

//Select control component
export default function Select(props: SelectProps){
    return (
        <>
            { 
                props.label && 
                <label className={props.labelClassName} htmlFor={props.idAndName}>{props.label}</label>
            }
            <select form={props.form} onChange={props.onSelect} size={props.size} id={props.idAndName} multiple={props.multiple} name={props.idAndName} disabled={props.disabled} className={`px-3 py-2 rounded-md border-2 border-zinc-300 bg-white ${props?.className}`} required={props.required}>
                {
                    props.options.map((option, i) => (
                        <option key={i} value={option.value}>{option.text}</option>
                    ))
                }
            </select>
        </>
    )
}