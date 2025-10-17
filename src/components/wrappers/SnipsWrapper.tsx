import { useEffect, useState } from "react";
import Snip from "../Snip";
import APIService from "../../services/api-service";
import { createToast } from "../../utilities/utilityFunctions";
import type { SnipsResponse } from "../../models/http/ResponseModels";
import { CiFaceFrown } from "react-icons/ci";
import Toolbar from "../Toolbar";
import { useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "../../utilities/configVariables";

export default function SnipsWrapper(){
    const snipClasses = "h-[18rem] w-full cursor-pointer duration-300 hover:-translate-y-1 hover:scale-102";
    const [allSnips, setAllSnips] = useState<SnipsResponse[]>([]);
    const [filteredSnips, setFilteredSnips] = useState<SnipsResponse[]>([]);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getSnips = async () => {
            const snipsResponse = await APIService.getSnips();

            if (snipsResponse.success){
                setAllSnips(snipsResponse.data as SnipsResponse[]);
                setFilteredSnips(snipsResponse.data as SnipsResponse[]);
            }
            else
                createToast(false, "There was an error retrieving snips");
        }

        getSnips();
    }, []);

    function searchBarKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
        if (e.code.toLowerCase().includes("enter"))
            filterResults();
    }

    function filterResults(){
        if (searchText == "")
            setFilteredSnips(allSnips);
        else {
            setFilteredSnips(allSnips.filter((snip) => 
                snip.snipname.toLowerCase().includes(searchText.toLowerCase())
            ));
        }
    }

    return (
        <div>
            <Toolbar addButtonClick={() => navigate(PAGE_ROUTES.userpages.snipdetails)} addButtonTitle="Create new snip" searchBarKeyDown={(e) => searchBarKeyDown(e)} searchBarPlaceholder="Search snips by name" searchBarChange={(e) => setSearchText(e.target.value)} searchBarSearch={filterResults} />
            <div className={`flex justify-items-center grid grid-cols-1 mt-5 ${filteredSnips.length != 0 && "sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"}`}>
                {
                    filteredSnips.length != 0 
                    ? 
                    filteredSnips.map(snip => (
                        <Snip key={snip.snipid} snipid={snip.snipid} snipname={snip.snipname} sniplanguage={snip.sniplanguage} snipdescription={snip.snipdescription} lastmodified={snip.lastmodified} snipshared={snip.snipshared} className={snipClasses} />
                    ))
                    :
                    (
                        <>
                            <CiFaceFrown  className="text-6xl text-zinc-400" />
                            <span className="brand-font text-xl text-zinc-400">Nothing to see here...</span>
                        </>
                    )
                }
            </div>
        </div>
    )
}