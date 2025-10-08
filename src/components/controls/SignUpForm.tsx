import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  APIService  from "../../services/api-service"
import Input from "./Input";
import type { CreateUserRequest } from "../../models/http/RequestModels";
import { createToast } from "../../utilities/utilityFunctions";
import { Bounce, toast } from "react-toastify";
import { PAGE_ROUTES } from "../../utilities/configVariables";

//The create account form component
export default function CreateAccount(){
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const navigate = useNavigate();

    //Validate password and submit user for creation
    async function submitSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (password != verifyPassword){
            createToast(false, "Passwords don't match");
        }
        else if (!meetsPwdReqs()){
            createToast(false, "Password must meet the following requirements: minimum 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character");
        }
        else {
            //Build create user request from state
            const user: CreateUserRequest = {
                email: email,
                password: password,
                firstname: firstName,
                lastname: lastName
            }

            const createResponse = await APIService.createUser(user);
            
            if (createResponse.statusCode == 200){
                //Call toast directly here for callback
                toast.success("User created. Redirecting to login...", {
                    autoClose: 5000,
                    theme: "dark",
                    onClose: () => navigate(PAGE_ROUTES.accesspages.login, {replace: true}),
                    transition: Bounce,
                });
            }
            else 
                createToast(false, createResponse.message);
        }
    }

    //Validate password requirements with regex
    function meetsPwdReqs(): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        return passwordRegex.test(password);
    }

    //Cancel button click...
    function cancelClick() {
        navigate(PAGE_ROUTES.accesspages.login, {replace: true});
    }

    return (
        <>
            <h1 className='text-amber-600 text-xl w-full pb-3'>Sign Up</h1>
                                
            <form onSubmit={submitSignUp} method='POST' className='w-full'>
                <Input onChange={
                    (e) => setFName(e.target.value)
                } idAndName='fNameText' type='text' className='w-full bg-white' placeholder='First Name' required/>
                
                <Input onChange={
                    (e) => setLName(e.target.value)
                } idAndName='lNameText' type='text' className='w-full mt-3 bg-white' placeholder='Last Name' required/>

                <Input onChange={
                    (e) => setEmail(e.target.value)
                } idAndName='emailText' type='email' className='w-full mt-3 bg-white' placeholder='Email' required/>

                <Input onChange={
                    (e) => setPassword(e.target.value)
                } idAndName='passwordText' type='password' className='w-full mt-3 bg-white' placeholder='Password' required/>

                <Input onChange={
                    (e) => setVerifyPassword(e.target.value)
                } idAndName='verifyPasswordText' type='password' className='w-full mt-3 bg-white' placeholder='Verify Password' required/>

                <div>
                    <Input type='submit' className='mt-3 mr-3 bg-indigo-800 hover:bg-indigo-600 text-white cursor-pointer rounded-md' />
                    <Input type="button" onClick={cancelClick} value="Cancel" className='mt-3 bg-indigo-800 hover:bg-indigo-600 text-white cursor-pointer rounded-md' />
                </div>
            </form>
        </>
    )
}