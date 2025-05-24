import { useAppSelector } from '@/app/store';
import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  // Otherwise, render the protected page
  return <Outlet />;
};

export default ProtectedRoute;
