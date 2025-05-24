import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import side from '@/assets/sideSvg.svg';
import enApplogo from '@/assets/appLogo.svg';
import arApplogo from '@/assets/appLogoAr.svg';

import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';
import { SocialLoginButtons } from '@/components/Auth/SocialLoginButtons';
import { RegisterForm } from '@/components/Auth/RegisterForm';
import { useNavigate } from 'react-router-dom';

export const Rigister = () => {
  const { t } = useTranslation(); // Add translation hook
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024));
  const isMobilexs = useMediaQuery(theme.breakpoints.down(376));
  const navigation = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: '#FFF',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: { md: 'center', xs: 'center', lg: 'space-between' },
        height: '100vh',
      }}
    >
      <Box
        sx={{
          flex: 1,
          paddingBlock: isMobilexs ? '20px' : '60px',
          marginInlineStart: { sm: '30px', md: 0, lg: '90px' },
          paddingInline: isMobilexs ? '5px' : 'unset',
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'center', lg: 'flex-start' },
        }}
      >
        <Box
          onClick={() => navigation('/')}
          component={'img'}
          src={i18n.dir() === 'ltr' ? enApplogo : arApplogo}
          mb={'34px'}
          width={'81px'}
          sx={{
            ':hover': {
              cursor: 'pointer',
            },
          }}
        />
        <Typography variant="h1" sx={{ fontSize: '24px', fontWeight: '700px' }}>
          {t('register.title')}
        </Typography>
        <Box
          sx={{
            maxWidth: { xs: '310px', md: '369px', lg: '369px', xl: '369px' },
          }}
        >
          <SocialLoginButtons />
          <Divider sx={{ color: '#838291', marginBlockStart: '26px' }}>{t('register.or')}</Divider>
          <RegisterForm />
        </Box>
      </Box>
      {isMobile ? undefined : (
        <Box
          sx={{
            // flex: 1,
            display: { lg: 'flex', xs: 'none', md: 'none' },

            flexDirection: 'column',
            alignItems: 'center',
            // paddingInline: '40px',
            paddingBlock: isMobilexs ? '20px' : '60px',
          }}
        >
          <Box
            component={'img'}
            src={side}
            sx={{
              // flex: 1.5,
              width: { md: '60%', lg: '90%', xl: '100%' },
              // bgcolor: 'red',
              // height: '100%',
              // aspectRatio: '16/9',
              // objectFit: 'cover',
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Rigister;
