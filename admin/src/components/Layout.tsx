import { useRef, useState } from "react";
import Nav from "./Nav";

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps>  = ({ children }) => {
    const navRef = useRef(null);
    const [showNav,setShowNav] = useState(false);
    return (
        <div className="bg-white dark:bg-zinc-800">
            <button onClick={()=>setShowNav(!showNav)} className="dark:text-white md:hidden mt-3 ml-3">{showNav ? <i className="fa-solid fa-x fa-xl"></i> :<i className="fa-solid fa-bars fa-xl"></i>}</button>
            <div className="min-h-screen flex bg-white dark:bg-zinc-800">
                <div ref={navRef} className={`${showNav ? 'opacity-100 z-0 ease-in duration-150': 'opacity-0 -z-10 max-w-0 max-h-0'} flex-grow md:flex-grow-0 md:opacity-100 md:z-0 md:max-w-max md:max-h-max`}><Nav /></div>
                <div className={`flex-grow ${showNav ? 'hidden': 'block'} md:block p-7 bg-white dark:bg-zinc-800 rounded-lg mr-2`}>
                    { children }
                </div>
            </div>
        </div>
    );
};

export default Layout;