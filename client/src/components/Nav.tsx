'use client'
import { MutableRefObject, Ref, useEffect, useRef, useState } from "react";
import Logo from "./logo";
import { FrontendServices } from "@/lib/inversify.config";
import { HttpService } from "@/services/httpService";
import { Category } from "@/models/categories";
import { HttpServiceResponse } from "@/models/httpServiceResponse";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

enum AppTheme {
    DARK = 'dark',
    LIGHT = 'light',
}

interface MenuBarOptions {
    text: string,
    icon?: string,
    callback: Function
}

const Nav: React.FC = () => {

    //Services
    const http = FrontendServices.get<HttpService>('HttpService');
    const router = useRouter();
    
    //State variables
    const [categories,setCategories] = useState<Category[]>([]);
    const [loading,setLoading] = useState(false);
    const [appTheme, setAppTheme] = useState<AppTheme | null>();
    const[showOptions,setShowOptions] = useState(false);
    const menuBarRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

    const menuBarOptions: MenuBarOptions[] = [
        {text:'Favorites',icon:'fa-solid fa-heart',callback:()=>{router.push('pages/favorites')}},
        {text:appTheme === AppTheme.DARK ? 'Toggle light mode' : 'Toggle dark mode',icon:appTheme === AppTheme.DARK ? 'fa-solid fa-sun': 'fa-solid fa-moon',callback:()=>{appTheme === AppTheme.DARK ? setLightTheme() : setDarkTheme();}},
        {text:'Use Device Theme',icon:'fa-solid fa-circle-half-stroke',callback:()=>{useDevice();}},
        {text:'Cart',icon:'fa-solid fa-cart-arrow-down',callback:()=>{router.push('/pages/checkout')}}
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
    
          if (menuBarRef && showOptions && !menuBarRef.current.contains(event.target as Node)) {
            setShowOptions(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [showOptions]);

    const setDarkTheme = () => {
        if (!document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme',AppTheme.DARK);
            setAppTheme(AppTheme.DARK);
        }
    }

    const setLightTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme',AppTheme.LIGHT);
            setAppTheme(AppTheme.LIGHT);
        }
    }

    const useDevice = () => {
        localStorage.removeItem('theme');
        const systemThemeDark = window.matchMedia('(prefers-color-scheme: dark)');
        if (systemThemeDark.matches) {
            document.documentElement.classList.add('dark');
            setAppTheme(AppTheme.DARK);
        } else {
            document.documentElement.classList.remove('dark');
            setAppTheme(AppTheme.LIGHT);
        }
    }

    useEffect(()=>{
        if (typeof window !== 'undefined') {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
                setAppTheme(AppTheme.DARK);
            } else {
                document.documentElement.classList.remove('dark');
                setAppTheme(AppTheme.LIGHT);
            }
        }
        fetchData();
    },[]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleMediaChange = () => {
            if (!('theme' in localStorage)) {
                if(mediaQuery.matches) {
                    document.documentElement.classList.add('dark');
                    setAppTheme(AppTheme.DARK);
                } else {
                    document.documentElement.classList.remove('dark');
                    setAppTheme(AppTheme.LIGHT)
                }
            }
        };
        mediaQuery.addEventListener('change', handleMediaChange);
        return () => {
          mediaQuery.removeEventListener('change', handleMediaChange);
        };
      }, []);
    

    const fetchData = async() => {
        const response: HttpServiceResponse<Category[]> = await http.get(`${process.env.NEXT_PUBLIC_VALHALLA_URL}/api/categories/fetch`);

        if (response.status >= 200 && response.status<=299 && response.data) {
            setCategories([...response.data]);
            setLoading(false);
        } else {
            
        }
    };

    const { data: session , status } = useSession();
    
    if (status === 'loading') {
      return (
        <Loading />
      );
    }

    if (!session) {
        menuBarOptions.unshift(
            {text:'Login',icon:'fa-solid fa-right-to-bracket',callback:()=>{router.push('/pages/auth/login')}}
        );
    } else {
        menuBarOptions.unshift(
            {text:'Profile', icon: 'fa-solid fa-user',callback: ()=>{router.push('/pages/user')}}
        )
    }

    if(loading) {
        return <Loading />;
    }
    
    return (
        <>
            <div id="Nav" className="fixed lg:left-5 lg:right-5 left-4 right-4 max-sm:left-3 max-sm:right-3 top-0 pt-2 z-20 max-sm:pb-4 bg-gray-100 dark:bg-zinc-900 border-b-2 border-orange-500">
                <div className="pb-2 max-sm:hidden flex flex-row justify-between">
                        <div>
                            <div className="sm:inline-block dark:text-gray-200 text-black">
                                <i className="fa-solid fa-location-dot inline"></i>
                                <div className="pl-1 text-sm inline break-words">{process.env.NEXT_PUBLIC_STORE_LOCATION}</div>
                                <div className="px-4 dark:text-white text-black inline">|</div>
                            </div>
                            <div className="inline-block dark:text-gray-200 text-black">
                                <i className="fa-regular fa-envelope inline"></i>
                                <div className="pl-1 text-sm inline break-words">{process.env.NEXT_PUBLIC_VALHALLA_EMAIL}</div>
                                <div className="px-4 dark:text-white text-black inline">|</div>
                            </div>
                            <div className="inline-block dark:text-gray-200 text-black">
                                <i className="fa-solid fa-mobile-screen inline break-words"></i>
                                <div className="pl-1 text-sm inline">{process.env.NEXT_PUBLIC_STORE_PHONE_CONTACT}</div>
                            </div>
                        </div>
                        <div className="flex-row hidden gap-x-2 md:flex">
                            <button className="dark:text-gray-200 text-black" onClick={(e)=>useDevice()} >{<i title="Use Device Theme" className="fa-solid fa-circle-half-stroke fa-lg"></i>}</button>
                            <button className={`dark:text-gray-200 text-black ${appTheme === AppTheme.DARK && 'hidden'}`} onClick={(e)=>setDarkTheme()}>{<i title="Toggle Dark Mode" className="fa-regular fa-moon fa-lg"></i>}</button>
                            <button className={`dark:text-gray-200 text-black ${appTheme === AppTheme.LIGHT && 'hidden'}`} onClick={(e)=>setLightTheme()}>{<i title="Toggle Light Mode" className="fa-regular fa-sun fa-lg"></i>}</button>
                        </div>

                </div>
                <div className="flex border-t-2 pt-2 pb-2 border-orange-500 justify-between items-center flex-row text-black dark:text-white">
                    <div className="flex flex-row justify-between items-center">
                        <Link href={'/'}>
                            <Logo height={50} width={50}/>
                        </Link>
                        <p className="text-xl dark:text-orange-400 ml-2 title">Valhalla Electronics</p>
                    </div>
                    <SearchBar categories={categories} className="hidden search-1"/>
                    <div className="flex items-center justify-center gap-x-4">
                            <div className={`z-30`}>
                                <div className="md:hidden">
                                    <button title="menu bar" onClick={(e)=>setShowOptions(true)}><i className="fa-solid fa-bars fa-xl"></i></button>
                                    <div className={`fixed pointer-events-auto inset-0 bg-neutral-800 opacity-20 dark:bg-gray-400 -z-10 ${showOptions ? 'w-screen h-screen ease-in-out' : 'overflow-hidden w-0' } `}></div>
                                    <div ref={menuBarRef} className={`${showOptions ? 'w-full h-screen ease-in-out' : 'overflow-hidden w-0' } fixed transition-width duration-300 inset-0 rounded-md top-0 dark:bg-slate-800 bg-gray-100 text-black dark:text-white`}>
                                        <div className="flex flex-row justify-between">
                                            <h2 className="text-lg font-bold p-2"><i className="fa-solid fa-bars-staggered mr-2"></i>Quick menu</h2>
                                            <button onClick={(e)=>{setShowOptions(false)}} className="mr-5" title="Close Menu">
                                                <i className="fa-solid fa-x fa-xl text-black dark:text-white"></i>
                                            </button>
                                        </div>
                                        {menuBarOptions.map((option)=>{
                                            return <button onClick={(e)=>{
                                                option.callback();
                                                setShowOptions(false);
                                            }} title={option.text} className={`md:dark:hover:bg-slate-600 max-md:dark:active:bg-slate-600 md:hover:bg-white max-md:active:bg-white text-base border-b ${showOptions ? 'opacity-100' : 'opacity-0'} transition-all duration-300 border-b-gray-400 font-bold p-4 w-full text-left `} key={option.text}>
                                                <i className={`${option.icon} mr-2`}></i>
                                                {option.text}
                                            </button>
                                        })}
                                    </div>
                                </div>
                            </div>
                            {!session ? <button onClick={(e)=>router.push('/pages/auth/login')} className="max-md:hidden bg-orange-500 md:hover:bg-orange-400 max-md:active:bg-orange-400 py-1 px-2 rounded-md text-white">Log in</button> :
                             <button title="user" onClick={(e)=>router.push('/pages/user')} className="max-md:hidden">
                                <i className="fa-solid fa-user fa-xl md:dark:hover:text-gray-200 max-md:dark:active:text-gray-200 md:hover:text-gray-500 max-md:active:text-gray-500 text-orange-400"></i>
                             </button> }
                            <button onClick={(e)=>router.push('/pages/favorites')} title="favorites" className="max-md:hidden"><i className="fa-solid fa-heart fa-xl md:dark:hover:text-gray-200 max-md:dark:active:text-gray-200 md:hover:text-gray-500 max-md:active:text-gray-500 text-orange-400"></i></button>
                            <button onClick={(e)=>router.push('/pages/checkout')} title="cart" className="relative">
                                <i className="fa-solid fa-cart-arrow-down fa-xl"></i>
                                <div className="absolute pl-1 -top-5 text-black dark:text-white w-full text-center">0</div>
                            </button>
                            <select title="Currencies" className="dark:bg-slate-800 bg-slate-200 text-black dark:text-white p-2 rounded-md max-md:hidden ">
                                <option value={'Ksh'}>Ksh</option>
                                <option value={'GBP'}>GBP</option>
                                <option value={'USD'}>USD</option>
                            </select>
                    </div>
                </div>
                <SearchBar categories={categories} className="hidden search-2 max-sm:inline max-sm:w-full items-center justify-center mb-4"/>
            </div>
        </> 
    );
};

