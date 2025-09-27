import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  APIService  from "../../services/api-service"
import Input from "./Input";
import type CreateUser from "../../models/CreateUser";

export default function CreateAccount(){
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const navigate = useNavigate();

    function submitSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        //TODO: HANDLE VALIDATION ERRORS
        if (password != verifyPassword){
            
        }
        else if (!meetsPwdReqs()){

        }
        else {
            //TODO: HANDLE ERRORS ON SUBMISSION TO API
            const user: CreateUser = {
                email: email,
                password: password,
                firstname: firstName,
                lastname: lastName
            }

            APIService.createUser(user);
        }
    }

    function meetsPwdReqs(): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        return passwordRegex.test(password);
    }

    function cancelClick() {
        navigate('/');
    }

    return (
        <>
            <h1 className='text-amber-600 text-xl w-full pb-3'>Sign Up</h1>
                                
            <form onSubmit={submitSignUp} method='POST' className='w-full'>
                <Input onChange={
                    (e) => setFName(e.target.value)
                } idAndName='fNameText' type='text' classes='w-full bg-white' placeholder='First Name' required/>
                
                <Input onChange={
                    (e) => setLName(e.target.value)
                } idAndName='lNameText' type='text' classes='w-full mt-3 bg-white' placeholder='Last Name' required/>

                <Input onChange={
                    (e) => setEmail(e.target.value)
                } idAndName='emailText' type='email' classes='w-full mt-3 bg-white' placeholder='Email' required/>

                <Input onChange={
                    (e) => setPassword(e.target.value)
                } idAndName='passwordText' type='password' classes='w-full mt-3 bg-white' placeholder='Password' required/>

                <Input onChange={
                    (e) => setVerifyPassword(e.target.value)
                } idAndName='verifyPasswordText' type='password' classes='w-full mt-3 bg-white' placeholder='Verify Password' required/>

                <div>
                    <Input type='submit' classes='mt-3 mr-3 bg-indigo-800 hover:bg-indigo-600 text-white cursor-pointer' />
                    <Input type="button" onClick={cancelClick} value="Cancel" classes='mt-3 bg-indigo-800 hover:bg-indigo-600 text-white cursor-pointer' />
                </div>
            </form>
        </>
    )
}