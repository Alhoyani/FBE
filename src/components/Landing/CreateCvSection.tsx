import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import imageBG from '@/assets/images/imageCreateCV.png'; // Update the path to your image
import cvs from '@/assets/📄 Mockup.svg'; // Update the path to your image
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/store';

const CreateCvSection = () => {
  const { t } = useTranslation(); // Use translation hook
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigation = useNavigate();
  const { accessToken } = useAppSelector((state) => state.userData);
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '23px',
        overflow: 'hidden',
        textAlign: 'left',
        fontSize: '58px',
        color: '#fff',
        fontFamily: 'Poppins',
        flexShrink: 0,
        display: 'flex',
        marginTop: isMobile ? '50px' : '200px',
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${imageBG})`,
          maxWidth: '1200px',
          margin: 'auto',
          width: isMobile ? '95%' : '1200px',
          borderRadius: '24px',
          backgroundColor: '#0e41fc',
          paddingTop: isMobile ? '38px' : '58px',
          paddingInline: isMobile ? '33px' : '77px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          overflowY: 'hidden',
        }}
      >
        <Box
          p={0}
          sx={{
            textAlign: 'start',
            justifyItems: 'start',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Typography
            sx={{
              fontWeight: '900',
              fontSize: isMobile ? '34px' : '58px',
              maxWidth: '416px',
            }}
          >
            {t('createCvSection.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: isMobile ? '14px' : '18px',
              maxWidth: '416px',
              fontWeight: '400',
              marginTop: '23px',
              textAlign: 'start',
            }}
          >
            {t('createCvSection.subtitle')}
          </Typography>

          <Button
            onClick={() => {
              !accessToken ? navigation('/register') : navigation('/home');
            }}
            variant="contained"
            sx={{
              fontWeight: isMobile ? '700' : 'bold',
              fontSize: '14px',
              paddingBlock: '14px',
              paddingInline: '20px',
              backgroundColor: '#FFF',
              fontFamily: 'Poppins',
              color: 'black',
              borderRadius: '13px',
              textTransform: 'none',
              mt: '30px',
            }}
          >
            {t('createCvSection.button')}
          </Button>
        </Box>
        <Box component="img" src={cvs} alt="" sx={{}} />
      </Box>
    </Box>
  );
};

export default CreateCvSection;
