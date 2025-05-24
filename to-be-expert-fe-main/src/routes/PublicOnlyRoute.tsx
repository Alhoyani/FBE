// PublicOnlyRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useAppSelector } from '@/app/store';
const PublicOnlyRoute: React.FC<PropsWithChildren> = () => {
  const user = useAppSelector((state) => state.userData);
  console.log('stateUser');

  // If user IS logged in, redirect to "/" (or /home, up to you)
  if (user?.accessToken) {
    return <Navigate to="/" replace />;
  }

  // If user is NOT logged in, allow access to this route
  return <Outlet />;
};

export default PublicOnlyRoute;
