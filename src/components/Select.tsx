type SelectProps = {
    className?: string;
    idAndName?: string;
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
        <select onChange={props.onSelect} size={props.size} id={props.idAndName} multiple={props.multiple} name={props.idAndName} disabled={props.disabled} className={`px-3 py-2 rounded-md ${props?.className}`} required={props.required}>
            {
                props.options.map((option, i) => (
                    <option key={i} value={option.value}>{option.text}</option>
                ))
            }
        </select>
    )
}