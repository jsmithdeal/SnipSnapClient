import './Login.css'
import { APP_NAME } from '../../utilities/configVariables'
import { Outlet } from 'react-router-dom'


export default function Login(){
    return (
        <div className='w-screen h-screen flex flex-col items-center bg-zinc-900 gradient-border'>
            <h1 className='logo text-6xl md:text-8xl pt-36 md:pt-40 text-amber-600'>{APP_NAME}</h1>

            <div className='grid gap-3 mt-8 w-11/12 sm:w-3/4 md:w-7/12 lg:w-1/2 xl:w-5/12 2xl:w-1/3'>
                <div className='p-5 md:p-10 bg-zinc-800 rounded-lg'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}