import { FaUsersSlash } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

type SnipProps = {
    id: number;
    name: string;
    description: string;
    language: string;
    lastModified: Date;
    shared: boolean;
    className?: string;
}

export default function Snip(props: SnipProps){
    const lastModFormatted = props.lastModified.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    return (
        <div className={props.className}>
            <div className="bg-indigo-800 rounded-xl h-full grid grid-rows-[auto_1fr_auto] hover:shadow-lg hover:shadow-zinc-800">
                <div className="text-3xl text-amber-600 p-5 brand-font overflow-hidden whitespace-nowrap text-ellipsis" title={props.name}>
                    {props.name}
                </div>
                <div className="text-white ps-5 pe-5 pb-5 overflow-y-auto break-words">
                    <div>
                        {props.description}
                    </div>
                </div>
                <div className="font-medium brand-font text-zinc-100 p-5 grid grid-rows-[auto-auto] grid-cols-2">
                    <div>
                        <div className="text-2xl text-amber-600" title={props.shared ? "Snip is shared" : "Snip is not shared"}>{props.shared ?  <FaUsers /> : <FaUsersSlash />}</div>
                        <div className="text-xl text-indigo-400" title="Snip language">{props.language}</div>
                    </div>
                    <div className="relative text-lg text-indigo-400">
                        <div className="absolute bottom-0 right-0 row-span-2" title="Last modified">{lastModFormatted}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}