import { Box, CardMedia } from '@mui/material';
import cv1 from '@/assets/images/cv11.png';
import cv12 from '@/assets/images/cv12.png';
export const SideSVGS = () => {
  return (
    <Box
      sx={{
        // height: 764,
        flex: 1,
        bgcolor: 'rgba(241, 248, 253, 1)',
        borderRadius: 3,
        // overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 844,
          height: '100vh',
          flex: 1,

          top: 300,
          left: 100,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 844,
            height: 664,
            position: 'absolute',
            top: 91,
            left: 0,
            objectFit: 'cover',
          }}
          alt="Rectangle"
          image={cv1}
        />

        <CardMedia
          component="img"
          sx={{
            width: 797,
            height: 714,
            position: 'absolute',
            top: 41,
            left: 47,
            objectFit: 'cover',
          }}
          alt="Rectangle"
          image={cv1}
        />

        <CardMedia
          component="img"
          sx={{
            width: 749,
            height: 755,
            position: 'absolute',
            top: 0,
            left: 95,
            objectFit: 'cover',
          }}
          alt="Rectangle"
          image={cv12}
        />
      </Box>
    </Box>
  );
};

export default SideSVGS;
