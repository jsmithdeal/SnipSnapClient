import { useContext, useState } from 'react'
import Input from '../controls/Input'
import APIService from '../../services/api-service';
import { createToast } from '../../utilities/utilityFunctions';
import type { LoginRequest } from '../../models/http/RequestModels';
import { Link, useNavigate } from 'react-router-dom';
import { SnipSnapContext } from '../../contexts/SnipSnapContext';
import { PAGE_ROUTES } from '../../utilities/configVariables';

//The login form component
export default function LoginForm(){
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const navigate = useNavigate();
    const snipsnapContext = useContext(SnipSnapContext);

    //Submit form login
    async function submitLogin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        //Build login request from state
        const login: LoginRequest = {
            email: emailText,
            password: passwordText
        }

        //Call login api which will store jwt and csfr tokens in cookies (React state not persistent)
        const loginResponse = await APIService.login(login);

        if (loginResponse.success){
            snipsnapContext?.setAuthenticated(true);
            navigate("/userpages/snips", {replace: true});
        }
        else 
            createToast(false, loginResponse.message);
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

            <h2 className='text-white pt-5 md:pt-10'>No account? <Link to={PAGE_ROUTES.accesspages.createaccount} replace={true} className='cursor-pointer text-amber-600 hover:text-indigo-600'>Sign up here.</Link></h2>
        </>
    )
}