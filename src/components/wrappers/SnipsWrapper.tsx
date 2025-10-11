import Snip from "../controls/Snip";

export default function SnipsWrapper(){
    return (
        <div className="flex justify-items-center grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            <Snip name="This is a very long title that goes off snip" description="This is a description. A very short description." className="h-[18rem] w-full cursor-pointer duration-300 hover:-translate-y-1 hover:scale-102" language="JavaScript" shared={false} lastModified={new Date(Date.now())} />
            <Snip name="This is a very long title that goes off snip" description="This is a description. A very short description." className="h-[18rem] w-full cursor-pointer duration-300 hover:-translate-y-1 hover:scale-102" language="JavaScript" shared={false} lastModified={new Date(Date.now())} />
            <Snip name="This is a very long title that goes off snip" description="This is a description. A very short description." className="h-[18rem] w-full cursor-pointer duration-300 hover:-translate-y-1 hover:scale-102" language="JavaScript" shared={false} lastModified={new Date(Date.now())} />
            <Snip name="This is a very long title that goes off snip" description="This is a description. A very short description." className="h-[18rem] w-full cursor-pointer duration-300 hover:-translate-y-1 hover:scale-102" language="JavaScript" shared={false} lastModified={new Date(Date.now())} />
            <Snip name="This is a very long title that goes off snip" description="This is a description. A very short description." className="h-[18rem] w-full cursor-pointer duration-300 hover:-translate-y-1 hover:scale-102" language="JavaScript" shared={false} lastModified={new Date(Date.now())} />
            <Snip name="This is a very long title that goes off snip" description="This is a description. A very short description." className="h-[18rem] w-full cursor-pointer duration-300 hover:-translate-y-1 hover:scale-102" language="JavaScript" shared={false} lastModified={new Date(Date.now())} />
        </div>
    )
}