import { useEffect, useState } from "react";
import Snip from "../controls/Snip";
import APIService from "../../services/api-service";
import { createToast } from "../../utilities/utilityFunctions";
import type { SnipsRequest } from "../../models/http/RequestModels";

export default function SnipsWrapper(){
    const snipClasses = "h-[18rem] w-full cursor-pointer duration-300 hover:-translate-y-1 hover:scale-102";
    const [snips, setSnips] = useState<SnipsRequest[]>([]);

    useEffect(() => {
        const getSnips = async () => {
            const snipsResponse = await APIService.getSnips();

            if (snipsResponse.success)
                setSnips(snipsResponse.data as SnipsRequest[]);
            else
                createToast(false, "There was an error retrieving snips");
        }

        getSnips();
    }, []);

    return (
        <div className="flex justify-items-center grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {
                snips.map(snip => (
                    <Snip key={snip.snipid} snipid={snip.snipid} snipname={snip.snipname} sniplanguage={snip.sniplanguage} snipdescription={snip.snipdescription} lastmodified={snip.lastmodified} snipshared={snip.snipshared} className={snipClasses} />
                ))
            }
        </div>
    )
}