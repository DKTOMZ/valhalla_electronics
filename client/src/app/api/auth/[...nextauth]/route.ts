import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import appUser from "@/lib/userSchema";
import { compare } from "bcryptjs";
import {BackendServices} from "@/app/api/inversify.config";
import { DbConnService } from "@/services/dbConnService";
import { MailService } from "@/services/mailService";
import { UserClient, UserServer } from "@/models/User";
import { JWTService } from "@/services/jwtService";
import { JWTPurpose } from "@/models/JWTPurpose";


//Services
const dbConnService = BackendServices.get<DbConnService>('DbConnService');
const mailService = BackendServices.get<MailService>('MailService');
const jwtService = BackendServices.get<JWTService>('JWTService');

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(dbConnService.mongoConnect(),{
    databaseName: 'Valhalla_ecomm',
    collections: {
      Accounts: 'userAccounts',
      Users: 'users'
    }
  }),
  pages: {
    signIn: "/auth/login"
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt: async({token,user}:{token:any, user: User}) => {
      user && (token.user = user)
      return token;
    },
    session: async({session, token}:{session: Session, token:any}) => {
      const user = token.user;
      session.user = user;
      return session;
    }
  },
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID??'',
        clientSecret: process.env.GOOGLE_SECRET??''
    }),
    GithubProvider({
        clientId: process.env.GITHUB_ID??'',
        clientSecret: process.env.GITHUB_SECRET??'',
    }),
    CredentialsProvider({
      credentials: {},
      async authorize(credentials: any): Promise<UserClient> {
        await dbConnService.mongooseConnect().catch(err => { throw new Error(err); });

        const { email, password }: { email: string; password: string; } = credentials;

        if (!email) { throw new Error('email is not provided'); }

        if (!password) { throw new Error('password is not provided'); }

        const user = await appUser.findOne<UserServer>({ email: email });

        if (!user) { throw new Error('Invalid username or password'); }

        if (!user.password) { throw new Error('Login with the auth provider linked with this email'); }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) { throw new Error('Invalid username or password'); }

        if (!user.emailVerified) {
          try {
            const response = jwtService.generateJWT(user._id.toString(), JWTPurpose.EMAIL);
            if (response.error) { throw new Error(response.error); }
            mailService.sendMail({
              to: user.email, subject: 'Valhalla Gadgets - Email verification for your account', text: '',
              html: `<div>
                    <h1>Verify your email</h1>
                    <p>Hi, ${user.name}. Please click on the link below to verify your email<p>
                    <a href=${response.success}>
                        <p>Confirm Email</p>
                    </a>
                    <p>Please do not reply to this email as it is unattended.</p>
                    <br/>
                    <p>Warm regards.</p>
                    <br/>
                    <p>Valhalla Gadgets</p>
                </div>`
            });
          } catch (error: any) {
            throw new Error(error);
          }
          throw new Error('Confirmation email sent. Please confirm your email to login');
        }

        return { id: user._id, name: user.name, email: user.email, image: user.image };
      }
    })
  ],
}

/**
* POST and GET Request handlers for /api/auth/login route.
*/
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }