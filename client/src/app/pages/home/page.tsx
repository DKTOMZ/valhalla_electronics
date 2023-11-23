'use client'

import Layout from "@/components/Layout";
import { CardGrid } from "@/components/cardGrid";
import { CardList } from "@/components/cardList";
import CarouselSlider from "@/components/carousel";
import { Card } from "@/models/card";
import { CarouselImage } from "@/models/carouselImage";
import { SectionEnum } from "@/models/sectionEnum";

const AppHome: React.FC = ()=>{

    const images: CarouselImage[] = [
        {source:'/test.jpg', description:'Playstation 5', label:'Sony PS5'},
        {source:'/test2.png', description:'Adidas 23/24 ball', label:'Adidas ball'}
    ]

    const items: Card[] = [
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product fgukfgydfth", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
        {image: '/test.jpg',description:"Product description", price:200, title:"Sample Product", oldPrice:350},
    ]

    const categories: Card[] = [
        {image:'/laptops.jpg', title:'Laptops'},
        {image:'/PCs.jpg', title:'PCs'},
        {image:'/gameconsoles.jpg', title:'Consoles'},
        {image:'/cameras.jpg', title:'Cameras'},
        {image:'/phones.jpeg', title:'Phones'},
        {image:'/storage.jpg', title:'Storage'},
        {image:'/audio.jpg', title:'Audio'},
        {image:'/powerbanks.jpg', title:'Powerbanks'}
    ];

    return <Layout>
        <title>Valhalla - Electronics</title>

        <section id="featured">
            <div className="mb-4 pt-2">
                <div className="h-1 w-24 bg-orange-400"></div>
                <h2 className="text-xl text-black dark:text-white"><span><i className="fa-solid fa-bolt text-orange-400"></i></span> FEATURED</h2>
            </div>
            <CarouselSlider images={images}/>
        </section>

        <section id="flash-sales">
            <div className="mb-4">
                <div className="h-1 w-24 bg-orange-400"></div>
                <h2 className="text-xl text-black dark:text-white"><span><i className="fa-solid fa-wand-sparkles text-orange-400"></i></span> FLASH SALES
                    <a href="" className="text-orange-500 dark:text-orange-400 md:dark:hover:text-orange-300 max-md:dark:active:text-orange-300 md:hover:text-orange-400 max-md:active:text-orange-400 ml-2 underline text-sm">See more</a>
                </h2>
            </div>
            <CardGrid items={items} section={SectionEnum.FLASH_SALES}/>
        </section>

        <section id="new-arrivals" className="mt-8">
            <div className="mb-4">
                <div className="h-1 w-24 bg-orange-400"></div>
                <h2 className="text-xl text-black dark:text-white"><span><i className="fa-regular fa-circle-check text-orange-400"></i></span> NEW ARRIVALS
                    <a href="" className="text-orange-500 dark:text-orange-400 md:dark:hover:text-orange-300 max-md:dark:active:text-orange-300 max-md:active:text-orange-400 md:hover:text-orange-400 ml-2 underline text-sm">See more</a>
                </h2>
            </div>
            <CardList items={items} section={SectionEnum.NEW_ARRIVALS}/>
        </section>

        <section id="categories">
            <div className="mb-4">
                <div className="h-1 w-24 bg-orange-400"></div>
                <h2 className="text-xl text-black dark:text-white"><span><i className="fa-solid fa-layer-group text-orange-400"></i></span> CATEGORIES
                    <a href="" className="text-orange-500 dark:text-orange-400 md:dark:hover:text-orange-300 max-md:dark:active:text-orange-300 md:hover:text-orange-400 max-md:active:text-orange-400 ml-2 underline text-sm">See more</a>
                </h2>
            </div>
            <CardGrid items={categories} section={SectionEnum.CATEGORIES} />
        </section>

        <section id="best-selling">
            <div className="mb-4">
                <div className="h-1 w-24 bg-orange-400"></div>
                <h2 className="text-xl text-black dark:text-white"><span><i className="fa-solid fa-fire-flame-curved text-orange-400"></i></span> BEST SELLING
                    <a href="/pages/products" className="text-orange-500 dark:text-orange-400 md:dark:hover:text-orange-300 max-md:dark:active:text-orange-300 md:hover:text-orange-400 max-md:active:text-orange-400 ml-2 underline text-sm">See more</a>
                </h2>
            </div>
            <CardList items={items} section={SectionEnum.NEW_ARRIVALS}/>
        </section>

    </Layout>
};

export default AppHome;