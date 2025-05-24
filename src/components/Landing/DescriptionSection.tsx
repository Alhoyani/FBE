import { Box, Typography } from '@mui/material';

const DescriptionSection = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '243px',
        left: '830px',
        width: '360px',
        display: 'none',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '4px 4px 0px',
        color: '#7e878e',
        fontFamily: 'Somar',
      }}
    >
      <Typography sx={{ flex: 1, lineHeight: '18px' }}>Additional description and instructions</Typography>
    </Box>
  );
};

export default DescriptionSection;
