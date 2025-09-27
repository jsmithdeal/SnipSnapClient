import { useState } from 'react'
import Input from '../controls/Input'

export default function LoginForm(){
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    function submitLogin(){
        
    }

    return (
        <>
            <h1 className='text-amber-600 text-xl w-full pb-3'>Login</h1>
                    
            <form onSubmit={submitLogin} method='POST' className='w-full'>
                <Input onChange={
                    (e) => setEmailText(e.target.value)
                } idAndName='emailText' type='email' classes='w-full bg-white' placeholder='Email' required/>
                <Input onChange={
                    (e) => setPasswordText(e.target.value)
                } idAndName='passwordText' type='password' classes='w-full mt-3 bg-white' placeholder='Password' required/>
                <Input type='submit' classes='mt-3 bg-indigo-800 hover:bg-indigo-600 text-white cursor-pointer' />
            </form>

            <h2 className='text-white pt-5 md:pt-10'>No account? <a href='/sign-up' className='cursor-pointer text-indigo-800 hover:text-indigo-600'>Sign up here.</a></h2>
        </>
    )
}