import { useRef } from 'react';
import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@/assets/prev.svg';
import ArrowForwardIosIcon from '@/assets/next.svg';
import CenteredSwiper from './Swiper';
import certifaied from '@/assets/certified.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/store';

const CVCarousel = () => {
  const { t } = useTranslation(); // Use translation hook
  const scrollRef = useRef<any>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigation = useNavigate();
  const { accessToken } = useAppSelector((state) => state.userData);

  return (
    <Box
      sx={{
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFF',
        maxHeight: '558px',
        marginBottom: '80px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', maxWidth: 'lg' }}>
        <Box
          component={'img'}
          src={certifaied}
          sx={{
            marginTop: isMobile ? '-40px' : '-60px',
            marginBottom: '47px',
            width: isMobile ? '67px' : '150px',
            height: isMobile ? '67px' : '150px',
          }}
        />
      </Box>
      {/* Title */}
      <Typography
        gutterBottom
        sx={{
          fontSize: isMobile ? '26px' : '38px',
          fontWeight: isMobile ? '700' : '600',
          maxWidth: isMobile ? '346px' : 'lg',
          paddingInline: '10px',
        }}
      >
        {t('cvCarousel.title')}
      </Typography>
      {/* Subtitle */}
      <Typography
        variant="subtitle1"
        color="textSecondary"
        gutterBottom
        sx={{
          fontSize: isMobile ? '14px' : '18px',
          fontWeight: '400',
          maxWidth: isMobile ? '346px' : 'lg',
          paddingInline: '10px',
          marginBottom: '20px',
        }}
      >
        {t('cvCarousel.subtitle')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          maxWidth: 'lg',
          alignItems: 'center',
          marginBottom: '34px',
        }}
      >
        <IconButton
          disableRipple
          onClick={() => scrollRef.current?.slidePrev()}
          sx={{
            minWidth: 'auto',
            display: isMobile ? 'none' : 'block',
          }}
        >
          <Box
            component={'img'}
            sx={{
              transform: document.dir == 'rtl' ? 'rotate(180deg)' : 'unset',
            }}
            src={ArrowBackIosNewIcon}
          />
        </IconButton>
        <Button
          onClick={() => {
            !accessToken ? navigation('/register') : navigation('/home');
          }}
          variant="contained"
          color="primary"
          sx={{ marginInline: 'auto', paddingBlock: '14px', borderRadius: '13px' }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: isMobile ? '700' : '400',
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              lineHeight: '150%',
              textTransform: 'none',
            }}
          >
            {t('cvCarousel.createResumeButton')}
          </Typography>
        </Button>
        <IconButton
          disableRipple
          onClick={() => scrollRef.current?.slideNext()}
          sx={{ minWidth: 'auto', display: isMobile ? 'none' : 'block' }}
        >
          <Box
            component={'img'}
            sx={{
              transform: document.dir == 'rtl' ? 'rotate(180deg)' : 'unset',
            }}
            src={ArrowForwardIosIcon}
          />
        </IconButton>
      </Box>
      <Box sx={{ width: '100vw', marginBottom: '0px' }}>
        <CenteredSwiper ref={scrollRef} />
      </Box>
    </Box>
  );
};

export default CVCarousel;
