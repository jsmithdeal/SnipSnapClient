import { MdOutlineClose } from "react-icons/md";
import Input from "./Input";

type CollectionModalProps = {
    onCloseClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    onSubmitClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    onDeleteClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    collectionNameKeydown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    collectionName?: string;
    isEdit?: boolean;
}

//Modal specifically for adding/editing collections
export default function CollectionModal(props: CollectionModalProps){
    return (
        <>
            <div className="fixed inset-0 bg-black/80 z-998"></div>

            <div className="grid grid-rows-[auto_auto] fixed left-1/2 transform -translate-x-1/2 top-[20%] z-999 bg-zinc-100 rounded-b-lg rounded-t-lg w-[90%] lg:w-[50%] xl:w-[30%]">
                <div className="grid grid-cols-[auto_1fr] p-5 text-amber-600 bg-zinc-900 rounded-t-lg">
                    <div className="brand-font text-2xl">
                        {props.isEdit ? "Edit Collection" : "Create Collection"}
                    </div>
                    <div onClick={props.onCloseClick} className="text-2xl flex items-center justify-end">
                        <MdOutlineClose className="cursor-pointer" />
                    </div>
                </div>

                <div className="p-5 grid grid-rows-[1fr_auto] md:grid-cols-[1fr_auto_auto]">
                    <div>
                        <Input type="text" placeholder="Collection Name" className="w-full" onChange={props.onNameChange} onKeyDown={props.collectionNameKeydown} value={props.collectionName} />
                    </div>
                    
                    <div className="mt-3 md:mt-0">
                        <Input type='button' value={props.isEdit ? "Save" : "Submit"} onClick={props.onSubmitClick} className='ms-0 md:ms-3 bg-indigo-800 hover:bg-indigo-600 text-white cursor-pointer rounded-md' />
                        {
                            props.isEdit &&
                            <Input type='button' value="Delete" onClick={props.onDeleteClick} className='ms-2 bg-red-800 hover:bg-red-600 text-white cursor-pointer rounded-md' />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}