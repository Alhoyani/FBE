import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { PropsWithChildren } from 'react';

const LayoutWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        backgroundColor: '#F5F6F8',
        width: '100%',
        // justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        minHeight: '92vh',
        justifyContent: isMobile ? 'flex-start' : 'center',
        paddingTop: isMobile ? '66px' : '0px',
        paddingInline: '5px',
      }}
    >
      {children}
    </Box>
  );
};

export default LayoutWrapper;
