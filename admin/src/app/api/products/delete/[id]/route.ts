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
        return new Response(JSON.stringify({error:'id parameter is missing'}),{status:400,headers:{
            'Content-Type':'application/json'
        }})
    }

    await dbConnService.mongooseConnect().catch(err => new Response(JSON.stringify({error:err}),{status:503,headers:{
        'Content-Type':'application/json'
    }}));

    try {
        await Product.deleteOne({_id:id});

        return new Response(JSON.stringify({success:true}),{status:201,headers:{
            'Content-Type':'application/json'
        }});
    } catch (error:any) {
        return new Response(JSON.stringify({error:error.message ?? error}), { status: 503, headers: {
            'Content-Type':'application/json'
        }})
    }
}