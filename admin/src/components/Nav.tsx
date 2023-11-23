'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import Modal from "./modal";
import { useState } from "react";

/**
 * Navigation Bar component
 */
const Nav: React.FC = () => {
    const inactiveLinkClass: string = 'flex flex-row items-center p-3 pr-24 text-base max-md:active:bg-orange-50 md:hover:bg-orange-50 md:dark:hover:bg-gray-600 max-md:dark:active:bg-gray-600';
    const activeLinkClass: string = (inactiveLinkClass + ' text-orange-600 dark:text-orange-400 bg-white dark:bg-zinc-800 rounded-l-md').replace('md:hover:bg-orange-50 max-md:active:bg-orange-50 md:dark:hover:bg-gray-600 max-md:dark:active:bg-gray-600','');
    const path: string = usePathname();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {data:session} = useSession();

    if (!session) {
        redirect('/pages/home');
    }
    
    return ( 
        <div className="flex mt-3 h-full md:mt-0 flex-col bg-gray-100 dark:bg-zinc-700 pl-5 py-3 gap-2 text-black dark:text-white">
            { isModalVisible ?
             <Modal callback={()=>{}} title="Logout Action" body="Are you sure you want to logout?" key={'Logout-Modal'}
             decision={ {
                yes: { text: 'Yep', callback: ()=>signOut({callbackUrl: '/pages/',redirect:false})},
                no: { text: 'Nope', callback: ()=>setIsModalVisible(false)}
             }}
             />
             : null}
            <div className="flex flex-row items-center mb-2">
                <i className="fa-solid fa-display dark:text-white"></i>
                <div className="ml-2 dark:text-white text-lg">VALHALLA ADMIN</div>
            </div>
            <Link href={'/pages/home'} className={path.includes('/home') ? activeLinkClass : inactiveLinkClass}>
                <i className="fa-solid fa-house-user mr-2"></i>
                Dashboard
            </Link>
            <Link href={'/pages/products'} className={path.includes('/products') ? activeLinkClass : inactiveLinkClass}>
                <i className="fa-solid fa-box-archive mr-2"></i>
                Products
            </Link>
            <Link href={'/pages/categories'} className={path.includes('/categories') ? activeLinkClass : inactiveLinkClass}>
                <i className="fa-solid fa-list-ul mr-2"></i>
                Categories
            </Link>
            <Link href={'/pages/orders'} className={path.includes('/orders') ? activeLinkClass : inactiveLinkClass}>
                <i className="fa-solid fa-bars-progress mr-2"></i>
                Orders
            </Link>
            <Link href={'/pages/settings'} className={path.includes('/settings') ? activeLinkClass : inactiveLinkClass}>
                <i className="fa-solid fa-gear mr-2"></i>
                Settings
            </Link>
            <button className="dark:text-white md:hover:bg-orange-50 max-md:active:bg-orange-50 md:dark:hover:bg-gray-600 max-md:dark:active:bg-gray-600 text-black p-3 pr-24 text-sm text-left" onClick={()=>
                setIsModalVisible(true)
            }>
                <i className="fa-solid fa-arrow-right-from-bracket mr-2 fa-lg"></i>
                Logout
            </button>
        </div>
    );
};

export default Nav;