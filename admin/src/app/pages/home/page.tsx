'use client'
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

/**
* Home component for an authenticated user.
*/
const AdminHome: React.FC = () => {
    //Get current user session
    const { data: session } = useSession();

    if (!session) {
        redirect('/');
    }

    return (
        <Layout>
            <title>Valhalla - Home</title>
            <div>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-black dark:text-white text-lg">
                        Welcome Admin
                    </p>
                    {
                    <div>
                        {session && session.user && session.user.image ? <img className="inline rounded-full" height={30} width={30} referrerPolicy="no-referrer" src={session.user.image} alt="Avatar"/>
                        :<i className="fa-solid fa-user text-black dark:text-white"></i>
                        }
                        {session && session.user && session.user.name ? 
                        <p className="font-bold inline text-base text-orange-600 pl-2">{ session.user.name }</p>
                        : null}
                    </div>
                    }
                </div>
                <p className="text-sm hidden md:block text-black dark:text-white">{new Date(Date.now()).toDateString()}</p>
            </div>
        </Layout>
    );
};

export default AdminHome;