import { Box, Typography, Button, Stack, useTheme, useMediaQuery } from '@mui/material';
import Star from '@/assets/star.svg';
import image1 from '@/assets/images/image1.png';
import image2 from '@/assets/images/image2.png';
import image3 from '@/assets/titleBg.svg';
import correctSign from '@/assets/images/correctSign.svg';
import Header from './Header';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/store';
const TitleSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { accessToken } = useAppSelector((state) => state.userData);
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',

        overflow: 'hidden',
        textAlign: 'center',
        fontSize: '40px',
        color: '#2b2a44',
        fontFamily: 'Poppins',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main Background Rectangle */}
      <Box
        sx={{
          position: 'relative',

          display: 'flex',
          borderRadius: '28px',
          backgroundColor: '#fff',
          width: '100%',
          // height: '783px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Header />
        {/* Blurred Circle */}
        <Box
          sx={{
            position: 'absolute',
            top: isMobile ? '-50px' : '282px',
            // left: 'calc(50% - 100px)',
            filter: 'blur(409.9px)',
            borderRadius: '50%',
            backgroundColor: 'rgba(14, 123, 252, 0.36)',
            // width: '1017px',
            height: '1017px',
            // zIndex: 1,
          }}
        />
        {/* Images */}

        {/* Text Elements */}
        <Typography
          // variant="body2"
          sx={{
            // position: 'absolute',
            // top: '109px',
            // left: 'calc(50% - 107px)',
            fontSize: '12px',
            letterSpacing: i18n.dir() == 'ltr' ? '0.3em' : '0em',
            lineHeight: '150%',
            fontWeight: 600,
            color: '#838291',
            fontFamily: i18n.dir() == 'ltr' ? 'Poppins' : 'IBM Plex Sans Arabic-SemiBold',
            mt: '36px',
            zIndex: 2,
          }}
        >
          {t('onlineResumeBuilder')}
        </Typography>
        <Typography
          // variant="h4"
          // component="b"
          sx={{
            // position: 'absolute',
            // top: '142px',
            // left: 'calc(50% - 353px)',
            lineHeight: '117%',
            // display: 'inline-block',
            width: isMobile ? '340px' : '706px',
            fontSize: isMobile ? '30px' : '40px',
            fontFamily: i18n.dir() == 'ltr' ? 'Poppins' : 'IBM Plex Sans Arabic',
            color: '#2b2a44',
            fontWeight: '700',
            // backgroundColor: 'red',
            // zIndex: 999999,
            mt: '15px',
            zIndex: 2,
          }}
        >
          {t('firstStepTitle')}
        </Typography>

        {/* Button */}
        <Button
          onClick={() => {
            !accessToken ? navigation('/register') : navigation('/home');
          }}
          sx={{
            // position: 'absolute',
            // top: '260px',
            // left: 'calc(50% - 103px)',
            borderRadius: '13px',
            backgroundColor: '#0e41fc',
            padding: '14px 20px',
            width: '206px',
            textAlign: 'center',
            color: '#fff',
            mt: '24px',
            '&.MuiButton-text': {
              fontSize: '14px',
              fontWeight: isMobile ? '700' : '400',
              fontFamily: ' Poppins',
            },
          }}
        >
          {t('createResumeButton')}
        </Button>
        <Box
          component={'img'}
          src={image3}
          sx={{
            width: { xs: '200%', md: '90%', lg: '80%', xl: '100%', xxl: '100%', sm: '100%' },
          }}
        />
      </Box>
    </Box>
  );
};

export default TitleSection;
