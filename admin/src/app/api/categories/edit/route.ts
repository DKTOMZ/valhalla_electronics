import Category from "@/lib/categorySchema";
import { DbConnService } from "@/services/dbConnService";
import {BackendServices} from "@/app/api/inversify.config";
import { Category as categoryType } from "@/models/categories";

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
    await dbConnService.mongooseConnect().catch(err => new Response(JSON.stringify({error:err}),{status:503,headers:{
        'Content-Type':'application/json'
    }}))

    const body = await request.json();

    const { name, parentCategory, properties }: {name:string,parentCategory:categoryType,properties:[]} = body;

    if (!body) { return new Response(JSON.stringify({error:'Request data/body is missing'}),{status:400,headers:{
        'Content-Type':'application/json'
    }}) }

    if (!name) { return new Response(JSON.stringify({error:'Name is missing'}),{status:400,headers:{
        'Content-Type':'application/json'
    }}) }

    if (!properties) { return new Response(JSON.stringify({error:'properties is missing'}),{status:400,headers:{
        'Content-Type':'application/json'
    }}) }

    try {
            const category = await Category.findOne<categoryType>({name:name});

            if(!category){ return new Response(JSON.stringify({error:`Category ${name} no longer exists`}),{status:500,headers:{
                'Content-Type':'application/json'
            }})}

            if (parentCategory) {
                await Category.updateOne({name:name},{name, parentCategory, properties});
            } else {
                await Category.updateOne({name:name},{name, properties});
            }

            await Category.updateOne({name:category.parentCategory['name']},{$pull: {childCategories: name}});

            await Category.updateOne({name:parentCategory ? parentCategory.name : ''},{$push: {childCategories: name}});

            return new Response(JSON.stringify({success:true}),{status:201,headers:{
                'Content-Type':'application/json'
            }});

    } catch (error:any) {

            return new Response(JSON.stringify({error:error.message}),{status:503,headers:{
                'Content-Type':'application/json'
            }});

    }
}