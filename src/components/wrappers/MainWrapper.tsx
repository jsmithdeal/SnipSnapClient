import { APP_NAME } from "../../utilities/configVariables";
import { RiMenu4Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import ContentWrapper from "./ContentWrapper";
import { useEffect, useState } from 'react'
import DesktopMenu from "../controls/DesktopMenu";
import MobileMenu from "../controls/MobileMenu";

//Main wrapper for components inside of snipsnap. This houses the top bar, desktop side menu, 
//mobile slide down menu, and main content window
export default function MainWrapper(){
    const [mobileMenu, setMobileMenu] = useState(false);

    //Use for turning off mobile menu when screen gets to be a certain size.
    //return function is run on clean up. Empty dependency array tells react to
    //only run once
    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    function handleResize() {
        if (window.innerWidth >= 1024)
            setMobileMenu(false);
    }

    return (
        <div className="grid w-screen h-screen grid-cols-30 grid-rows-[auto_1fr]">
            <div className="col-span-30 bg-zinc-900 border-b-7 border-indigo-800 p-5">
                {
                    mobileMenu && (
                        <MdOutlineClose className="text-4xl block lg:hidden text-amber-600" onClick={() => setMobileMenu(false)} />
                    )
                }
                
                {
                    !mobileMenu && (
                        <RiMenu4Fill className="text-4xl block lg:hidden text-amber-600" onClick={() => setMobileMenu(true)} />
                    )
                }
                <h1 className='logo hidden lg:block lg:text-4xl xl:text-5xl text-amber-600'>{APP_NAME}</h1>
            </div>

            <DesktopMenu className="hidden lg:block lg:col-span-7 xl:col-span-6 2xl:col-span-5 bg-zinc-900 border-e-7 border-indigo-800 p-5" />
            
            <div className="col-span-30 lg:col-span-23 xl:col-span-24 2xl:col-span-25 overflow-x-hidden bg-zinc-800">
                <div className={`grid h-full w-full transition-[grid-template-rows] duration-500 ${mobileMenu ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <MobileMenu className="bg-zinc-900 overflow-hidden flex flex-col items-center"/>
                    <ContentWrapper className={`p-5 overflow-y-scroll ${mobileMenu ? "hidden" : ""}`} />
                </div>
            </div>
        </div>
    )
}
