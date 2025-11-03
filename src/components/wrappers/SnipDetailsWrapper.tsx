import { useEffect, useState } from "react";
import Input from "../Input";
import Select from "../Select";
import Textarea from "../Textarea";
import { SNIP_LANGUAGES } from "../../utilities/configVariables";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { csharp } from '@replit/codemirror-lang-csharp'
import { cpp } from '@codemirror/lang-cpp'
import { go } from "@codemirror/lang-go";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { json } from "@codemirror/lang-json";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { sass } from "@codemirror/lang-sass";
import { sql } from "@codemirror/lang-sql";
import { xml } from "@codemirror/lang-xml";
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import React from "react";
import { IoCopy } from "react-icons/io5";
import { MdContentCut } from "react-icons/md";
import { createToast } from "../../utilities/utilityFunctions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import APIService from "../../services/api-service";
import type { CollectionResponse, ContactsResponse, SnipDetailsResponse, SnipInitResponse } from "../../models/http/ResponseModels";
import type { SaveSnipRequest } from "../../models/http/RequestModels";

//Props indicate how to load snip details (varies based on my snips vs shared with me)
type SnipDetailsProps = {
    fromSharedWithMe?: boolean;
}

export default function SnipDetailsWrapper(props: SnipDetailsProps){
    const labelClassName = "text-indigo-800 brand-font";
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [collectionOptions, setCollectionOptions] = useState<HTMLOptionElement[]>([]);
    const [collection, setCollection] = useState("");
    const [langOptions, setLangOptions] = useState<HTMLOptionElement[]>([]);
    const [language, setLanguage] = useState("");
    const [contentVal, setContentVal] = useState("");
    const [contactOptions, setContactOptions] = useState<HTMLOptionElement[]>([]);
    const [sharedWith, setSharedWith] = useState<string[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { snipidparam } = useParams();
    
    useEffect(() => {
        //Get the languages object from config variables and unpack them into the dropdown
        setLangOptions(Object.entries(SNIP_LANGUAGES).map(([value, text]) => {
            return new Option(text, value);
        }));

        //Gets the snip details when editing an existing snip
        const getSnipDetails = async (id: number) => {
            const snipDetailsResponse = await APIService.getSnipDetails(id);

            //If details retrieved successfully, extract them and configure state
            if (snipDetailsResponse.success){
                const snipDetails = snipDetailsResponse.data as SnipDetailsResponse;

                loadContactsAndCollections(snipDetails.contacts, snipDetails.collections);
                setName(snipDetails.snipname);
                setDescription(snipDetails.snipdescription);
                setCollection(snipDetails.collectionid?.toString());
                setLanguage(snipDetails.sniplanguage);
                setContentVal(snipDetails.snipcontent);
                setSharedWith(Array.from(snipDetails.sharedwith, contactid => contactid.toString()));
            }
            else {
                createToast(false, snipDetailsResponse.message);
                navigate(-1);
            }
        }

        //Get init data when creating a new snip
        const getSnipInit = async () => {
            const snipInitResponse = await APIService.getSnipInit();

            if (snipInitResponse.success){
                const initData = snipInitResponse.data as SnipInitResponse;
                loadContactsAndCollections(initData.contacts, initData.collections)
                setLanguage("plaintext");
            }
            else {
                createToast(false, snipInitResponse.message);
                navigate(-1);
            }
        }

        //Only try to get the snip details if snipid found. Otherwise, need snip init info
        //for creating a new snip
        if (snipidparam){
            let id = parseInt(snipidparam ?? "");
            getSnipDetails(id);
        }
        else 
            getSnipInit();
    }, [location.pathname])

    //Copied this from react-codemirror npm page
    const onCodeChange = React.useCallback((val: React.SetStateAction<string>) => {
        setContentVal(val);
    }, []);

    //Bind data that is common between edit snip and create new
    function loadContactsAndCollections(contacts: ContactsResponse[], collections: CollectionResponse[]){
        let collectionOptions: HTMLOptionElement[] = collections?.map(c => {
            return new Option(c.collectionname, c.collectionid.toString());
        });
        collectionOptions.splice(0, 0, new Option("", ""))

        let contactOptions: HTMLOptionElement[] = contacts?.map(c => {
            return new Option(c.displayname, c.contactid.toString());
        });

        setCollectionOptions(collectionOptions);
        setContactOptions(contactOptions);
    }

    //Get the codemirror extension for the selected language
    function getExtension() {
        switch (language) {
            case "javascript":
                return javascript({ jsx: true });
            case "cpp":
                return cpp();
            case "csharp":
                return csharp();
            case "go":
                return go();
            case "html":
                return html();
            case "java":
                return java();
            case "json":
                return json();
            case "php":
                return php();
            case "python":
                return python();
            case "rust":
                return rust();
            case "sass":
                return sass();
            case "sql":
                return sql();
            case "xml":
                return xml();
            default:
                return [];
        }
    }
    
    //Theme = none if plaintext, else vscode
    function getTheme() {
        if (language == "plaintext" || language == "")
            return undefined;
        else
            return vscodeDark;
    }

    //Create snip edits or save new snip
    async function saveSnip(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const saveSnipRequest: SaveSnipRequest = {
            snipid: snipidparam ? parseInt(snipidparam) : 0,
            snipname: name,
            snipdescription: description,
            sniplanguage: language,
            snipcontent: contentVal,
            collectionid: parseInt(collection),
            sharedwith: Array.from(sharedWith, contactId => parseInt(contactId)),
            lastmodified: new Date()
        }

        let saveSnipReponse;

        //If creating new, call new, else edit
        if (!snipidparam)
            saveSnipReponse = await APIService.createSnip(saveSnipRequest);
        else
            saveSnipReponse = await APIService.editSnip(saveSnipRequest);

        if (saveSnipReponse.success){
            createToast(true, "Snip saved");

            if (!snipidparam)
                navigate(-1);
        }
        else
            createToast(false, saveSnipReponse.message);
    }

    //Delete the snip
    async function deleteSnip(snipId: string){
        const deleteResponse = await APIService.deleteSnip(parseInt(snipId))

        if (deleteResponse.success){
            createToast(true, "Snip deleted");
            navigate(-1);
        }
        else
            createToast(false, deleteResponse.message);
    }

    //Get the header text based on the context in which the component is being viewed
    function getHeader(){
        if (snipidparam && props.fromSharedWithMe)
            return "View Shared Snip";
        else if (snipidparam)
            return "Edit Snip";
        else
            return "Create New Snip";
    }

    return (
        <>
            <h1 className="brand-font text-3xl text-amber-600">{ getHeader() }</h1>
            <form onSubmit={saveSnip} id="snipForm" className="mt-3 mb-4 w-full">
                <Input onChange={(e) => setName(e.target.value)} label="Name" labelClassName={labelClassName} idAndName="snipname" type="text" className="w-full mb-4" required={true} value={name} />
                <Textarea onChange={(e) => setDescription(e.target.value)} label="Description" labelClassName={labelClassName} idAndName="snipdescription" className="w-full mb-4" required={true} value={description} />
                
                {
                    !props.fromSharedWithMe && 
                    <Select onSelect={(e) => setCollection(e.target.value)} label="Collection" labelClassName={labelClassName} idAndName="collectionid" options={collectionOptions} value={collection} className="w-full mb-4" />
                }

                <Select onSelect={(e) => setLanguage(e.target.value)} label="Language" labelClassName={labelClassName} idAndName="sniplanguage" options={langOptions} value={language} className="w-full" />
            </form>

            <label className={labelClassName}>Content</label>
            <div className="lg:mb-4 grid grid-rows-[1fr_auto] lg:grid-cols-[1fr_auto]">
                <CodeMirror value={contentVal} onChange={onCodeChange} height="300px" extensions={[getExtension()]} theme={getTheme()} className="overflow-x-auto border-2 border-zinc-300 rounded-sm" />
                
                <div className="mt-3 flex justify-end lg:block lg:ms-3 lg:mt-0">
                    <IoCopy onClick={
                        () => { 
                            navigator.clipboard.writeText(contentVal);
                            createToast(true, "Copied!"); 
                        }
                    } className="inline-block lg:block text-2xl text-indigo-800 cursor-pointer duration-300 hover:-translate-y-1 hover:scale-105" title="Copy all content" />
                    <MdContentCut onClick={
                        () => { 
                            navigator.clipboard.writeText(contentVal);
                            setContentVal("");
                            createToast(true, "Cut!"); 
                        }
                    } className="inline-block lg:block ms-3 lg:mt-3 lg:ms-0 text-2xl text-amber-600 cursor-pointer duration-300 hover:-translate-y-1 hover:scale-105" title="Cut all content" />
                </div>
            </div>

            {
                !props.fromSharedWithMe &&
                <Select onSelect={
                    (e) => setSharedWith(Array.from(e.target.selectedOptions, option => option.value))
                } form="snipForm" label="Share With" labelClassName={labelClassName} idAndName="contacts" size={4} multiple={true} options={contactOptions} className="w-full" value={sharedWith} />
            }
            <Input form="snipForm" type="hidden" idAndName="snipcontent" value={contentVal} />

            {
                !props.fromSharedWithMe &&
                <div className="mt-1">
                    <Input type='submit' value="Save Snip" form="snipForm" className="bg-indigo-800 hover:bg-indigo-600 mt-3 mr-3 text-white cursor-pointer rounded-md" />
                    {
                        snipidparam && <Input type="button" value="Delete Snip" onClick={() => deleteSnip(snipidparam)} className='mt-3 bg-red-800 hover:bg-red-700 text-white cursor-pointer rounded-md' />
                    }
                </div>
            }
        </>
    )
}