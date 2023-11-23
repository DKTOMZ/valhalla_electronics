import Category from "@/lib/categorySchema";
import { DbConnService } from "@/services/dbConnService";
import {BackendServices} from "@/app/api/inversify.config";
import { Category as categoryType } from "@/models/categories";


//Services
const dbConnService = BackendServices.get<DbConnService>('DbConnService');

export async function POST(request: Request) {
    return new Response(JSON.stringify({error:'POST Method not supported'}),{status:405,headers:{
        'Content-Type':'application/json'
    }});
}

export async function GET(request: Request,{params}:{params:{id:string}}) {

    const id = params['id'].replace('id=','');

    if (!id) {
        return new Response(JSON.stringify({error:'Id is not provided'}),{ status: 409, headers: {
            'Content-Type':'application/json'
        }})
    }

    await dbConnService.mongooseConnect().catch(err => new Response(JSON.stringify({error:err.message}),{status:503,headers:{
        'Content-Type':'application/json'
    }}));

    try {
        const category = await Category.find<categoryType>({_id:id});

        const categories = await Category.find<categoryType>({ _id: {$ne: id} });

        return new Response(JSON.stringify({category:category[0],categories:categories}),{status:200,headers:{
            'Content-Type':'application/json'
        }});
    } catch (error:any) {
        return new Response(JSON.stringify({error:error.message}), { status: 503, headers: {
            'Content-Type':'application/json'
        }})
    }
}