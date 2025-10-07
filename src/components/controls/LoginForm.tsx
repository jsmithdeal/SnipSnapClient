import { useContext, useState } from 'react'
import Input from '../controls/Input'
import APIService from '../../services/api-service';
import { createToast } from '../../utilities/utilityFunctions';
import type { LoginRequest } from '../../models/http/RequestModels';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import type { UserResponse } from '../../models/http/ResponseModels';

//The login form component
export default function LoginForm(){
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    //Submit form login
    async function submitLogin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        //Build login request from state
        const login: LoginRequest = {
            email: emailText,
            password: passwordText
        }

        //Call login api which will store jwt and csfr tokens in cookies (React state not persistent)
        const userResponse = await APIService.login(login);
        const csfrToken = await cookieStore.get("snipsnap-csfr");

        if (userResponse.success && csfrToken?.value != null && csfrToken?.value != ""){
            let user = (userResponse.data as UserResponse);

            userContext?.setUser(user);
            userContext?.setAuthenticated(true);
            navigate("/snipsnap", {replace: true});
        }
        else 
            createToast(false, userResponse.message);
    }

    return (
        <>
            <h1 className='text-amber-600 text-xl w-full pb-3'>Login</h1>
                    
            <form onSubmit={submitLogin} method='POST' className='w-full'>
                <Input onChange={
                    (e) => setEmailText(e.target.value)
                } idAndName='emailText' type='email' className='w-full bg-white' placeholder='Email' required/>
                <Input onChange={
                    (e) => setPasswordText(e.target.value)
                } idAndName='passwordText' type='password' className='w-full mt-3 bg-white' placeholder='Password' required/>
                <Input type='submit' className='mt-3 bg-indigo-800 hover:bg-indigo-600 text-white cursor-pointer rounded-md' />
            </form>

            <h2 className='text-white pt-5 md:pt-10'>No account? <a href='/sign-up' className='cursor-pointer text-indigo-800 hover:text-indigo-600'>Sign up here.</a></h2>
        </>
    )
}