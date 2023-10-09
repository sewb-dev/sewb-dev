'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from '../Loader';

const WithAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push('/');
        }
      }
    }, [loading, user]);

    if (loading) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default WithAuth;
