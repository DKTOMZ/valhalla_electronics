import Product from "@/lib/productSchema";
import { DbConnService } from "@/services/dbConnService";
import {BackendServices} from "@/app/api/inversify.config";

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

    await dbConnService.mongooseConnect().catch(err => new Response(JSON.stringify({error:err}),{status:503,headers:{
        'Content-Type':'application/json'
    }}));

    try {
        const product = await Product.find({_id:id});

        return new Response(JSON.stringify(product[0]),{status:200,headers:{
            'Content-Type':'application/json'
        }});
    } catch (error:any) {
        return new Response(JSON.stringify({error:error.message}), { status: 503, headers: {
            'Content-Type':'application/json'
        }})
    }
}