'use client'

import Layout from "@/components/Layout";
import { Collapse } from "@/components/collapse";
import { useState } from "react";

const Checkout: React.FC = () => {

    const [tabs,setTabs] = useState([
        <Cart />,
        <Shipping />,
        <Payment />
    ]);

    const [currentTab,setCurrentTab] = useState(0);
    const [cartComplete,setCartComplete] = useState(false);
    const [shippingComplete,setShippingComplete] = useState(false);

    return (
        <Layout>
            <title>Valhalla - Checkout</title>
            <div className="pt-2">
                <div className="mb-4">
                    <div className="h-1 w-24 bg-orange-400"></div>
                    <h2 className="text-xl text-black dark:text-white"><span><i className="fa-solid fa-layer-group text-orange-400"></i></span> CHECKOUT</h2>
                </div>
                <div className="flex flex-row gap-x-4 max-lg:flex-col">
                        <div className="flex flex-col w-2/3 max-lg:w-full max-lg:mb-4">
                            <div className="flex flex-row w-full max-lg:hidden !gap-x-0 border mb-8 border-black">
                                <button onClick={(e)=>{
                                    setCartComplete(false);
                                    setShippingComplete(false);
                                    setCurrentTab(0)
                                    }} className="flex flex-row w-1/3">
                                    <div style={{width:'91%'}} className={` ${currentTab === 0 ? 'bg-orange-500 border-l-orange-500' : 'bg-white dark:bg-slate-800 border-l-white dark:border-l-slate-800' } relative h-12 gap-x-2 flex flex-row items-center justify-center`}>
                                        <div style={{borderTop:'24px solid transparent',borderBottom:'24px solid transparent', borderLeft:'24px solid'}} className="w-0 h-0 !border-l-inherit absolute -right-6"></div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.2" stroke="currentColor" style={{width:'74px'}} className={`-rotate-90 duration-500 text-zinc-800 -right-12 absolute dark:text-white`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                        <div className=" flex flex-row gap-x-2">
                                            <div style={{borderRadius: '50%'}} className={`w-5 h-5 ${cartComplete ? 'bg-orange-500 border-1' : 'bg-transparent border-2'} flex flex-row items-center justify-center ${currentTab === 0 ? 'border-white' : 'border-gray-500 dark:border-white'} `}>
                                                {cartComplete ? <i className="fa-solid fa-check fa-2xs text-white"></i> : null}
                                            </div>
                                            <p className={`${currentTab === 0 ? 'text-white font-bold' : 'text-gray-500 dark:text-white'}`}>CART</p>
                                        </div>
                                    </div>
                                </button>
                                <div className="flex flex-row w-1/3">
                                    <button disabled={!cartComplete} onClick={(e)=>{
                                        setShippingComplete(false);
                                        setCurrentTab(1)
                                        }} style={{width:'91%'}} className={`${currentTab === 1 ? 'bg-orange-500 border-b-orange-500 border-l-orange-500' : 'bg-white border-b-white dark:bg-slate-800 dark:border-b-slate-800 border-l-white dark:border-l-slate-800'} relative w-full h-12 gap-x-2 flex flex-row items-center justify-center`}>
                                        <div style={{borderWidth: '0px 24px 24px 0px', borderColor: 'transparent'}} className="w-0 h-0 -mt-6 rotate-180 !border-b-inherit absolute -left-6"></div>
                                        <div style={{borderWidth: '0 0 24px 24px', borderColor: 'transparent'}} className="w-0 h-0 -mb-6 !border-b-inherit absolute -left-6"></div>
                                        <div style={{borderTop:'24px solid transparent',borderBottom:'24px solid transparent', borderLeft:'24px solid'}} className="w-0 h-0 !border-l-inherit dark:!border-l-inherit absolute -right-6"></div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.2" stroke="currentColor" style={{width:'74px'}} className={`-rotate-90 duration-500 text-zinc-800 -right-12 absolute dark:text-white`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                        <div className=" flex flex-row gap-x-2">
                                            <div style={{borderRadius: '50%'}} className={`w-5 h-5 ${shippingComplete ? 'bg-orange-500 border-1' : 'bg-transparent border-2'} flex flex-row items-center justify-center ${currentTab === 1 ? 'border-white' : 'border-gray-500 dark:border-white'}`}>
                                                {shippingComplete ? <i className="fa-solid fa-check fa-2xs text-white"></i> : null}
                                            </div>
                                            <p className={`${currentTab === 1 ? 'text-white font-bold' : 'text-gray-500 dark:text-white'}`}>SHIPPING</p>
                                        </div>
                                    </button>
                                </div>
                                <div className="flex flex-row w-1/3">
                                    <button disabled={!shippingComplete} onClick={(e)=>setCurrentTab(2)}  className={`${currentTab === 2 ? 'bg-orange-500 border-b-orange-500' : 'bg-white border-b-white dark:bg-slate-800 dark:border-b-slate-800'} relative w-full h-12 gap-x-2 flex flex-row items-center justify-center`}>
                                        <div style={{borderWidth: '0px 24px 24px 0px', borderColor: 'transparent'}} className="w-0 h-0 -mt-6 rotate-180 !border-b-inherit absolute -left-6"></div>
                                        <div style={{borderWidth: '0 0 24px 24px', borderColor: 'transparent'}} className="w-0 h-0 -mb-6 !border-b-inherit absolute -left-6"></div>
                                        <div className=" flex flex-row gap-x-2">
                                            <div style={{borderRadius: '50%'}} className={`w-5 h-5 border-2 ${currentTab === 2 ? 'border-white' : 'border-gray-500 dark:border-white'}`}></div>
                                            <p className={`${currentTab === 2 ? 'text-white font-bold' : 'text-gray-500 dark:text-white'}`}>PAYMENT</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-row gap-x-2 lg:hidden checkout-navigation">
                                <div className="flex flex-row mr-3 gap-x-2">
                                    <button onClick={(e)=>{
                                        setCartComplete(false);
                                        setShippingComplete(false);
                                        setCurrentTab(0);
                                    }} className={`bg-transparent mb-4 text-base font-bold ${currentTab === 0 ? '!text-orange-500 underline' : 'text-gray-500 dark:text-white'} ${cartComplete === true ? '!text-orange-500' : 'text-gray-500 dark:text-white'}`}>
                                        CART
                                    </button>
                                    <p className={`${currentTab===0 ? 'text-orange-500' : 'text-gray-500 dark:text-gray-200'}`}>{'>'}</p>
                                </div>
                                
                                <div className="flex flex-row mr-3 gap-x-2">
                                    <button disabled={!cartComplete} onClick={(e)=>{
                                        setShippingComplete(false);
                                        setCurrentTab(1);
                                    }} className={`bg-transparent mb-4 text-base font-bold ${currentTab === 1 ? '!text-orange-500 underline' : 'text-gray-500 dark:text-white'} ${shippingComplete === true ? '!text-orange-500' : 'text-gray-500 dark:text-white'}`}>
                                        SHIPPING
                                    </button>
                                    <p className={`${currentTab===1 ? 'text-orange-500' : 'text-gray-500 dark:text-gray-200'}`}>{'>'}</p>
                                </div>

                                <div className="flex flex-row mr-3 gap-x-2">
                                    <button disabled={!shippingComplete} onClick={(e)=>{
                                        setCurrentTab(2);
                                        }} className={`bg-transparent mb-4 font-bold text-base ${currentTab === 2 ? 'text-orange-500 underline' : 'text-gray-500 dark:text-white'}`}>
                                        PAYMENT
                                    </button>
                                    <p className={`${currentTab===2 ? 'text-orange-500' : 'text-gray-500 dark:text-gray-200'}`}>{'>'}</p>
                                </div>
                            </div>

                            {tabs[currentTab]}

                        </div>
                    <div className="w-1/3 max-lg:w-full max-lg:order-2">
                        <Collapse title="PROMO CODE" className="bg-white dark:bg-transparent">
                            <div className="w-full">
                                <input type="text" id="promo-code" name="promo-code" placeholder="Enter Promo Code" className="px-2 outline-0 w-full shadow-md shadow-zinc-600 dark:shadow-none rounded-md h-10 ring-1 dark:bg-neutral-700 dark:text-white ring-orange-400 outline-orange-400 focus:ring-2" />
                                <button className="text-white w-full p-2 mt-4 bg-orange-500 hover:bg-orange-400">Apply Code</button>
                            </div>
                        </Collapse>
                        <div className="bg-white dark:bg-transparent shadow-sm rounded-md shadow-zinc-700 dark:shadow-gray-200 p-4">
                            <h4 className="text-base text-black font-bold dark:text-white mb-4">ORDER SUMMARY</h4>
                            <div className="flex flex-row justify-between items-center mb-2">
                                <p className="text-zinc-700 dark:text-gray-300 text-sm">Subtotal:</p>
                                <p className="text-base text-black dark:text-white font-bold">$0.00</p>
                            </div>
                            <div className="flex flex-row justify-between items-center mb-2">
                                <p className="text-zinc-700 dark:text-gray-300 text-sm">Discount:</p>
                                <p className="text-base text-black dark:text-white font-bold">-$0.00</p>
                            </div>
                            <div className="flex flex-row justify-between items-center mb-2">
                                <p className="text-zinc-700 dark:text-gray-300 text-sm">Shipping:</p>
                                <p className="text-base text-black dark:text-white font-bold">{currentTab >= 1 ? 'FREE' : 'Calculating...'}</p>
                            </div>
                            <hr className="border-b border-b-gray-400"/>
                            <div className="flex flex-row justify-between items-center my-4">
                                <p className="text-lg font-bold text-black dark:text-white">Estimated Total</p>
                                <p className="text-lg font-bold text-black dark:text-white">$0.00</p>
                            </div>
                            <hr className="border-b border-b-gray-400 mb-4"/>
                            <button onClick={(e)=>{
                                if(currentTab === 0) {
                                    setCartComplete(true);
                                    setCurrentTab(1);
                                } else if (currentTab === 1) {
                                    setShippingComplete(true);
                                    setCurrentTab(2);
                                }
                                window.scrollTo(0,0);
                            }} className="text-white w-full p-2 mt-4 bg-orange-500 md:hover:bg-orange-400 max-md:active:bg-orange-400">
                                {currentTab === 0 ? 'Checkout' : currentTab === 1 ? 'Make Payment' :  'Review your order' }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

interface CartProps {
    final?: boolean
}

const Cart: React.FC<CartProps> = ({final=false}) => {
    return (
    <div className="flex flex-col">
        <div className="bg-white dark:bg-transparent shadow-sm rounded-md shadow-zinc-700 dark:shadow-gray-200 p-4">
            <h3 className="text-base text-black dark:text-white mb-4">CART (1)</h3>
            <hr className="border-b border-b-gray-400 mb-4"/>
            <div className="flex flex-row gap-x-4">
                <div className="max-lg:!w-20 max-lg:!h-20" style={{width:'120px', height:'120px'}}><img className={`w-full h-full`} src="/test.jpg" /></div>
                <div>
                    <h3 className="text-base text-black dark:text-white">Product Name</h3>
                    {!final ? <p className="text-sm text-gray-700 dark:text-gray-300">In Stock</p> : null }
                    <p className="text-lg text-gray-700 dark:text-gray-300 font-bold">Ksh 12,999</p>
                    {final ? <p className="text-gray-700 dark:text-gray-300 text-base">Qty: 1</p> : null}
                </div>
            </div>
            {!final ? <div className="flex flex-row justify-between items-center mt-2 cart-controls">
                <button className="text-white text-sm bg-orange-500 p-2 rounded-md md:hover:bg-orange-400 max-md:active:bg-orange-400"><i className="fa-regular fa-trash-can"></i> REMOVE
                </button>
                <div className="flex flex-row items-center">
                    <button className="bg-orange-500 text-white text-2xl px-2 shadow-sm shadow-zinc-700 rounded-md md:hover:bg-orange-400 max-md:active:bg-orange-400"> -</button>
                    <div className="w-10 text-center text-black dark:text-white">1</div>
                    <button className="bg-orange-500 text-white text-2xl px-2 shadow-sm shadow-zinc-700 rounded-md md:hover:bg-orange-400 max-md:active:bg-orange-400"> +</button>
                </div>
            </div> : null}
        </div>
    </div>
    );
};

interface shippingOption {
    text: string,
    price: string | number
}

const Shipping: React.FC = () => {

    const shippingOptions: shippingOption[] = [
        {text: 'Standard Shipping - 3 Business Days', price: 'FREE'},
        {text: 'Express Dellivery - 1 to 2 Business Days', price: 'Ksh 500'}
    ]

    return (
        <>
        <div className="flex flex-col bg-white dark:bg-transparent shadow-sm rounded-md shadow-zinc-700 dark:shadow-gray-200 p-4">
            <h3 className="text-base text-black dark:text-white mb-4">SHIPPING SOON</h3>
            <hr className="border-b border-b-gray-400 mb-4"/>
            <div className="flex flex-row gap-x-4 mb-2">
                <div className="max-lg:!w-20 max-lg:!h-20" style={{width:'120px', height:'120px'}}><img className="w-full h-full" src="/test.jpg" /></div>
                <div>
                    <h3 className="text-xl text-black dark:text-white">Product Name</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-base">Qty: 1</p>
                </div>
            </div>
            <div className="flex flex-col mt-4" >
                {shippingOptions.map((option,index)=>{
                    return <label key={index} className="flex flex-row items-center mb-4">
                    <input type="radio" value={option.text} className="w-5 h-5" />
                    <p className="text-black dark:text-white inline ml-2 text-base">{option.text}<span className="font-bold ml-2 text-sm text-black dark:text-white">{option.price}</span></p>
                </label> 
                })}
            </div>
            <div className="text-zinc-700 dark:text-gray-300 italic text-base mt-4">
                *Orders will not be shipping on Saturdays, Sundays or During Holidays. Some shipments may take longer to reach
                you depending on the location. Kindly contact us through our communication channels for any shipping enquiries
                or questions.
            </div>

            <h3 className="text-base text-black dark:text-white mt-8 mb-4 font-bold">Shipping Information</h3>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                <div className="w-full">
                    <label htmlFor="country" className="block text-black dark:text-white">Country/Region*</label>
                    <input type="text" id="country" name="country" placeholder="Select Country" className="px-2 outline-0 w-full rounded-md h-10 ring-1 dark:bg-neutral-700 dark:text-white ring-orange-400 outline-orange-400 focus:ring-2" />
                </div>
                <div className="w-full">
                    <label htmlFor="phone" className="block text-black dark:text-white">First Name*</label>
                    <input type="tel" id="phone" name="phone" placeholder="First Name..." className="px-2 outline-0 w-full rounded-md h-10 ring-1 dark:bg-neutral-700 dark:text-white ring-orange-400 outline-orange-400 focus:ring-2" />
                </div>
                <div className="w-full">
                    <label htmlFor="phone" className="block text-black dark:text-white">Last Name*</label>
                    <input type="tel" id="phone" name="phone" placeholder="Last Name..." className="px-2 outline-0 w-full rounded-md h-10 ring-1 dark:bg-neutral-700 dark:text-white ring-orange-400 outline-orange-400 focus:ring-2" />
                </div>
            </div>

            <h3 className="text-base text-black dark:text-white mt-8 mb-4 font-bold">Contact Information</h3>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                <div className="w-full">
                        <label htmlFor="phone" className="block text-black dark:text-white">Phone Number*</label>
                        <input type="tel" id="phone" name="phone" placeholder="0712-345-678" className="px-2 outline-0 w-full rounded-md h-10 ring-1 dark:bg-neutral-700 dark:text-white ring-orange-400 outline-orange-400 focus:ring-2" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" />
                </div>
                <div className="w-full">
                    <label htmlFor="email" className="block text-black dark:text-white">Email Address*</label>
                    <input type="email" id="email" name="email" placeholder="Email..." className="px-2 outline-0 w-full rounded-md h-10 ring-1 dark:bg-neutral-700 dark:text-white ring-orange-400 outline-orange-400 focus:ring-2" />
                </div>
            </div>
        </div>
        </>
    );
};

const Payment: React.FC = () => {
    return (
        <>
                    <div className="flex flex-col bg-white dark:bg-transparent shadow-sm rounded-md shadow-zinc-700 dark:shadow-gray-200 p-4">
                        <h3 className="text-base text-black dark:text-white mb-4">PAYMENT DETAILS</h3>
                        <hr className="border-b border-b-gray-400 mb-4"/>
                        <div>
                            <label className="flex flex-row items-center mb-4">
                                <input type="radio" value={'Card'} className="w-5 h-5" />
                                <p className="text-black dark:text-white inline ml-2 text-base">Pay With Card</p>
                            </label>
                            <label className="flex flex-row items-center mb-4">
                                <input type="radio" value={'Card'} className="w-5 h-5" />
                                <p className="text-black dark:text-white inline ml-2 text-base">Pay With M-PESA</p>
                            </label>
                        </div>
                    </div>
        </>
    );
};

export default Checkout;