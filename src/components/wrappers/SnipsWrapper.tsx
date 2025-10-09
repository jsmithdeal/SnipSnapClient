import Snip from "../controls/Snip";

export default function SnipsWrapper(){
    return (
        <div className="flex justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <Snip />
            <Snip />
        </div>
    )
}