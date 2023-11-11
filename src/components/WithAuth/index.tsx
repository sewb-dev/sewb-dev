'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from '../Loader';

const WithAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const { status } = useSession();
    const loading = status === 'loading';
    const unauthenticated = status === 'unauthenticated';

    useEffect(() => {
      if (unauthenticated) {
        router.push('/');
      }
    }, [unauthenticated]);

    if (loading || unauthenticated) return <Loader />;

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default WithAuth;
