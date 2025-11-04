import { useEffect, useState } from "react";
import Snip from "../Snip";
import APIService from "../../services/api-service";
import { createToast } from "../../utilities/utilityFunctions";
import type { SnipsResponse } from "../../models/http/ResponseModels";
import { CiFaceFrown } from "react-icons/ci";
import Toolbar from "../Toolbar";
import { generatePath, useLocation, useNavigate, useParams } from "react-router-dom";
import { PAGE_ROUTES, SNIP_LANGUAGES } from "../../utilities/configVariables";

//Props indicate how to load snips (varies based on what snips are being viewed)
type SnipsWrapperProps = {
    fromSharedWithMe?: boolean;
}

export default function SnipsWrapper(props: SnipsWrapperProps){
    const [allSnips, setAllSnips] = useState<SnipsResponse[]>([]);
    const [filteredSnips, setFilteredSnips] = useState<SnipsResponse[]>([]);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { collnameparam } = useParams();
    const { collidparam } = useParams();

    useEffect(() => {
        //Get the snips to display and set them in state
        const getSnips = async () => {
            let snipsResponse;

            if (props.fromSharedWithMe)
                snipsResponse = await APIService.getSharedWithMe();
            else if (collidparam)
                snipsResponse = await APIService.getCollectionSnips(parseInt(collidparam));
            else
                snipsResponse = await APIService.getSnips();

            if (snipsResponse.success){
                setAllSnips(snipsResponse.data as SnipsResponse[]);
                setFilteredSnips(snipsResponse.data as SnipsResponse[]);
            }
            else
                createToast(false, "Get snips failed");
        }

        getSnips();
    }, [location.pathname]);

    //Simulate search button click on enter key press
    function searchBarKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
        if (e.code.toLowerCase().includes("enter"))
            filterResults();
    }

    //Filter the list of snips being displayed
    function filterResults(){
        if (searchText == "")
            setFilteredSnips(allSnips);
        else {
            setFilteredSnips(allSnips.filter((snip) => 
                snip.snipname.toLowerCase().includes(searchText.toLowerCase())
            ));
        }
    }

    //Translate language name from the language key (stored in DB) to the formatted value
    function getLangText(key: string){
        return SNIP_LANGUAGES[key as keyof typeof SNIP_LANGUAGES];
    }

    //Get path display text
    function getPathText(){
        if (props.fromSharedWithMe)
            return "/Snips Shared With Me";
        else if (collnameparam)
            return "/Collections/" + collnameparam;
        else
            return "/All Snips";
    }

    return (
        <>
            <Toolbar location={getPathText()} showAddButton={!props.fromSharedWithMe && true} addButtonClick={() => navigate(PAGE_ROUTES.userpages.createsnip)} 
                addButtonTitle="Create new snip" searchBarKeyDown={(e) => searchBarKeyDown(e)} searchBarPlaceholder="Search snips by name" searchBarChange={(e) => setSearchText(e.target.value)} searchBarSearch={filterResults} />
            <div className={`flex justify-items-center grid grid-cols-1 mt-5 ${filteredSnips.length != 0 && "sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"}`}>
                {
                    filteredSnips.length != 0 
                    ? 
                    filteredSnips.map(snip => (
                        <Snip fromSharedWithMe={props.fromSharedWithMe} key={snip.snipid} onClick={
                            () => {
                                if (props.fromSharedWithMe)
                                    navigate(generatePath(PAGE_ROUTES.userpages.shareddetails, {snipidparam: snip.snipid}))
                                else
                                    navigate(generatePath(PAGE_ROUTES.userpages.editsnip, {snipidparam: snip.snipid}))
                            }
                        } snipid={snip.snipid} snipname={snip.snipname} sniplanguage={getLangText(snip.sniplanguage)} snipdescription={snip.snipdescription} lastmodified={snip.lastmodified} 
                        snipshared={snip.snipshared} className="h-[18rem] w-full cursor-pointer duration-300 hover:-translate-y-1 hover:scale-102" />
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
        </>
    )
}