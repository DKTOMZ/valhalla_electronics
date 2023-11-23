import Category from "@/lib/categorySchema";
import { DbConnService } from "@/services/dbConnService";
import {BackendServices} from "@/app/api/inversify.config";
import { CategoryProperty, Category as categoryType } from "@/models/categories";


//Services
const dbConnService = BackendServices.get<DbConnService>('DbConnService');

export async function GET(request: Request) {
    return new Response(JSON.stringify({error:'GET Method not supported'}),{status:405,headers:{
        'Content-Type':'application/json'
    }});
}

/**
* POST Request handler for /api/auth/signup route.
*/
export async function POST(request: Request) {
    await dbConnService.mongooseConnect().catch(err => new Response(JSON.stringify({error:err.message}),{status:503,headers:{
        'Content-Type':'application/json'
    }}))

    const body = await request.json();

    const { name, parentCategory, properties }:{name:string, parentCategory: categoryType, properties: CategoryProperty[]} = body;

    if (!body) { return new Response(JSON.stringify({error:'Request data/body is missing'}),{status:400,headers:{
        'Content-Type':'application/json'
    }}) }

    if (!name) { return new Response(JSON.stringify({error:'Name is missing'}),{status:400,headers:{
        'Content-Type':'application/json'
    }}) }

    if (!parentCategory) { return new Response(JSON.stringify({error:'parentCategory is missing'}),{status:400,headers:{
        'Content-Type':'application/json'
    }}) }

    if (!properties) { return new Response(JSON.stringify({error:'properties is missing'}),{status:400,headers:{
        'Content-Type':'application/json'
    }}) }

    const categoryExists = await Category.findOne<categoryType>({name:name})

    if (categoryExists) { return new Response(JSON.stringify({error:'Category already exists'}),{status:409,headers:{
        'Content-Type':'application/json'
    }}) }

    else {

        try {

            if (Object.keys(parentCategory).length > 0) {
                await Category.create({
                    name:name,
                    parentCategory,
                    properties: properties
                });
            } else {
                await Category.create({
                    name:name,
                    properties: properties
                });
            }
            
            await Category.updateOne({name:parentCategory.name},{$push: {childCategories: name}});

            return new Response(JSON.stringify({success:true}),{status:201,headers:{
                'Content-Type':'application/json'
            }});

        } catch (error:any) {

            return new Response(JSON.stringify({error:error.message}),{status:503,headers:{
                'Content-Type':'application/json'
            }});

        }
    }
}