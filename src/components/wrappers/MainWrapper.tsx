import { APP_NAME } from "../../utilities/configVariables";
import { RiMenu4Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import ContentWrapper from "./ContentWrapper";
import { useEffect, useState } from 'react'
import { MdOutlineExpandMore } from "react-icons/md";
import DesktopMenu from "../DesktopMenu";
import MobileMenu from "../MobileMenu";
import Logout from "../Logout";

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
        <div className="grid w-screen h-screen grid-rows-[auto_auto_1fr] lg:grid-rows-[auto_auto_auto_1fr]">
            <div className="bg-zinc-900 p-5 lg:flex lg:justify-center sticky top-0 left-0">
                <div className="lg:container flex">
                    <div>
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
                        <h1 className='brand-font hidden lg:block lg:text-5xl xl:text-6xl text-amber-600'>{APP_NAME}</h1>
                    </div>
                    <div className="w-full flex justify-end items-end text-amber-600">
                        <Logout />
                    </div>
                </div>
            </div>

            <div className="bg-indigo-800 text-zinc-100 hidden lg:flex lg:justify-center p-0">
                <div className="container flex justify-center">
                    <MdOutlineExpandMore className={`text-4xl cursor-pointer ${desktopMenu && "transform rotate-180"}`} onClick={() => {desktopMenu ? setDesktopMenu(false) : setDesktopMenu(true)}} />
                </div>
            </div>

            <div className="hidden lg:flex lg:justify-center z-50">
                <div className="container relative">
                    <div className={`shadow-lg shadow-zinc-600 w-full rounded-b-xl absolute bg-zinc-100 overflow-hidden transform transition-transform duration-300 origin-top ${desktopMenu ? "scale-y-100" : "scale-y-0"}`}>
                        <DesktopMenu className="p-3 flex justify-center" onClick={() => setDesktopMenu(false)}/>
                    </div>
                </div>
            </div>

            <div className="lg:hidden z-50">
                <div className="relative">
                    <div className={`w-screen h-[calc(100dvh-4.75rem)] bg-zinc-900 absolute transform transition-transform duration-300 origin-top ${mobileMenu ? "scale-y-100" : "scale-y-0"}`}>
                        <MobileMenu className="overflow-hidden flex flex-col items-center"/>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-100 lg:flex lg:justify-center overflow-y-scroll scrollbar-hide">
                <div className="lg:container">
                    <ContentWrapper className={`p-5 ${mobileMenu && "hidden"}`} />
                </div>
            </div>
        </div>
    )
}
