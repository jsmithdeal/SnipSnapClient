import { useEffect, useState } from "react";
import Toolbar from "../Toolbar";
import type { CollectionResponse } from "../../models/http/ResponseModels";
import { CiFaceFrown } from "react-icons/ci";
import Collection from "../Collection";
import CollectionModal from "../CollectionModal";
import { createToast } from "../../utilities/utilityFunctions";
import APIService from "../../services/api-service";
import { generatePath, useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "../../utilities/configVariables";
import type { UpdateCollectionRequest } from "../../models/http/RequestModels";

//Component providing list of all collections associated with a user
export default function CollectionsWrapper(){
    let pressTimer: number;
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [editCollId, setEditCollId] = useState(0);
    const [editCollName, setEditCollName] = useState("");
    const [newCollName, setNewCollName] = useState("");
    const [allColls, setAllColls] = useState<CollectionResponse[]>([]);
    const [filteredColls, setFilteredColls] = useState<CollectionResponse[]>([]);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        //Get list of collections on load
        const getCollections = async () => {
            const collectionsResponse = await APIService.getCollections();

            if (collectionsResponse.success){
                const collections = collectionsResponse.data as CollectionResponse[];
                setAllColls(collections);
                setFilteredColls(collections);
            }
            else
                createToast(false, collectionsResponse.message);
        }

        getCollections();
    }, [])
    
    //Simulate search button click on enter key press
    function searchBarKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
        if (e.code.toLowerCase().includes("enter"))
            filterResults();
    }

    //Filter the list of snips being displayed
    function filterResults(){
        if (searchText == "")
            setFilteredColls(allColls);
        else {
            setFilteredColls(allColls.filter((c) => 
                c.collectionname.toLowerCase().includes(searchText.toLowerCase())
            ));
        }
    }

    //Allow press enter instead of submit create new collection
    function collNameKeydown(e: React.KeyboardEvent<HTMLInputElement>){
        if (e.code.toLowerCase().includes("enter")){
            if (modalEdit)
                editCollection();
            else
                createNewCollection();
        }
    }

    //Create a new collection
    async function createNewCollection(){
        if (!newCollName)
            createToast(false, "Collection name cannot be blank");
        else{
            const createCollResponse = await APIService.createCollection(newCollName);

            if (createCollResponse.success){
                const collId = Number(createCollResponse.data);

                //Reset filters on create new
                setAllColls(collections => {
                    const updated = [...collections, {collectionid: collId, collectionname: newCollName}];
                    
                    //Set updated collections inside setAllColls because state updates are async
                    setFilteredColls(updated);
                    return updated;
                });
                setSearchText("");
                setNewCollName("");
                setModalOpen(false);

                createToast(true, "Collection created");
            }
            else
                createToast(false, createCollResponse.message);
        }
    }

    //Edit an existing collection
    async function editCollection(){
        if (!editCollName)
            createToast(false, "Collection name cannot be blank");
        else{
            const editReq: UpdateCollectionRequest = {
                collectionid: editCollId,
                collectionname: editCollName,
                lastmodified: new Date()
            }
            const editCollResponse = await APIService.editCollection(editReq);

            if (editCollResponse.success){
                let filtered = allColls.filter(c => c.collectionid != editCollId);

                //Reset filters on edit
                setAllColls(() => {
                    const updated = [...filtered, {collectionid: editCollId, collectionname: editCollName}];
                    
                    //Set updated collections inside setAllColls because state updates are async
                    setFilteredColls(updated);
                    return updated;
                });
                setSearchText("");
                setEditCollName("");
                setEditCollId(0);
                setModalOpen(false);
                
                createToast(true, "Collection updated");
            }
            else
                createToast(false, editCollResponse.message);
        }
    }

    //Delete a collection
    async function deleteCollection(){
        if (confirm("Are you sure? This collection and all its snips will be permanently deleted.")){
            const deleteResponse = await APIService.deleteCollection(editCollId);

            if (deleteResponse.success){
                let filtered = allColls.filter(c => c.collectionid != editCollId);

                //Reset filters on delete
                setAllColls(filtered);
                setFilteredColls(filtered);
                setEditCollName("");
                setEditCollId(0);
                setModalOpen(false);
                
                createToast(true, "Collection deleted");
            }
            else
                createToast(false, deleteResponse.message);
        }
    }

    //Display edit modal for both desktop right click and mobile long touch
    function handleTouchContext(e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>, collectionid: number, collectionname: string){
        e.preventDefault();
        setModalEdit(true);
        setModalOpen(true);
        setEditCollId(collectionid);
        setEditCollName(collectionname);
    }

    return (
        <>
            {
                modalOpen && 
                <CollectionModal 
                    onCloseClick={() => {
                        setModalEdit(false);
                        setModalOpen(false);
                    }} 
                    onNameChange={(e) => {
                        if (modalEdit)
                            setEditCollName(e.target.value)
                        else
                            setNewCollName(e.target.value)
                    }} 
                    onSubmitClick={() => {
                        if (modalEdit)
                            editCollection();
                        else
                            createNewCollection();
                    }} 
                    collectionNameKeydown={collNameKeydown} 
                    onDeleteClick={deleteCollection} isEdit={modalEdit} collectionName={modalEdit ? editCollName : newCollName}/>
            }
            <Toolbar location="/Collections" showAddButton={true} addButtonClick={() => setModalOpen(true)} 
                addButtonTitle="Create new collection" searchBarKeyDown={(e) => searchBarKeyDown(e)} searchBarPlaceholder="Search collections by name" searchBarChange={(e) => setSearchText(e.target.value)} searchBarSearch={filterResults} />
            <div className={`flex justify-items-center grid mt-5 ${filteredColls.length != 0 ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-5" : "grid-cols-1"}`}>
                {
                    filteredColls.length != 0 
                    ? 
                    filteredColls.map(c => (
                        <Collection key={c.collectionid} onClick={() => navigate(generatePath(PAGE_ROUTES.userpages.collectionsnips, {collnameparam: c.collectionname, collidparam: c.collectionid}))} onContextMenu={(e) => handleTouchContext(e, c.collectionid, c.collectionname)} 
                            onTouchStart={(e) => {
                                e.preventDefault();

                                pressTimer = window.setTimeout(function(){
                                    handleTouchContext(e, c.collectionid, c.collectionname)
                                }, 750)
                            }}  
                            onTouchEnd={() => {
                                window.clearTimeout(pressTimer);
                            }} className="w-full flex flex-col items-center duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer" collectionname={c.collectionname} />
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