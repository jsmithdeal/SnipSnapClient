import './Login.css'
import { useState } from 'react'
import { APP_NAME } from '../../configVariables'
import Input from '../controls/Input'

export default function Login(){
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    function submitLogin(){

    }

    return (
        <div className='w-screen h-screen flex flex-col items-center bg-zinc-900 gradient-border'>
            <h1 className='logo text-6xl md:text-8xl pt-30 md:pt-40 text-amber-600'>{APP_NAME}</h1>
                
            <div className='flex flex-col items-center mt-8 p-5 md:p-10 w-11/12 sm:w-3/4 md:w-7/12 lg:w-1/2 xl:w-5/12 2xl:w-1/3 bg-zinc-800 rounded-lg'>
                <h1 className='text-amber-600 text-xl w-full pb-3'>Login</h1>
                
                <form onSubmit={submitLogin} method='POST' className='w-full'>
                    <Input onChange={
                        (e) => setEmailText(e.target.value)
                    } idAndName='emailText' type='text' classes='w-full bg-white' placeholder='Email'/>
                    <Input onChange={
                        (e) => setPasswordText(e.target.value)
                    } idAndName='passwordText' type='password' classes='w-full mt-3 bg-white' placeholder='Password'/>
                    <Input type='submit' classes='mt-3 bg-indigo-800 hover:bg-indigo-600 text-white cursor-pointer' />
                </form>
            </div>
        </div>
    )
}