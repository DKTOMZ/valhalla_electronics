import {FrontendServices} from "@/lib/inversify.config";
import { injectable } from "inversify";
import { LoggerService } from "./loggerService";
import { JWTPurpose } from "@/models/JWTPurpose";
import { nanoid } from "nanoid";
import { Jwt } from "jsonwebtoken";

const jwt = require('jsonwebtoken');

/**
 * Service to handle generation and verification of jwt's
 */
@injectable()
export class JWTService {
    private devLogger: LoggerService;
    constructor() {
        this.devLogger = FrontendServices.get<LoggerService>('DevLoggerService');
    }
    generateJWT = (adminId: string, purpose: JWTPurpose) => {
        try {
            const token = jwt.sign({
                adminId: adminId,
                jti: nanoid()
            },
            process.env.NEXTAUTH_SECRET,
            {
                expiresIn: '12h'
            },
            );
            const url = `${process.env.NEXT_PUBLIC_VALHALLA_URL}/${purpose===JWTPurpose.EMAIL ? 'pages/confirm' : 'pages/auth'}/${purpose===JWTPurpose.EMAIL ? 'email' : 'changepassword'}/?token=${token}`;
            return {success:url};
        } catch (error: any) {
            this.devLogger.log(error.message??error);
            return error.message ?? error;
        }
    };

    verify = (token: string) => {
        try {
            const {adminId}: {adminId:string} = jwt.verify(token, process.env.NEXTAUTH_SECRET);
            return adminId;
        } catch (error:any) {
            this.devLogger.log(error.message);
            throw new Error(error);
        }
    }

    decode = (token: string) => {
        try {
            return jwt.decode(token);
        } catch (error:any) {
            this.devLogger.log(error.message??error);
            throw new Error(error);
        }
    }
}