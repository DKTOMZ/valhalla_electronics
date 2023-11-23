'use client';
import Layout from "@/components/Layout";


const Product: React.FC = () => {
    return <Layout>
        <title>Valhalla - Products</title>
        <div className="mt-8">
            <div className="mb-4">
                <div className="h-1 w-24 bg-orange-400"></div>
                <h2 className="text-xl text-black dark:text-white"><span><i className="fa-solid fa-layer-group text-orange-400"></i></span> PRODUCT</h2>
            </div>
            <div className="flex flex-row gap-x-2">
                <div className="flex flex-col w-full gap-y-4">
                    <div className="flex flex-row gap-x-6 max-md:flex-col items-start dark:bg-transparent bg-white shadow-zinc-700 dark:shadow-slate-300 shadow-sm rounded-md p-4">
                        <div className="max-md:!h-auto product-image-1 max-md:!w-auto max-md:mb-4" style={{height:'350px', width:'600px'}}><img src="/test.jpg" className="h-full w-full"/></div>
                        <div className="w-full">
                            <h2 className="text-2xl text-black dark:text-white">Product Name</h2>
                            <p className="text-base text-black dark:text-white border-b-2 border-b-gray-300 w-full">Brand : My brand name</p>
                            <div className="flex product-price flex-row items-center gap-x-2 mt-2">
                                <p className="font-bold text-xl text-black dark:text-white">Ksh 9,999</p>
                                <p className="font-bold line-through text-base text-gray-500 dark:text-gray-300">Ksh 12,999</p>
                                <p className="border text-sm rounded-sm text-white bg-orange-500 p-1 w-fit border-orange-500">{"10% off"}</p>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mt-2">In Stock</p>
                            <button className='flex items-center px-2 justify-center border-2 border-orange-400 md:hover:text-black md:hover:bg-orange-50 max-md:active:bg-orange-100 rounded-md text-black dark:text-white h-10'>
                                Add to cart
                            </button>
                            <div>
                                <p className="text-gray-500 mb-2 dark:text-gray-200 border-t-2 border-b-gray-300 w-full mt-8">SERVICES</p>
                                <div className="flex flex-col gap-y-4">
                                    <p className="inline text-black dark:text-white"><i className="fa-solid fa-truck fa-xl text-orange-400"></i> Free delivery on orders above  Ksh 2000</p>
                                    <p className="inline text-black dark:text-white"><i className="fa-solid fa-file-circle-check fa-xl text-orange-400"></i> 1 year warranty</p>
                                    <p className="inline text-black dark:text-white"><i className="fa-solid fa-truck-ramp-box fa-xl text-orange-400"></i> Free returns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-x-4 items-start dark:bg-transparent bg-white shadow-zinc-700 dark:shadow-slate-300 shadow-sm rounded-md p-4">
                        <h3 className="text-xl text-black dark:text-white w-full border-b-2 mb-4 border-b-gray-300">Product Details</h3>
                        <p className="text-gray-600 dark:text-gray-200 mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </p>
                        <div style={{height:'500px'}} className="flex product-image-2 flex-row max-md:!h-auto max-md:!w-auto items-center justify-center mx-auto"><img src="/test.jpg" className="h-full w-full"/></div>
                        <h3 className="text-lg text-black mt-8 dark:text-white w-full border-b-2 mb-4 border-b-gray-300">Specifications</h3>
                        
                    </div>

                    <div className="flex flex-col gap-x-4 items-start dark:bg-transparent bg-white shadow-zinc-700 dark:shadow-slate-300 shadow-sm rounded-md p-4">
                        <h3 className="text-xl text-black dark:text-white w-full border-b-2 mb-4 border-b-gray-300">What's in the box</h3>
                        <ul className="text-black dark:text-white">
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                            <li>Item 4</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-x-4 items-start dark:bg-transparent bg-white shadow-zinc-700 dark:shadow-slate-300 shadow-sm rounded-md p-4">
                        <h3 className="text-xl text-black dark:text-white w-full border-b-2 mb-4 border-b-gray-300">Related</h3>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
};

export default Product;
