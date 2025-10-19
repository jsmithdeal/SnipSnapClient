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

export default function SnipDetailsWrapper(){
    const labelClassName = "text-indigo-800 brand-font";
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [collection, setCollection] = useState("");
    const [langOptions, setLangOptions] = useState<HTMLOptionElement[]>([]);
    const [language, setLanguage] = useState("");
    const [contentVal, setContentVal] = useState("");
    const [contactOptions, setContactOptions] = useState<HTMLOptionElement[]>([]);
    const [contacts, setContacts] = useState<HTMLCollectionOf<HTMLOptionElement>>();

    //TODO: on component load, check for snip ID. If present edit, if not create new

    //TODO: if edit, need to get snip info. This will also need to contain full list of collections,
    //full list of contacts, and list of contacts this snip is shared with

    //TODO: implement endpoints logic for creating new, saving existing, and deleting existing
    
    useEffect(() => {
        setLangOptions(Object.entries(SNIP_LANGUAGES).map(([value, text]) => {
            return new Option(text, value);
        }))
    },[])

    //Copied this from react-codemirror npm page
    const onCodeChange = React.useCallback((val: React.SetStateAction<string>) => {
        setContentVal(val);
    }, []);

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
    
    function getTheme() {
        if (language == "plaintext" || language == "")
            return undefined;
        else
            return vscodeDark;
    }

    return (
        <>
            <h1 className="brand-font text-3xl text-amber-600">Create a Snip</h1>
            <form id="snipForm" className="mt-3 mb-4 w-full">
                <Input onChange={(e) => setName(e.target.value)} label="Name" labelClassName={labelClassName} idAndName="snipname" type="text" className="w-full mb-4" required={true} />
                <Textarea onChange={(e) => setDescription(e.target.value)} label="Description" labelClassName={labelClassName} idAndName="snipdescription" className="w-full mb-4" required={true} />
                <Select onSelect={(e) => setCollection(e.target.value)} label="Collection" labelClassName={labelClassName} idAndName="collectionid" options={[]} className="w-full mb-4" />
                <Select onSelect={(e) => setLanguage(e.target.value)} label="Language" labelClassName={labelClassName} idAndName="sniplanguage" options={langOptions} className="w-full" />
            </form>

            <label className={labelClassName}>Content</label>
            <div className="lg:mb-4 grid grid-rows-[1fr_auto] lg:grid-cols-[1fr_auto]">
                <CodeMirror value={contentVal} onChange={onCodeChange} height="200px" extensions={[getExtension()]} theme={getTheme()} className="border-2 border-zinc-300 rounded-sm" />
                
                <div className="mt-3 flex justify-end lg:block lg:ms-3 lg:mt-0">
                    <IoCopy onClick={
                        () => { 
                            navigator.clipboard.writeText(contentVal);
                            createToast(true, "Copied!", 1000); 
                        }
                    } className="inline-block lg:block text-2xl text-indigo-800 cursor-pointer duration-300 hover:-translate-y-1 hover:scale-105" title="Copy all content" />
                    <MdContentCut onClick={
                        () => { 
                            navigator.clipboard.writeText(contentVal);
                            setContentVal("");
                            createToast(true, "Cut!", 1000); 
                        }
                    } className="inline-block lg:block ms-3 lg:mt-3 lg:ms-0 text-2xl text-amber-600 cursor-pointer duration-300 hover:-translate-y-1 hover:scale-105" title="Cut all content" />
                </div>
            </div>

            <Select onSelect={(e) => setContacts(e.target.selectedOptions)} form="snipForm" label="Share With" labelClassName={labelClassName} idAndName="contacts" size={4} multiple={true} options={[]} className="w-full" />
            <Input form="snipForm" type="hidden" idAndName="snipcontent" value={contentVal} required={true} />

            <div className="mt-1">
                <Input type='submit' value="Save Snip" className="bg-indigo-800 hover:bg-indigo-600 mt-3 mr-3 text-white cursor-pointer rounded-md" />
                <Input type="button" value="Delete Snip" className='mt-3 bg-red-800 hover:bg-red-700 text-white cursor-pointer rounded-md' />
            </div>
        </>
    )
}