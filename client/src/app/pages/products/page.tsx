'use client';
import Layout from "@/components/Layout";
import { CardGrid } from "@/components/cardGrid";
import { Card } from "@/models/card";
import { SectionEnum } from "@/models/sectionEnum";
import { MutableRefObject, useEffect, useRef, useState } from "react";

interface FilterOptions {
    text: string,
    default?: boolean
}

interface FilterCheckboxes {
    text: string,
    default?: boolean
}

const Products: React.FC = () => {
    //State variables
    const[showOptions,setShowOptions] = useState(false);
    const menuBarRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

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

    const priceOptions: FilterOptions[] = [{text:'< Any price', default: true},{text:'0-500'},{text:'500-1000'},{text:'1000-5000'},{text:'Above 5000'}];

    const ratingOptions: FilterOptions[] = [{text:'< Any rating', default: true},{text:'1 & above'},{text:'2 & above'},{text:'3 & above'},{text:'4 & above'}];

    const attributeCheckboxes: FilterCheckboxes[] = [{text:'< Any Attribute', default: true},{text:'Attribute 1'},{text:'Attribute 2'},{text:'Attribute 3'},{text:'Attribute 4'}];

    const brandCheckboxes: FilterCheckboxes[] = [{text:'< Any Brand', default: true},{text:'Brand 1'},{text:'Brand 2'},{text:'Brand 3'},{text:'Brand 4'}];

    const items: Card[] = [
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350}
    ]
    
    return (
        <Layout>
            <title>Valhalla - Products</title>
            <div>
                <div id="products" className="flex flex-row pt-2 gap-x-2">
                    <div className="w-2/12 flex flex-col gap-y-4 max-lg:hidden">

                        <h3 className="text-base font-bold text-black dark:text-white underline">Sort by</h3>
                        <div className="flex flex-col">
                            <select className="dark:bg-slate-800 bg-slate-200 text-black dark:text-white rounded-md py-2 max-md:hidden ">
                                    <option value={'Price'}>Price</option>
                                    <option value={'Rating'}>Rating</option>
                            </select>
                            <label>
                                <input type="radio" value={'ASC'} />
                                <p className="text-black dark:text-white inline ml-2 text-sm">ASC</p>
                            </label>
                            <label>
                                <input type="radio" value={'DESC'} />
                                <p className="text-black dark:text-white inline ml-2 text-sm">DESC</p>
                            </label>
                        </div>

                        <h3 className="text-base font-bold text-black dark:text-white underline">Filter by</h3>
                        <h3 className="text-base font-bold text-black dark:text-white italic underline">Price</h3>
                        {priceOptions.map((option,index)=>{
                            return <div key={index}>
                                {option.default ? <button className="dark:text-white text-black w-fit text-sm md:hover:text-orange-500 max-md:active:text-orange-500 md:dark:hover:text-orange-400 max-md:dark:active:text-orange-400">{option.text}</button> :
                                    <label>
                                        <input type="radio" value={option.text} />
                                        <p className="text-black dark:text-white inline ml-2 text-sm">{option.text}</p>
                                    </label>
                                }
                            </div>
                        })}

                        <h3 className="text-base font-bold text-black dark:text-white italic underline">Attributes</h3>
                        {attributeCheckboxes.map((option,index)=>{
                            return <div key={index}>
                                {option.default ? <button className="dark:text-white text-black w-fit text-sm md:hover:text-orange-500 max-md:active:text-orange-500 md:dark:hover:text-orange-400 max-md:dark:active:text-orange-400">{option.text}</button> :
                                    <label>
                                        <input type="checkbox" value={option.text} />
                                        <p className="text-black dark:text-white inline ml-2 text-sm">{option.text}</p>
                                    </label>
                                }
                            </div>
                        })}
                        
                        <h3 className="text-base font-bold text-black dark:text-white italic underline">Brand</h3>
                        {brandCheckboxes.map((option,index)=>{
                            return <div key={index}>
                                {option.default ? <button className="dark:text-white text-black w-fit text-sm md:hover:text-orange-500 max-md:active:text-orange-500 md:dark:hover:text-orange-400 max-md:dark:active:text-orange-400">{option.text}</button> :
                                    <label>
                                        <input type="checkbox" value={option.text} />
                                        <p className="text-black dark:text-white inline ml-2 text-sm">{option.text}</p>
                                    </label>
                                }
                            </div>
                        })}
                        
                        <h3 className="text-base font-bold text-black dark:text-white italic underline">Rating (5 - highest)</h3>
                        {ratingOptions.map((option,index)=>{
                            return <div key={index}>
                                {option.default ? <button className="dark:text-white text-black w-fit text-sm md:hover:text-orange-500 max-md:active:text-orange-500 md:dark:hover:text-orange-400 max-md:dark:active:text-orange-400">{option.text}</button> :
                                    <label>
                                        <input type="radio" value={option.text} />
                                        <p className="text-black dark:text-white inline ml-2 text-sm">{option.text}</p>
                                    </label>
                                }
                            </div>
                        })}

                    </div>

                    <div className="lg:w-10/12 max-lg:w-full">
                        <div className="flex flex-row justify-between items-center gap-x-2">
                            <div className="mb-4">
                                <div className="h-1 w-24 bg-orange-400"></div>
                                <h2 className="text-xl text-black dark:text-white"><span><i className="fa-solid fa-layer-group text-orange-400"></i></span> CATEGORY</h2>
                            </div>
                            <div>
                                <div className="lg:hidden">
                                    <button title="Filter & Sort" className="text-black dark:text-white -z-30" onClick={(e)=>setShowOptions(!showOptions)}><i className="fa-solid fa-filter fa-xl"></i></button>
                                    <div className={`fixed z-30 pointer-events-auto inset-0 bg-neutral-800 opacity-20 dark:bg-gray-400 ${showOptions ? 'w-screen h-screen ease-in-out' : 'overflow-hidden w-0' } `}></div>
                                    <div ref={menuBarRef} className={`z-30 ${showOptions ? 'w-1/2 h-screen overflow-y-auto ease-in-out' : 'overflow-hidden w-0' } fixed transition-width duration-300 inset-0 rounded-md top-7 dark:bg-slate-800 bg-gray-100 text-black dark:text-white`}>
                                        <h2 className="text-lg font-bold p-2"><i className="fa-solid fa-bars-staggered mr-2"></i>Sort & Filter</h2>
                                        <div className="flex flex-col p-2">
                                            <select className="dark:bg-slate-600 bg-slate-200 text-black dark:text-white rounded-md py-2 max-md:hidden ">
                                                    <option value={'Price'}>Price</option>
                                                    <option value={'Rating'}>Rating</option>
                                            </select>
                                            <label>
                                                <input type="radio" value={'ASC'} />
                                                <p className="text-black dark:text-white inline ml-2 text-sm">ASC</p>
                                            </label>
                                            <label>
                                                <input type="radio" value={'DESC'} />
                                                <p className="text-black dark:text-white inline ml-2 text-sm">DESC</p>
                                            </label>
                                        </div>
                                        
                                        <p className="text-base ml-2 font-bold text-black dark:text-white underline">Price</p>
                                        {priceOptions.map((option,index)=>{
                                            return <div key={index} title={''} className={`md:dark:hover:bg-slate-600 max-md:dark:active:bg-slate-600 md:hover:bg-white max-md:active:bg-white text-base border-b ${showOptions ? 'opacity-100' : 'opacity-0'} transition-all duration-300 border-b-gray-400 font-bold p-2 w-full text-left `}>
                                            {option.default ? <button className="text-black dark:text-white inline ml-2 text-sm">{option.text}</button> :
                                            <label>
                                                <input type="radio" value={option.text} />
                                                <p className="text-black dark:text-white inline ml-2 text-sm">{option.text}</p>
                                            </label> 
                                            }   
                                        </div>
                                        })}

                                        <p className="text-base ml-2 mt-6 font-bold text-black dark:text-white underline">Attributes</p>
                                        {attributeCheckboxes.map((option,index)=>{
                                            return <div key={index} title={''} className={`md:dark:hover:bg-slate-600 max-dark:active:bg-slate-600 md:hover:bg-white max-md:active:bg-white text-base border-b ${showOptions ? 'opacity-100' : 'opacity-0'} transition-all duration-300 border-b-gray-400 font-bold p-2 w-full text-left `}>
                                            {option.default ? <button className="text-black dark:text-white inline ml-2 text-sm">{option.text}</button> :
                                            <label>
                                                <input type="checkbox" value={option.text} />
                                                <p className="text-black dark:text-white inline ml-2 text-sm">{option.text}</p>
                                            </label>
                                            }   
                                        </div>
                                        })}

                                        <p className="text-base ml-2 mt-6 font-bold text-black dark:text-white underline">Brand</p>
                                        {brandCheckboxes.map((option,index)=>{
                                            return <div key={index} title={''} className={`md:dark:hover:bg-slate-600 max-md:dark:active:bg-slate-600 md:hover:bg-white max-md:active:bg-white text-base border-b ${showOptions ? 'opacity-100' : 'opacity-0'} transition-all duration-300 border-b-gray-400 font-bold p-2 w-full text-left `}>
                                            {option.default ? <button className="text-black dark:text-white inline ml-2 text-sm">{option.text}</button> :
                                            <label>
                                                <input type="checkbox" value={option.text} />
                                                <p className="text-black dark:text-white inline ml-2 text-sm">{option.text}</p>
                                            </label>  
                                            } 
                                        </div>
                                        })}

                                        <p className="text-base ml-2 mt-6 font-bold text-black dark:text-white underline">Rating (5 - highest)</p> 
                                        {ratingOptions.map((option,index)=>{
                                            return <div key={index} title={''} className={`md:dark:hover:bg-slate-600 max-md:dark:active:bg-slate-600 md:hover:bg-white max-md:active:bg-white text-base border-b ${showOptions ? 'opacity-100' : 'opacity-0'} transition-all duration-300 border-b-gray-400 font-bold p-2 w-full text-left `}>
                                            {option.default ? <button className="text-black dark:text-white inline ml-2 text-sm">{option.text}</button> :
                                            <label>
                                                <input type="radio" value={option.text} />
                                                <p className="text-black dark:text-white inline ml-2 text-sm">{option.text}</p>
                                            </label>    
                                            }
                                        </div>
                                        })}
                                        <div className="mb-10"></div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CardGrid items={items} section={SectionEnum.PRODUCTS} paginate pageLength={12}/>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;