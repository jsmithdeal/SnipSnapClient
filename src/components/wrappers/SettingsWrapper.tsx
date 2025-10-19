import { useContext, useEffect, useState } from "react";
import Input from "../Input";
import Select from "../Select";
import APIService from "../../services/api-service";
import type { SettingsResponse } from "../../models/http/ResponseModels";
import { createToast } from "../../utilities/utilityFunctions";
import type { SaveUserRequest, CreateContactRequest } from "../../models/http/RequestModels";
import { useNavigate } from "react-router-dom";
import { SnipSnapContext } from "../../contexts/SnipSnapContext";
import { PAGE_ROUTES } from "../../utilities/configVariables";

export default function SettingsWrapper(){
    const labelClassName = "text-indigo-800 brand-font";
    const navigate = useNavigate();
    const context = useContext(SnipSnapContext);
    
    //User info state
    const [emailText, setEmailText] = useState("");
    const [fNameText, setFNameText] = useState("");
    const [lNameText, setLNameText] = useState("");
    const [userInfoInit, setUserInfoInit] = useState("");
    const [saveInfoDisabled, setSaveInfoDisabled] = useState(true);

    //Contact state
    const [contactOptions, setContactOptions] = useState<HTMLOptionElement[]>([]);
    const [contactDelId, setContactDelId] = useState("");

    //Add contact state
    const [cEmailText, setCEmailText] = useState("");
    const [cDNameText, setCDNameText] = useState("");
    const [saveCDisabled, setSaveCDisabled] = useState(true);

    //Get the settings object and map it to state
    useEffect(() => {
        const getSettings = async () => {
            const settingsResponse = await APIService.getSettings();

            if (settingsResponse.success){
                const settings = settingsResponse.data as SettingsResponse;
                setEmailText(settings.email);
                setFNameText(settings.firstname);
                setLNameText(settings.lastname);
                setUserInfoInit(settings.email + settings.firstname + settings.lastname);
                
                const contacts: HTMLOptionElement[] = settings.contacts.map(c => {
                    return new Option(c.displayname, c.contactid.toString());
                });
                setContactOptions(contacts);
            }
            else
                createToast(false, settingsResponse.message);
        }

        getSettings();
    }, [])

    //Saves modifications to user information
    async function saveUserInfo(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const saveRequest: SaveUserRequest = {
            email: emailText,
            firstname: fNameText,
            lastname: lNameText
        }
        const saveResponse = await APIService.saveUserInfo(saveRequest);

        if (saveResponse.success){
            setSaveInfoDisabled(true);
            createToast(true, "Information saved successfully");
        }
        else
            createToast(false, saveResponse.message);
    }

    //Delete the account
    async function deleteAccount(){
        if (confirm("Delete this account? All data related to this account will be permanently lost.")){
            const deleteResponse = await APIService.deleteAccount();

            if (deleteResponse.success){
                context.setAuthenticated(false);
                navigate(PAGE_ROUTES.accesspages.login, {replace: true})
            }
            else
                createToast(false, deleteResponse.message);
        }
    }

    //Deletes the selected contact
    async function deleteContact(){
        if (confirm("Delete this contact? All snips shared between you and this contact will be unshared.")){
            const deleteResponse = await APIService.deleteContact(parseInt(contactDelId));

            if (deleteResponse.success){
                const updatedContacts = contactOptions.filter((option) => {
                    option.value != contactDelId
                });

                setContactDelId("");
                setContactOptions(updatedContacts);
                createToast(true, "Contact deleted");
            }
            else
                createToast(false, deleteResponse.message);
        }
    }

    //Creates a new contact
    async function createContact(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const contactReq: CreateContactRequest = {
            email: cEmailText,
            displayname: cDNameText
        }
        const contactResponse = await APIService.createContact(contactReq);

        if (contactResponse.success){
            setContactOptions(currOptions => [
                ...currOptions, 
                new Option(
                    cDNameText, (contactResponse.data as unknown as number).toString()
                )
            ]);
            setCEmailText("");
            setCDNameText("");
            setSaveCDisabled(true);
            createToast(true, "Contact created");
        }
        else
            createToast(false, contactResponse.message)
    }

    //Verifies that at least one of the user information fields has changed before enabling save button
    function checkUserInfo(field: string, e: React.ChangeEvent<HTMLInputElement>){
        let userInfoMod = "";
        let val = e.target.value;

        if (field == "email"){
            setEmailText(e.target.value);
            userInfoMod = val + fNameText + lNameText;
        }
        else if (field == "fName"){
            setFNameText(e.target.value);
            userInfoMod = emailText + val + lNameText;
        }
        else {
            setLNameText(e.target.value);
            userInfoMod = emailText + fNameText + val;
        }

        if (userInfoMod != userInfoInit)
            setSaveInfoDisabled(false);
        else
            setSaveInfoDisabled(true);
    }
    
    return (
        <div>
            {/* User information block */}
            <h1 className="brand-font text-3xl text-amber-600">My Information</h1>
            <form onSubmit={saveUserInfo} method="POST" className="mt-3">
                <Input label="Email" labelClassName={labelClassName} onChange={(e) => checkUserInfo("email", e)} idAndName='emailText' type='email' className='w-full mb-4' required value={emailText}/>
                <Input label="First Name" labelClassName={labelClassName} onChange={(e) => checkUserInfo("fName", e)} idAndName='fNameText' type='text' className='w-full mb-4' required value={fNameText}/>
                <Input label="Last Name" labelClassName={labelClassName} onChange={(e) => checkUserInfo("lName", e)} idAndName='lNameText' type='text' className='w-full' required value={lNameText}/>

                <div className="mt-1">
                    <Input type='submit' value="Save" className={`mt-3 mr-3 text-white cursor-pointer rounded-md ${!saveInfoDisabled ? "bg-indigo-800 hover:bg-indigo-600" : "bg-zinc-300"}`} disabled={saveInfoDisabled} />
                    <Input type="button" value="Delete Account" className='mt-3 bg-red-800 hover:bg-red-700 text-white cursor-pointer rounded-md' onClick={deleteAccount} />
                </div>
            </form>

            {/* Add contacts block */}
            <h1 className="brand-font text-3xl text-amber-600 mt-15">Add Contact</h1>
            <form onSubmit={createContact} method="POST" className="mt-3">
                <Input onChange={
                    (e) => {
                        setCEmailText(e.target.value);
                        setSaveCDisabled(e.target.value && cDNameText ? false : true);
                    }
                } 
                label="Email" labelClassName={labelClassName} idAndName='emailText' type='email' className='w-full mb-4' required value={cEmailText}/>
                <Input onChange={
                    (e) => {
                        setCDNameText(e.target.value);
                        setSaveCDisabled(e.target.value && cEmailText ? false : true);
                    }
                } 
                label="Display Name" labelClassName={labelClassName} idAndName='dNameText' type='text' className='w-full' required value={cDNameText}/>

                <div className="mt-1">
                    <Input type='submit' value="Save" className={`mt-3 mr-3 text-white cursor-pointer rounded-md ${!saveCDisabled ? "bg-indigo-800 hover:bg-indigo-600" : "bg-zinc-300"}`} disabled={saveCDisabled} />
                </div>
            </form>

            {/* My contacts block */}
            <h1 className="brand-font text-3xl text-amber-600 mt-15">My Contacts</h1>
            <Select onSelect={(e) => setContactDelId(e.target.value)} size={4} multiple={false} options={contactOptions} className="mt-3 w-full" />
            <Input type="button" value="Delete Contact" className={`mt-3 text-white cursor-pointer rounded-md ${contactDelId ? "bg-red-800 hover:bg-red-700" : "bg-zinc-300"}`} disabled={contactDelId == ""} onClick={deleteContact} />  
        </div>
    )
}