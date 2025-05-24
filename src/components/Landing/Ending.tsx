import { Box, Typography, Stack, Link, useTheme, useMediaQuery } from '@mui/material';
import enAppLogo from '@/assets/appLogo.svg';
import arAppLogo from '@/assets/appLogoAr.svg';
import { LinkedIn, X } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

const Ending = () => {
  const { t } = useTranslation(); // Use the translation hook
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        mt: '65px',
        width: isMobile ? '95%' : '100%',
        maxWidth: 'lg',
        position: 'relative',
        textAlign: 'left',
        fontSize: '16px',
        color: '#000',
        marginBottom: isMobile ? '28px' : '145px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: i18n.dir() == 'ltr' ? 'space-between' : 'flex-start',
        columnGap: isMobile ? '0px' : '100px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'start' }}>
        <Box
          component="img"
          src={i18n.dir() == 'ltr' ? enAppLogo : arAppLogo}
          alt={t('ending.logoAlt')} // Translatable alt text
          sx={{
            width: '113px',
            height: '50px',
            marginBottom: !isMobile ? '24px' : '0px',
          }}
        />
        <Typography
          sx={{
            fontSize: '14px',
            marginTop: isMobile ? '24px' : '0px',
          }}
        >
          {t('ending.newsletter')}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: isMobile ? '10px' : '80px',
          marginTop: isMobile ? '24px' : '0px',
        }}
      >
        {/* About Us Section */}
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}>
            {t('ending.aboutUs.title')}
          </Typography>
          <Stack spacing={1} sx={{ marginTop: isMobile ? '10px' : '42px' }}>
            <Link color="#000" href="#" sx={{ fontSize: '12px' }}>
              {t('ending.aboutUs.ourStory')}
            </Link>
            <Link color="#000" href="#" sx={{ fontSize: '12px' }}>
              {t('ending.aboutUs.contactUs')}
            </Link>
          </Stack>
        </Box>

        {/* Resources Section */}
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}>
            {t('ending.resources.title')}
          </Typography>
          <Stack spacing={1} sx={{ marginTop: isMobile ? '10px' : '42px' }}>
            <Link color="#000" href="#" sx={{ fontSize: '12px' }}>
              {t('ending.resources.terms')}
            </Link>
            <Link color="#000" href="#" sx={{ fontSize: '12px' }}>
              {t('ending.resources.privacy')}
            </Link>
          </Stack>
        </Box>

        {/* Contact Section */}
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}>
            {t('ending.contactUs.title')}
          </Typography>
          <Stack spacing={1} sx={{ marginTop: isMobile ? '10px' : '42px' }}>
            <Link color="#000" href={`⁠support@tobe.expert`} sx={{ fontSize: '12px' }}>
              {t('ending.contactUs.email')}
            </Link>
          </Stack>
        </Box>

        {/* Follow Us Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}>
            {t('ending.followUs.title')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: isMobile ? '10px' : '42px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <X sx={{ width: '18px', height: '18px' }} />
              <Typography sx={{ fontSize: '12px' }}>{t('ending.followUs.twitter')}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <LinkedIn sx={{ width: '18px', height: '18px', color: '#000' }} />
              <Typography sx={{ fontSize: '12px' }}>{t('ending.followUs.linkedin')}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Ending;
