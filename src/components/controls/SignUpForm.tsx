import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";

export default function CreateAccount(){
    const [firstName, setFNameText] = useState("");
    const [lastName, setLNameText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [verifyPasswordText, setVerifyPasswordText] = useState("");
    const navigate = useNavigate();

    function submitSignUp(){

    }

    function cancelClick(){
        navigate('/');
    }

    return (
        <>
            <h1 className='text-amber-600 text-xl w-full pb-3'>Sign Up</h1>
                                
            <form onSubmit={submitSignUp} method='POST' className='w-full'>
                <Input onChange={
                    (e) => setFNameText(e.target.value)
                } idAndName='fNameText' type='text' classes='w-full bg-white' placeholder='First Name'/>
                
                <Input onChange={
                    (e) => setLNameText(e.target.value)
                } idAndName='lNameText' type='text' classes='w-full mt-3 bg-white' placeholder='Last Name'/>

                <Input onChange={
                    (e) => setEmailText(e.target.value)
                } idAndName='emailText' type='text' classes='w-full mt-3 bg-white' placeholder='Email'/>

                <Input onChange={
                    (e) => setPasswordText(e.target.value)
                } idAndName='passwordText' type='password' classes='w-full mt-3 bg-white' placeholder='Password'/>

                <Input onChange={
                    (e) => setVerifyPasswordText(e.target.value)
                } idAndName='verifyPasswordText' type='password' classes='w-full mt-3 bg-white' placeholder='Verify Password'/>

                <div>
                    <Input type='submit' classes='mt-3 mr-3 bg-indigo-800 hover:bg-indigo-600 text-white cursor-pointer' />
                    <Input type="button" onClick={cancelClick} value="Cancel" classes='mt-3 bg-indigo-800 hover:bg-indigo-600 text-white cursor-pointer' />
                </div>
            </form>
        </>
    )
}