import { TbFolderCode } from "react-icons/tb";

type CollectionProps = {
    collectionname: string;
    onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    onContextMenu: (e: React.MouseEvent<HTMLInputElement>) => void;
    className?: string;
}

//Collection list item
export default function Collection(props: CollectionProps){
    return(
        <div onClick={props.onClick} onContextMenu={props.onContextMenu} className={props.className}>
            <div className="h-[8rem]">
                <TbFolderCode  className="h-full w-full text-zinc-900" fill="oklch(66.6% 0.179 58.318)" />
            </div>
            
            <div className="break-all brand-font text-2xl text-zinc-900">
                {props.collectionname}
            </div>
        </div>
    )
}