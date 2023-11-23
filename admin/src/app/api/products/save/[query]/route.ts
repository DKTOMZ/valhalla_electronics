import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import Product from "@/lib/productSchema";
import { DbConnService } from "@/services/dbConnService";
import {BackendServices} from "@/app/api/inversify.config";

//Services
const dbConnService = BackendServices.get<DbConnService>('DbConnService');

export async function GET(request: Request) {
    return new Response(JSON.stringify({error:'GET Method not supported'}),{status:405,headers:{
        'Content-Type':'application/json'
    }});
}

/**
* POST Request handler for /api/products/save route.
*/
export async function POST(request: Request,{params}:{params:{query:string}}) {

    const formData = await request.formData();

    const files: {name:string,body:Buffer}[] = [];

    for (const file of formData.entries()) {
        if (file[1] && (file[1] as File).type && (file[1] as File).type.includes('image')) {
            files.push({ name: file[0], body: Buffer.from(await (file[1] as File).arrayBuffer()) });
        }
    }

    const query = params['query'].split('&');

    await dbConnService.mongooseConnect().catch(err => new Response(JSON.stringify({error:err.message}),{status:503,headers:{
        'Content-Type':'application/json'
    }}));

    if (query.length === 0 && !query[0].includes('name=')) {
        return new Response(JSON.stringify({error:'name parameter is missing or is not the first parameter'}),{status:400,headers:{
            'Content-Type':'application/json'
        }})
    }

    if (query.length <= 1 && !query[1].includes('description=')) {
        return new Response(JSON.stringify({error:'description parameter is missing or is not the second parameter'}),{status:400,headers:{
            'Content-Type':'application/json'
        }})
    }

    if (query.length <= 2 && !query[2].includes('price=')) {
        return new Response(JSON.stringify({error:'price parameter is missing or is not the third parameter'}),{status:400,headers:{
            'Content-Type':'application/json'
        }})
    }

    if (query.length <= 3 && !query[3].includes('category=')) {
        return new Response(JSON.stringify({error:'category parameter is missing or is not the fourth parameter'}),{status:400,headers:{
            'Content-Type':'application/json'
        }})
    }

    if (query.length <= 4 && !query[4].includes('properties=')) {
        return new Response(JSON.stringify({error:'properties parameter is missing or is not the fifth parameter'}),{status:400,headers:{
            'Content-Type':'application/json'
        }})
    }

    const name = query[0].replace('name=','');
    const description = query[1].replace('description=','');
    const price = query[2].replace('price=','');
    const category = query[3].replace('category=','');
    const properties = query[4].replace('properties=','');
    const bucketName = 'valhalla-ecomm';
    const region = 'eu-north-1';

    if(!process.env.S3_ACCESS_KEY){
        return new Response(JSON.stringify({error:'S3_ACCESS_KEY is missing in env file'}),{status:400,headers:{
            'Content-Type':'application/json'
        }})
    }

    if(!process.env.S3_SECRET_ACCESS_KEY){
        return new Response(JSON.stringify({error:'S3_SECRET_ACCESS_KEY is missing in env file'}),{status:400,headers:{
            'Content-Type':'application/json'
        }})
    }

    const client = new S3Client({
        region: region,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        }
    });

    var imageLinks: string[] = [];

    const saveFilesToS3 = async () => {
        for (const [index, file] of files.entries()) {
          const extension = file.name.split('.').pop();
          const newFileName = `${Date.now()}.${extension}`;
          try {
            await client.send(
              new PutObjectCommand({
                Bucket: bucketName,
                Key: newFileName,
                ACL: 'public-read',
                Body: file.body,
              })
            );
            imageLinks.push(
              `https://${bucketName}.s3.${region}.amazonaws.com/${newFileName}`
            );
          } catch (error) {
            throw error;
          }
        }
    };

    try {

        await saveFilesToS3();

        const existingProduct = await Product.findOne({name:name});

        if (existingProduct) {
            throw new Error('Product already exists');
        }

        const props = JSON.parse(properties);
        await Product.create({ name, description, price, images:imageLinks, category, properties:props});

        return new Response(JSON.stringify({success:true}),{status:201,headers:{
            'Content-Type':'application/json'
        }});
    } catch (error:any) {
        if (error.message === 'Product already exists') {
            return new Response(JSON.stringify({error:error.message}), { status: 409, headers: {
                'Content-Type':'application/json'
            }});
        }
        return new Response(JSON.stringify({error:error.message}), { status: 503, headers: {
            'Content-Type':'application/json'
        }})
    }
}