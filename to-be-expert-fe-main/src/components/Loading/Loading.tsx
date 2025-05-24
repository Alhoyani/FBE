// components/GlobalLoader.tsx
import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const GlobalLoader: React.FC = () => {
  const requestsInProgress = useSelector((state: RootState) => state.loading.requestsInProgress);

  const isLoading = requestsInProgress > 0;

  return (
    <Backdrop open={isLoading} sx={{ zIndex: 9999, color: '#fff' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GlobalLoader;
