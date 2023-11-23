'use client'
import { useSession } from 'next-auth/react'
import Loading from '@/components/loading';
import { redirect } from 'next/navigation';

/**
 * Home component of the application.
 */
const Home: React.FC | void = () => {
  const { data: session , status } = useSession();
  if (status === 'loading') {
    return (
      <Loading />
    );
  }
  if (session) {
    redirect('/pages/home');
  } else {
    redirect('/pages/auth/login');
  }
}

export default Home;
