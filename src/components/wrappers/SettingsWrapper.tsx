import { useEffect, useState } from "react";
import Input from "../Input";
import Select from "../Select";
import APIService from "../../services/api-service";
import type { SettingsResponse } from "../../models/http/ResponseModels";
import { createToast } from "../../utilities/utilityFunctions";

export default function SettingsWrapper(){
    //User info state
    const [emailText, setEmailText] = useState("");
    const [fNameText, setFNameText] = useState("");
    const [lNameText, setLNameText] = useState("");
    const [saveInfoDisabled, setSaveInfoDisabled] = useState(true);

    //Contact state
    const [contactOptions, setContactList] = useState<HTMLOptionElement[]>([]);
    const [contactDelId, setContactDelId] = useState(0);

    //Add contact state
    const [cEmailText, setCEmailText] = useState("");
    const [cDNameText, setCDNameText] = useState("");
    const [saveCDisabled, setSaveCDisabled] = useState(true);

    useEffect(() => {
        const getSettings = async () => {
            const settingsResponse = await APIService.getSettings();

            if (settingsResponse.success){
                const settings = settingsResponse.data as SettingsResponse;
                setEmailText(settings.email);
                setFNameText(settings.firstname);
                setLNameText(settings.lastname);
                
                const contacts: HTMLOptionElement[] = settings.contacts.map(c => {
                    return new Option(c.displayname, c.contactid.toString());
                });
                setContactList(contacts);
            }
            else
                createToast(false, "Unable to get settings for user");
        }

        getSettings();
    }, [])
    
    return (
        <div>
            <h1 className="brand-font text-3xl text-amber-600">My Information</h1>
            <form method="POST" className="mt-3">
                <Input onChange={
                    (e) => {
                        setEmailText(e.target.value);
                        setSaveInfoDisabled(false);
                    }
                } 
                idAndName='emailText' type='email' className='w-full bg-white' placeholder='Email' required value={emailText}/>
                <Input onChange={
                    (e) => {
                        setFNameText(e.target.value);
                        setSaveInfoDisabled(false);
                    }
                } idAndName='fNameText' type='text' className='w-full bg-white mt-3' placeholder='First Name' required value={fNameText}/>
                <Input onChange={
                    (e) => {
                        setLNameText(e.target.value);
                        setSaveInfoDisabled(false);
                    }
                } idAndName='lNameText' type='text' className='w-full bg-white mt-3' placeholder='Last Name' required value={lNameText}/>

                <div className="mt-1">
                    <Input type='submit' value="Save" className={`mt-3 mr-3 text-white cursor-pointer rounded-md ${!saveInfoDisabled ? "bg-indigo-800 hover:bg-indigo-600" : "bg-zinc-300"}`} disabled={saveInfoDisabled} />
                    <Input type="button" value="Delete Account" className='mt-3 bg-red-800 hover:bg-red-700 text-white cursor-pointer rounded-md' />
                </div>
            </form>

            <h1 className="brand-font text-3xl text-amber-600 mt-15">My Contacts</h1>
            <form method="POST" className="mt-3">
                <Select onSelect={
                    (e) => setContactDelId(parseInt(e.target.value))
                } size={4} multiple={false} options={contactOptions} className="w-full bg-white" />
                <Input type="button" value="Delete Contact" className={`mt-3 text-white cursor-pointer rounded-md ${contactDelId ? "bg-red-800 hover:bg-red-700" : "bg-zinc-300"}`} disabled={contactDelId == 0} />
            </form>

            <h1 className="brand-font text-3xl text-amber-600 mt-15">Add Contact</h1>
            <form method="POST" className="mt-3">
                <Input onChange={
                    (e) => {
                        setCEmailText(e.target.value);
                        setSaveCDisabled(e.target.value && cDNameText ? false : true);
                    }
                } 
                idAndName='emailText' type='email' className='w-full bg-white' placeholder='Email' required/>
                <Input onChange={
                    (e) => {
                        setCDNameText(e.target.value);
                        setSaveCDisabled(e.target.value && cEmailText ? false : true);
                    }
                } idAndName='dNameText' type='text' className='w-full bg-white mt-3' placeholder='Display Name (whatever you want to call this contact)' required/>

                <div className="mt-1">
                    <Input type='submit' value="Save" className={`mt-3 mr-3 text-white cursor-pointer rounded-md ${!saveCDisabled ? "bg-indigo-800 hover:bg-indigo-600" : "bg-zinc-300"}`} disabled={saveCDisabled} />
                </div>
            </form>
        </div>
    )
}