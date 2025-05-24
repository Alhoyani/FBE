import { Box, useMediaQuery, useTheme } from '@mui/material';

export const ImageView = ({ image }: { image: any }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component={'img'}
      sx={{
        width: isMobile ? '170px' : '329px',
        height: isMobile ? '337px' : '427px',
      }}
      src={image}
    />
  );
};
