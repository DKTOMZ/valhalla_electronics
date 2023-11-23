import {BackendServices} from "@/app/api/inversify.config";
import Product from "@/lib/productSchema";
import { DbConnService } from "@/services/dbConnService";
import { S3 } from "@aws-sdk/client-s3";

//Services
const dbConnService = BackendServices.get<DbConnService>('DbConnService');

export async function POST(request: Request) {
    return new Response(JSON.stringify({error:'POST Method not supported'}),{status:405,headers:{
        'Content-Type':'application/json'
    }});
}

export async function GET(request: Request,{params}: {params: {query:string}}) {

    const query = params['query'].split('&');

    if (query.length === 0 && !query[0].includes('id=')) {
        return new Response(JSON.stringify({error:'id parameter is missing or is not the first parameter'}),{status:400,headers:{
            'Content-Type':'application/json'
        }})
    }

    if (query.length <= 1 && !query[1].includes('imageUrl=')) {
        return new Response(JSON.stringify({error:'imageUrl parameter is missing or is not the first parameter'}),{status:400,headers:{
            'Content-Type':'application/json'
        }})
    }

    const id = query[0].replace('id=','');
    const imageUrl = query[1].replace('imageUrl=','');
    const imageKey = imageUrl.split('/').pop();
    const bucketName = 'valhalla-ecomm';
    const region = 'eu-north-1';

    const client = new S3({
        region: region,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY ?? '',
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? ''
        }
    });

    await dbConnService.mongooseConnect().catch(err => new Response(JSON.stringify({error:err}),{status:503,headers:{
        'Content-Type':'application/json'
    }}));

    try {
        await client.deleteObject({Bucket:bucketName,Key:imageKey});

        await Product.updateOne({_id:id},{$pull: {images: imageUrl}});

        return new Response(JSON.stringify({success:true}),{status:201,headers:{
            'Content-Type':'application/json'
        }});
    } catch (error:any) {
        return new Response(JSON.stringify({error:error.message ?? error}), { status: 503, headers: {
            'Content-Type':'application/json'
        }})
    }
}