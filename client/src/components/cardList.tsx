import { Card } from "@/models/card";
import "@/app/globals.css";
import Link from "next/link";
import { MutableRefObject, useEffect, useRef } from "react";
import { SectionEnum } from "@/models/sectionEnum";

interface CardListProps {
    items: Card[],
    section?: SectionEnum
}

/** Card List component */
export const CardList: React.FC<CardListProps> = ({items, section}) => {
    const cardListRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
    const buttonsRef1 = useRef<HTMLButtonElement>(null) as MutableRefObject<HTMLButtonElement>;
    const buttonsRef2 = useRef<HTMLButtonElement>(null) as MutableRefObject<HTMLButtonElement>;
    
    const scrollLeft = () => {
        if (cardListRef.current) {
          cardListRef.current.scrollBy({
            left: -262,
            behavior: 'smooth',
          });
        }
    };
    
    const scrollRight = () => {
        if (cardListRef.current) {
          cardListRef.current.scrollBy({
            left: 262,
            behavior: 'smooth',
          });
        }
    };

    useEffect(()=>{
        if( 'ontouchstart' in window || navigator.maxTouchPoints) {
            buttonsRef1.current.classList.remove('inline');
            buttonsRef1.current.classList.add('hidden');
            buttonsRef2.current.classList.remove('inline');
            buttonsRef2.current.classList.add('hidden');
            cardListRef.current.classList.add('pb-10');
        }
    },[]);

    return (
        <div className="relative justify-start bg-transparent rounded-md overflow-x-auto overflow-y-hidden">
            <div ref={cardListRef} className={`flex flex-row items-center pt-2 gap-x-3 overflow-x-auto card-list px-3 overflow-y-hidden`}>
                {items.map((item,index)=>{
                    return <div key={index} className="dark:bg-slate-800 bg-zinc-100 duration-500 dark:shadow-gray-400 shadow-md shadow-zinc-800 md:dark:hover:shadow-orange-400 max-md:dark:active:shadow-orange-400 md:dark:hover:shadow-md max-md:dark:active:shadow-md md:hover:shadow-md max-md:active:shadow-md md:hover:shadow-orange-600 max-md:active:shadow-orange-600 card z-0 w-64 mb-1 flex-shrink-0 rounded-md" >
                    <a href=""><img alt={item.title} className="h-2/3 w-full rounded-t-md dark:border-b-0 border-b border-b-gray-600" src={item.image}/></a>
                    <div className="px-2 flex flex-row items-center justify-between">
                        <h3 className="text-black dark:text-white text-base whitespace-nowrap text-ellipsis overflow-hidden">{item.title}</h3>
                    </div>
                    {section !== SectionEnum.NEW_ARRIVALS ?
                        <div className="flex flex-row items-start justify-start gap-x-2 px-2">
                            <button className="text-black dark:text-white">{item.oldPrice ? "Now: "+"$"+item.price : "$"+item.price}</button>
                            {item.oldPrice && <div className="line-through text-black dark:text-slate-300">Was: {"$"+item.oldPrice}</div>}
                        </div>
                    : <div className="flex flex-row gap-x-1">
                        <button className="text-black px-2 dark:text-white">{"$"+item.price}</button>
                        <button title="add to favorites" className="ml-2 sm:hidden text-orange-400 md:dark:hover:text-gray-200 max-md:dark:active:text-gray-200"><i className="fa-solid fa-heart fa-lg"></i></button>
                        <button title="add to cart" className="ml-2 sm:hidden"><i className="fa-solid fa-plus fa-lg text-orange-400 md:dark:hover:text-gray-200 max-md:dark:active:text-gray-200 md:hover:text-orange-300 max-md:active:text-orange-300"></i></button>
                    </div>
                    }
                    <button title="add to favorites" className="ml-2 max-sm:hidden text-orange-400 md:dark:hover:text-gray-200 max-md:dark:active:text-gray-200"><i className="fa-solid fa-heart fa-lg"></i></button>
                    <button title="add to cart" className="ml-2 max-sm:hidden"><i className="fa-solid fa-plus fa-lg text-orange-400 md:dark:hover:text-gray-200 max-md:dark:active:text-gray-200 md:hover:text-orange-300 max-md:active:text-orange-300"></i></button>
                </div>
                })}
            </div>
            <button ref={buttonsRef1} onClick={scrollLeft} className="z-10 sticky bottom-1/2 px-2 py-1 inline rounded-md text-3xl bg-orange-500 md:hover:bg-orange-400 max-md:active:bg-orange-400 text-white">{`<`}</button>
            <button ref={buttonsRef2} onClick={scrollRight} className="z-10 sticky bottom-1/2 px-2 py-1 left-full inline rounded-md text-3xl bg-orange-500 md:hover:bg-orange-400 max-md:active:bg-orange-400 text-white">{`>`}</button>
        </div>
    );
}