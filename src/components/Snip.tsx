import { FaUsersSlash } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";

type SnipProps = {
    snipid: number;
    snipname: string;
    sniplanguage: string;
    snipdescription: string;
    lastmodified: string;
    snipshared: boolean;
    onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    className?: string;
    fromSharedWithMe?: boolean;
}

export default function Snip(props: SnipProps){
    //Formatted version of date to display
    const modDate = new Date(props.lastmodified).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    return (
        <div className={props.className} onClick={props.onClick}>
            <div className="bg-indigo-800 rounded-xl h-full grid grid-rows-[auto_1fr_auto] hover:shadow-lg hover:shadow-zinc-800">
                <div className="text-3xl text-amber-600 p-5 brand-font overflow-hidden whitespace-nowrap text-ellipsis" title="Snip name">
                    {props.snipname}
                </div>
                <div className="text-white ps-5 pe-5 pb-5 overflow-y-auto break-words">
                    <div>
                        {props.snipdescription}
                    </div>
                </div>
                <div className="font-medium brand-font text-zinc-100 p-5 grid grid-rows-[auto-auto] grid-cols-2">
                    <div>
                        {
                            !props.fromSharedWithMe && 
                            <div className={`text-2xl ${props.snipshared ? "text-amber-600" : "text-zinc-400"}`} title={props.snipshared ? "Snip is shared" : "Snip is not shared"}>{props.snipshared ?  <FaUsers /> : <FaUsersSlash />}</div>
                        }
                        {
                            props.fromSharedWithMe && 
                            <div className="text-2xl mb-1" title={"Snip shared with me"}>{<FiUserPlus/>}</div>
                        }
                        <div className="text-xl text-indigo-400" title="Snip language">{props.sniplanguage}</div>
                    </div>
                    <div className="relative text-lg text-indigo-400">
                        <div className="absolute bottom-0 right-0 row-span-2" title="Last modified">{modDate}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}