interface searchProps {
    categories: Category[]
    className?: string
}

const SearchBar: React.FC<searchProps> = ({categories, className})=>{
    return (
        <div className={`${className}`}>
                <div className={`flex flex-row items-center h-11 w-full shadow-md shadow-zinc-600 dark:shadow-none focus-within:dark:shadow-sm focus-within:dark:shadow-orange-400  focus-within:shadow-orange-700 rounded-md`}>
                    <input type="search" placeholder="Search..." className={`search-bar h-full w-1/2 max-sm:w-10/12 rounded-s-md pl-4 dark:text-white dark:bg-slate-800 text-black outline-none`} />
                    <select title="Categories" className={`max-sm:hidden h-full text-black w-1/2 dark:text-white dark:bg-slate-800 text-sm py-2 px-4 outline-none`}>
                        <option value={'All categories'}>All categories</option>
                        {categories.map((category)=>{
                                return <option key={category._id} value={category.name}>{category.name}</option>
                        })}
                    </select>
                    <button className="max-sm:w-2/12 custom-search-icon h-full px-3 bg-orange-500 md:hover:bg-orange-400 max-md:active:bg-orange-400 text-white rounded-e-md" title="search" onClick={(e)=>{}}>
                        <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                    </button>
                </div>
        </div>
    );
}

export default Nav;