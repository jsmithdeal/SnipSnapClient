import { MdLibraryAdd } from "react-icons/md";
import Input from "./Input";
import { FaSearch } from "react-icons/fa";

type ToolbarProps = {
    searchBarPlaceholder?: string;
    addButtonTitle?: string;
    addButtonClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    searchBarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchBarKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    searchBarSearch: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function Toolbar(props: ToolbarProps){
    return (
        <div className="grid grid-rows-1 grid-cols-[1fr_auto_auto] gap-3">
            <div>
                <Input onKeyDown={props.searchBarKeyDown} onChange={props.searchBarChange} type="text" className="w-full" placeholder={props.searchBarPlaceholder} />
            </div>
            <div onClick={props.searchBarSearch} className="flex justify-center items-center text-2xl text-indigo-800" title="Search">
                <FaSearch className="cursor-pointer duration-300 hover:-translate-y-1 hover:scale-105"  />
            </div>
            <div className="flex items-center justify-center text-3xl text-amber-600 cursor-pointer" onClick={props.addButtonClick} >
                <MdLibraryAdd title={props.addButtonTitle} className="duration-300 hover:-translate-y-1 hover:scale-105" />
            </div>
        </div>
    )
}