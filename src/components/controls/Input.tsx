type InputProps = {
    placeholder?: string;
    classes?: string;
    value?: string;
    idAndName?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
};

export default function Input(props: InputProps){
    return (
        <input id={props.idAndName} onChange={props.onChange} name={props.idAndName} type={props.type} value={props.value} className={`px-3 py-2 rounded-md ${props?.classes}`} placeholder={props.placeholder}/>
    )
}