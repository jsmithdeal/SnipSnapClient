import { APP_NAME } from "../../utilities/configVariables";
import { RiMenu4Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import ContentWrapper from "./ContentWrapper";
import { useEffect, useState } from 'react'
import { MdOutlineExpandMore } from "react-icons/md";
import DesktopMenu from "../controls/DesktopMenu";
import MobileMenu from "../controls/MobileMenu";

//Main wrapper for components inside of snipsnap. This houses the top bar, desktop side menu, 
//mobile slide down menu, and main content window
export default function MainWrapper(){
    const [mobileMenu, setMobileMenu] = useState(false);
    const [desktopMenu, setDesktopMenu] = useState(false);

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
        <div className="grid w-screen h-screen grid-rows-[auto_1fr] lg:grid-rows-[auto_auto_auto_1fr]">
            <div className="bg-zinc-900 p-5 lg:flex lg:justify-center">
                <div className="lg:container">
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
                    <h1 className='logo hidden lg:block lg:text-5xl xl:text-6xl text-amber-600'>{APP_NAME}</h1>
                </div>
            </div>

            <div className="bg-indigo-800 text-white hidden lg:flex lg:justify-center p-0">
                <div className="container flex justify-center">
                    <MdOutlineExpandMore className={`text-4xl cursor-pointer ${desktopMenu && "transform rotate-180"}`} onClick={() => {desktopMenu ? setDesktopMenu(false) : setDesktopMenu(true)}} />
                </div>
            </div>

            <div className="hidden lg:flex lg:justify-center">
                <div className="container relative">
                    <div className={`w-full absolute bg-indigo-600 overflow-hidden transform transition-transform duration-300 origin-top ${desktopMenu ? "scale-y-100" : "scale-y-0"}`}>
                        <DesktopMenu className="p-3 flex justify-center" onClick={() => setDesktopMenu(false)}/>
                    </div>
                </div>
            </div>
            
            <div className="bg-zinc-800 lg:flex lg:justify-center">
                <div className={`grid h-full lg:container w-full transition-[grid-template-rows] duration-500 ${mobileMenu ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <MobileMenu className="bg-zinc-900 overflow-hidden flex flex-col items-center"/>
                    <ContentWrapper className={`p-5 overflow-y-scroll scrollbar-hide ${mobileMenu && "hidden"}`} />
                </div>
            </div>
        </div>
    )
}
