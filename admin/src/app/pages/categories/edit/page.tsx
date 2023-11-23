'use client'
import Layout from "@/components/Layout";
import Loading from "@/components/loading";
import Modal from "@/components/modal";
import {FrontendServices} from "@/lib/inversify.config";
import { Category, CategoryProperty } from "@/models/categories";
import { HttpServiceResponse } from "@/models/httpServiceResponse";
import { HttpService } from "@/services/httpService";
import { useSearchParams } from "next/navigation";
import { MutableRefObject, useEffect, useRef, useState } from "react";

const EditCategory: React.FC = () => {

    //Incoming params
    const categoryId = useSearchParams().get('id');

    //Services
    const http = FrontendServices.get<HttpService>('HttpService');

    //State variables
    const [categoryName,setCategoryName] = useState('');
    const [properties,setProperties] = useState<CategoryProperty[]>([]);
    const [categories,setCategories] = useState<Category[]>([]);
    const [parentCategory,setParentCategory] = useState('No Parent Category');
    const [saveSuccess,setSaveSuccess] = useState(false);
    const [loadingSave,setLoadingSave] = useState(false);
    const [loading,setLoading] = useState(true);

    //Element refs
    const saveError = useRef<HTMLElement>(null) as MutableRefObject<HTMLDivElement>;

    useEffect(()=>{
        if(!saveSuccess && loadingSave) {
            setLoadingSave(false);
            setLoading(true);
            fetchData();
        }
    },[saveSuccess]);

    useEffect(()=>{ 
        fetchData(); 
    },[]);

    const fetchData = async() => {
        const response: HttpServiceResponse<{category:Category,categories:Category[]}> = await http.get(`${process.env.NEXT_PUBLIC_VALHALLA_URL}/api/categories/fetch/id=${categoryId}`);

        if (response.status >= 200 && response.status<=299 && response.data) {
            const categories = response.data.categories;
            const thisCategory = response.data.category;
            setCategories(categories.filter((category)=>(category._id != categoryId && !thisCategory['childCategories'].includes(category.name))));
            setCategoryName(thisCategory.name);
            setParentCategory(thisCategory.parentCategory['name']);
            setProperties(thisCategory.properties);
        };

        setLoading(false);
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingSave(true)
        const response = await http.post(`${process.env.NEXT_PUBLIC_VALHALLA_URL}/api/categories/edit`,JSON.stringify({
                id: categoryId,
                name: categoryName,
                parentCategory: parentCategory === 'No Parent Category' ? {} : categories.filter(category=>category.name === parentCategory)[0],
                properties:properties
            }), {headers:{'Content-Type':'application/json'}}
        );
    
        if (response.status >= 200 && response.status<=299 && response.data) {
            setSaveSuccess(true);
        } else {
            saveError.current.innerHTML = response.data.error || response.statusText;
            setLoadingSave(false);
        }
    };

    const handlePropertyAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setProperties([...properties,{name:'',value:''}]);
    };

    if (loading) { return <div>
        <title>Valhalla - Edit Category</title>
        <Layout><Loading screen={false} /></Layout>
    </div>
    }

    return (
        <Layout>
            <title>Valhalla - Edit Category</title>
            { saveSuccess ? <Modal key={'Save-Category'} callback={()=>setSaveSuccess(false)} body="Your category has been saved successfully!" title={'Success!'}/> : null}
            <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col gap-4">
                <h2 className="text-black dark:text-white text-lg">Edit category below</h2>
                <div>
                    <label htmlFor='Category-Name' className='sm:text-base font-bold mb-0 text-sm dark:text-white'>Name *</label>
                    <input onBlur={()=>saveError.current.innerHTML = ''} type="text" required name="Category-Name" placeholder="Category Name" value={categoryName}
                    onChange={(e)=>setCategoryName(e.target.value)}
                    className="px-2 outline-0 w-full rounded-md h-10 ring-1 dark:bg-neutral-600 dark:text-white ring-orange-400 outline-orange-400 focus:ring-2"/>
                </div>

                <div>
                    <label htmlFor='Parent-Category' className='block sm:text-base font-bold text-sm dark:text-white'>Parent Category</label>
                    <select value={parentCategory} onChange={(e)=>setParentCategory(e.target.value)} name="Parent-Category" className="p-2 ring-0 outline-none rounded-lg text-black dark:text-white bg-gray-100 dark:bg-neutral-600">
                        <option value={'No Parent Category'}>{'No Parent Category'}</option>
                        {categories.length > 0 ? categories.map((category)=>{
                            return <option key={category._id} value={category.name}>{category.name}</option>
                        }) : null}
                    </select>
                </div>

                <div>
                    <label htmlFor="Categories" className="block sm:text-base font-bold text-sm dark:text-white">Properties</label>
                    <button onClick={(e)=>handlePropertyAdd(e)} className="bg-orange-600 mb-3 md:hover:bg-orange-500 max-md:active:bg-orange-500 p-2 rounded-lg text-sm text-white disabled:bg-gray-500">
                        Add new property
                    </button>
                    { properties.length > 0 ?
                    properties.map((property,index)=>{
                        return <div key={`prop${index}`} className="mb-4">
                            <h3 className="text-black dark:text-white text-sm italic">Property {index+1}</h3>
                            <input value={property.name} onBlur={()=>saveError.current.innerHTML = ''} type="text" required name="Property-Name" placeholder="Name"
                            onChange={(e)=>setProperties([...properties.slice(0,index),{name:e.target.value,value:properties[index].value}, ...properties.slice(index+1)])}
                            className="px-2 outline-0 mb-2 w-full rounded-md h-10 ring-1 dark:bg-neutral-600 dark:text-white ring-orange-400 outline-orange-400 focus:ring-2"/>

                            <input value={property.value} onBlur={()=>saveError.current.innerHTML = ''} type="text" required name="Property-Value" placeholder="Values (comma separated)"
                            onChange={(e)=>setProperties([...properties.slice(0,index),{name:properties[index].name,value:e.target.value}, ...properties.slice(index+1)])}
                            className="px-2 outline-0 w-full rounded-md h-10 ring-1 dark:bg-neutral-600 dark:text-white ring-orange-400 outline-orange-400 focus:ring-2"/>
                        </div>
                    })
                    : null}
                </div>

                <div ref={saveError} className='text-red-500 text-center'></div>
                <button className="bg-orange-600 md:hover:bg-orange-500 max-md:active:bg-orange-500 p-2 rounded-lg text-lg text-white disabled:bg-gray-500"
                type="submit" disabled={loadingSave}>
                    <div className="flex justify-center gap-1">
                        {loadingSave ? 'Saving' : 'Save'}
                        {loadingSave ? <Loading height="h-6" width="w-6" screen={false}/> : null}
                    </div>
                </button>
            </form>
        </Layout>
    );
};

export default EditCategory;